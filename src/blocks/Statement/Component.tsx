import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type StatementBlockProps = {
  text: SerializedEditorState
}

export const StatementBlock: React.FC<StatementBlockProps> = ({ text }) => {
  return (
    <div className="my-12">
      <div className="statement">
        <RichText data={text} enableGutter={false} enableProse={false} />
      </div>
    </div>
  )
}
