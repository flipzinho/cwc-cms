import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type QuoteBlockProps = {
  quoteText: SerializedEditorState
  author?: string
  role?: string
  avatar?: { url?: string } // Specify type instead of any
}

export const QuoteBlock: React.FC<QuoteBlockProps> = ({ quoteText, author, role, avatar }) => {
  return (
    <div
      className="
        flex flex-col
        p-4
        rounded-xl
        border border-solid border-[#bebebe]
        bg-[#f8f8f8]
        w-[90%]
        max-w-[824px]
        mx-auto
        self-stretch
      "
    >
      <div className="flex items-center w-full">
        <i className="ri-chat-quote-line text-neutral-800 text-2xl"></i>
      </div>

      <div className="w-full mt-4 mb-4 break-words quote-block">
        <RichText data={quoteText} />
      </div>

      <div className="flex items-center w-full">
        <hr className="w-[32px] border-t border-highlight-primary" />
        <div className="flex items-center gap-2 ml-4">
          {avatar && (
            <div
              className="w-10 h-10 rounded-full border border-gray-200 bg-gray-100 overflow-hidden flex-shrink-0 bg-center bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url(${avatar.url})`,
              }}
            />
          )}
          <div>
            <div
              className="text-[#414141] font-semibold text-sm leading-[19.6px] 
            tracking-[-0.28px] font-sans"
            >
              {author}
            </div>
            {role && (
              <div className="text-[#757575] font-normal text-xs leading-[16.8px] tracking-[-0.24px] font-sans">
                {role}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
