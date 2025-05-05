import React from 'react'
import type { Media } from '@/payload-types'
import RichText from '@/components/RichText'

type Props = {
  image: Media | string
  alt: string
  content?: any
}

export const BannerBlock: React.FC<Props> = ({ image, alt, content }) => {
  // Suporte para image como string (id) ou objeto Media
  const imageUrl = typeof image === 'object' && image?.url ? image.url : undefined

  return (
    <div className="relative w-screen left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]">
      <div className="relative w-full h-[400px] flex items-center justify-center">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={alt}
            className="
              object-cover h-full rounded
              w-full
              max-w-[1280px]    // desktop (>=1280px)
              lg:max-w-[896px]  // large (>=1024px)
              md:max-w-[640px]  // medium (>=768px)
              sm:max-w-full     // small (<768px)
              max-[375px]:max-w-[295px] // extra small (<=375px)
              absolute left-1/2 top-0
              -translate-x-1/2
            "
            style={{
              height: '100%',
            }}
          />
        )}
        <div className="relative z-10 mx-auto max-w-[90vw] flex flex-col items-center">
          <h1 className="bannerblock-title">{alt}</h1>
        </div>
      </div>
      {content && (
        <div className="max-w-7xl w-full px-4 text-center mx-auto py-8">
          <RichText data={content} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
