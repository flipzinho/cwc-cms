import React from 'react'

type CalloutBlockProps = {
  title?: string
  content: string
  icon?: string
}

export const CalloutBlock: React.FC<CalloutBlockProps> = ({ title, content, icon }) => {
  return (
    <div className="flex justify-center">
      <div className="w-[90%] bg-[#F4EFDB] rounded-[16px] p-8 font-sans">
        {title && (
          <div className="flex items-center gap-3 mb-4">
            <div className="text-xl font-semibold text-gray-800 leading-none">{title}</div>
            <div className="w-[40px] h-px bg-[#D1B155]" />
          </div>
        )}
        <div className="text-sm text-gray-800 leading-relaxed">{content}</div>
      </div>
    </div>
  )
}
