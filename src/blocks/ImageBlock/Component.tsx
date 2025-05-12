import React from 'react'

type ImageBlockProps = {
  image?: {
    url?: string
    alt?: string
  }
  description?: string
}

export const ImageBlockComponent: React.FC<ImageBlockProps> = ({ image, description }) => {
  return (
    <div>
      {image?.url && (
        <img src={image.url} alt={image.alt || ''} style={{ width: '100%', display: 'block' }} />
      )}
      {description && (
        <div className="text-[#414141] font-normal text-[0.75rem] leading-[1.05rem] tracking-[-0.12px] font-sans mt-2">
          {description}
        </div>
      )}
    </div>
  )
}
