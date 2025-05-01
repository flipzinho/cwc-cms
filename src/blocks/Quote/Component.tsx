import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type QuoteBlockProps = {
  quoteText: SerializedEditorState
  author?: string
}

export const QuoteBlock: React.FC<QuoteBlockProps> = ({ quoteText, author }) => {
  return (
    <blockquote className="border-l-4 pl-4 italic text-gray-700">
      <RichText data={quoteText} />
      {author && <footer className="mt-2 text-right">— {author}</footer>}
    </blockquote>
  )
}
