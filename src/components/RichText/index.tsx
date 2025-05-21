import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { StatementBlock as StatementBlockComponent } from '@/blocks/Statement/Component'
import { TableBlock as TableBlockComponent } from '@/blocks/Table/Component'
import { DividerBlock as DividerBlockComponent } from '@/blocks/DividerBlock/Component'
import { ImageBlockComponent } from '@/blocks/ImageBlock/Component'
import { GalleryBlock } from '@/blocks/Gallery/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'
import { QuoteBlock } from '@/blocks/Quote/Component'
import { CalloutBlock } from '@/blocks/Callout/Component'
import { FeaturesBlock } from '@/blocks/FeaturesBlock/Component'
import { BannerBlock as BannerBlockComponent } from '@/blocks/BannerBlock/Component'
import { AccordionBlock as AccordionBlockComponent } from '@/blocks/Accordion/Component'
import { ParallaxTitleBlock } from '@/blocks/ParallaxTitleBlock/Component'
import SocialMediaEmbed from '@/blocks/SocialMediaEmbed/Component'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    mediaBlock: ({ node }: { node: { fields: any } }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }: { node: { fields: any } }) => (
      <CodeBlock className="col-start-2" {...node.fields} />
    ),
    cta: ({ node }: { node: { fields: any } }) => <CallToActionBlock {...node.fields} />,
    quote: ({ node }: { node: { fields: any } }) => <QuoteBlock {...node.fields} />,
    callout: ({ node }: { node: { fields: any } }) => <CalloutBlock {...node.fields} />,
    'features-block': ({ node }: { node: { fields: any } }) => <FeaturesBlock {...node.fields} />,
    statement: ({ node }: { node: { fields: any } }) => (
      <StatementBlockComponent {...node.fields} />
    ),
    bannerBlock: ({ node }: { node: { fields: any } }) => <BannerBlockComponent {...node.fields} />,
    accordion: ({ node }: { node: { fields: any } }) => (
      <AccordionBlockComponent {...node.fields} />
    ),
    parallaxTitleBlock: ({ node }: { node: { fields: any } }) => (
      <ParallaxTitleBlock {...node.fields} />
    ),
    table: ({ node }: { node: { fields: any } }) => <TableBlockComponent {...node.fields} />,
    divider: ({ node }: { node: { fields: any } }) => <DividerBlockComponent {...node.fields} />,
    socialMediaEmbed: ({ node }: { node: { fields: any } }) => (
      <SocialMediaEmbed {...node.fields} />
    ),
    imageBlock: ({ node }: { node: { fields: any } }) => <ImageBlockComponent {...node.fields} />,
    gallery: ({ node }: { node: { fields: any } }) => <GalleryBlock {...node.fields} />,
  },
})

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <RichTextWithoutBlocks
      converters={jsxConverters}
      className={cn(
        {
          'container ': enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert ': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
