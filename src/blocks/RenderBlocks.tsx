import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { QuoteBlock } from '@/blocks/Quote/Component'
import { StatementBlock } from '@/blocks/Statement/Component'
import { BannerBlock as BannerBlockComponent } from '@/blocks/BannerBlock/Component'
import { ParallaxTitleBlock } from './ParallaxTitleBlock/Component'
import { TableBlock as TableBlockComponent } from './Table/Component'
import { DividerBlock as DividerBlockComponent } from '@/blocks/DividerBlock/Component'
import { SocialMediaEmbed } from '@/blocks/SocialMediaEmbed/Component'
import { ImageBlockComponent } from '@/blocks/ImageBlock/Component'

const blockComponents: Record<string, React.ComponentType<any>> = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  quote: QuoteBlock,
  statement: StatementBlock,
  bannerBlock: BannerBlockComponent,
  parallaxTitleBlock: ParallaxTitleBlock,
  table: TableBlockComponent,
  dividerBlock: DividerBlockComponent,
  socialMediaEmbed: SocialMediaEmbed,
  imageBlock: ImageBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = ({ blocks }) => {
  return (
    <>
      {blocks.map((block, index) => {
        const BlockComponent = blockComponents[block.blockType]
        if (!BlockComponent) {
          return <p key={index}>Unknown block: {block.blockType}</p>
        }
        return <BlockComponent key={index} {...block} />
      })}
    </>
  )
}
