import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type CalloutBlockProps = {
  title?: SerializedEditorState
  content: SerializedEditorState
}

export const CalloutBlock: React.FC<CalloutBlockProps> = ({ title, content }) => {
  return (
    <div className="bg-[#F4EFDB] rounded-[16px] p-12 font-sans">
      {title && (
        <div className="flex items-center gap-3 mb-4">
          <div className="text-xl font-semibold text-gray-800 leading-none">
            <RichText data={title} />
          </div>
          <div className="w-[40px] h-px bg-[#D1B155]" />
        </div>
      )}
      <div className="text-sm text-gray-800 leading-relaxed">
        <RichText data={content} />
      </div>
    </div>
  )
}
