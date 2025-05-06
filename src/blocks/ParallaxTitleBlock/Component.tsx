import React from 'react'
import type { Media } from '@/payload-types'

type Props = {
  backgroundImage: Media | string
  title: string
}

export const ParallaxTitleBlock: React.FC<Props> = ({ backgroundImage, title }) => {
  // Suporte para image como string (id) ou objeto Media
  const imageUrl =
    typeof backgroundImage === 'object' && backgroundImage?.url ? backgroundImage.url : undefined

  return (
    <div
      className="relative w-screen left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] flex items-center justify-center parallax-title-block"
      style={{
        height: 640,
        padding: '80px 80px',
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center">
        <h1
          className="drop-shadow-lg"
          style={{
            color: '#FFF',
            fontFamily: 'Inter',
            fontSize: '64px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '120%',
            letterSpacing: '-0.64px',
          }}
        >
          {title}
        </h1>
      </div>
    </div>
  )
}
