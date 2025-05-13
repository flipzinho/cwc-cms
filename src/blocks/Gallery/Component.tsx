'use client'
import React from 'react'
import type { Media } from '@/payload-types'

type GalleryImage = {
  media: Media
  alt?: string
}

type GalleryBlockProps = {
  images: GalleryImage[]
  className?: string
}

export const GalleryBlock: React.FC<GalleryBlockProps> = ({ images = [], className }) => {
  if (!images || images.length === 0) return null

  const [isMobile375, setIsMobile375] = React.useState(false)
  // Estado para controlar imagem em tela cheia
  const [fullscreenImg, setFullscreenImg] = React.useState<Media | null>(null)

  React.useEffect(() => {
    const check = () => setIsMobile375(typeof window !== 'undefined' && window.innerWidth <= 375)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Ajuste para grid dinâmico
  let gridClass = `
    grid 
    gap-6 
    !gap-[12px]
    px-0
  `
  let gridStyle: React.CSSProperties = { gap: 12 }

  if (images.length === 1) {
    gridClass += ' grid-cols-1'
  } else if (images.length === 2) {
    gridClass += ' grid-cols-2'
  } else {
    gridClass += ' grid-cols-2 sm:grid-cols-2 md:grid-cols-3'
  }

  // Função para saber se o item está isolado na fileira (em grid de 3 colunas desktop, 2 colunas mobile)
  function isIsolatedInRow(idx: number, total: number) {
    if (images.length === 1) return true
    if (images.length === 2) return false

    if (isMobile375) {
      // Mobile: grid de 2 colunas
      // Só expande se for o único NA LINHA (último item, total ímpar, idx % 2 === 0, E está sozinho na linha)
      const isLast = idx === total - 1
      const isOdd = total % 2 === 1
      const isFirstInRow = idx % 2 === 0
      // Só expanda se for o único NA LINHA e não houver outro item depois
      if (isLast && isOdd && isFirstInRow) {
        return true
      }
      return false
    }

    // Desktop: grid de 3 colunas, expande só se for o único na linha (último item e idx % 3 === 0)
    const isLast = idx === total - 1
    const isFirstInRow = idx % 3 === 0
    if (isLast && isFirstInRow) return true
    return false
  }

  return (
    <div
      className={`p-3 md:p-6 bg-white rounded-lg ${className || ''}`}
      style={{ boxSizing: 'border-box' }}
    >
      {/* Modal de imagem em tela cheia */}
      {fullscreenImg && fullscreenImg.url && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={() => setFullscreenImg(null)}
          style={{ cursor: 'zoom-out' }}
        >
          <img
            src={fullscreenImg.url}
            alt={fullscreenImg.alt || ''}
            className="max-w-full max-h-full rounded shadow-lg"
            style={{ objectFit: 'contain' }}
          />
        </div>
      )}

      <div className={gridClass} style={gridStyle}>
        {images.map((img, idx) => {
          const media = typeof img.media === 'object' ? img.media : undefined
          if (!media || !media.url) return null

          const isNinth = idx === 8
          const isolated = isIsolatedInRow(idx, images.length)

          // 1 imagem: expandir horizontalmente
          if (isolated) {
            return (
              <div
                key={idx}
                className="w-full h-full flex items-center justify-center"
                style={
                  !isMobile375
                    ? {
                        gridColumn: '1 / -1',
                        maxHeight: 436,
                      }
                    : {}
                }
              >
                <img
                  src={media.url}
                  alt={img.alt || media.alt || ''}
                  className="object-cover rounded-md w-full h-full cursor-zoom-in"
                  style={{
                    aspectRatio: '1/1',
                    width: '100%',
                    maxWidth: '100%',
                    background: '#f8f8f8',
                    maxHeight: isMobile375 ? 320 : 436,
                  }}
                  onClick={() => setFullscreenImg(media)}
                />
              </div>
            )
          }

          // 2 imagens: cada uma ocupa 50%
          if (images.length === 2) {
            return (
              <div key={idx} className="w-full h-full flex items-center justify-center">
                <img
                  src={media.url}
                  alt={img.alt || media.alt || ''}
                  className="object-cover rounded-md w-full h-full cursor-zoom-in"
                  style={{
                    aspectRatio: '1/1',
                    width: '100%',
                    maxWidth: '100%',
                    background: '#f8f8f8',
                  }}
                  onClick={() => setFullscreenImg(media)}
                />
              </div>
            )
          }

          // 9º item destacado em mobile
          if (isNinth && isMobile375) {
            return (
              <div
                key={idx}
                className="w-full h-full flex items-center justify-center gallery-featured-mobile"
                style={{
                  gridColumn: 'span 2',
                  gridRow: 'span 2',
                  width: '100%',
                  height: '100%',
                  maxWidth: 336,
                  maxHeight: 336,
                }}
                data-gallery-featured="true"
              >
                <img
                  src={media.url}
                  alt={img.alt || media.alt || ''}
                  className="object-cover rounded-md w-full h-full gallery-featured-img cursor-zoom-in"
                  style={{
                    aspectRatio: '1/1',
                    width: '100%',
                    height: '100%',
                    maxWidth: 336,
                    maxHeight: 336,
                    background: '#f8f8f8',
                  }}
                  onClick={() => setFullscreenImg(media)}
                />
              </div>
            )
          }

          // Normal render para todos os outros casos
          return (
            <div key={idx} className="w-full h-full flex items-center justify-center">
              <img
                src={media.url}
                alt={img.alt || media.alt || ''}
                className="object-cover rounded-md w-full h-full cursor-zoom-in"
                style={{
                  aspectRatio: '1/1',
                  maxHeight: 320,
                  background: '#f8f8f8',
                }}
                onClick={() => setFullscreenImg(media)}
              />
            </div>
          )
        })}
      </div>
      <style jsx>{`
        @media (max-width: 375px) {
          div[class*='grid'] {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }
          .gallery-featured-mobile {
            grid-column: span 2 !important;
            grid-row: span 2 !important;
            max-width: 336px !important;
            max-height: 336px !important;
          }
          .gallery-featured-img {
            max-width: 336px !important;
            max-height: 336px !important;
          }
        }
      `}</style>
    </div>
  )
}

export default GalleryBlock
