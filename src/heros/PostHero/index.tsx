'use client'

import { formatDateTime } from 'src/utilities/formatDateTime'
import React, { useMemo } from 'react'
import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

// Ajustar a função para lidar com diferentes formatos de conteúdo
const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200 // Média de palavras lidas por minuto
  const wordCount = content.trim().split(/\s+/).length // Contar palavras corretamente, ignorando espaços extras
  return Math.ceil(wordCount / wordsPerMinute)
}

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title, content } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  // Ajustar o cálculo do tempo de leitura para garantir que o conteúdo seja extraído corretamente
  const readingTime = useMemo(() => {
    // Verificar se o conteúdo está estruturado corretamente
    const textContent =
      content?.root?.children
        ?.map((child: any) => {
          if (child.text) return child.text // Extrair texto diretamente
          if (child.children) {
            // Recursivamente extrair texto de filhos
            return child.children.map((nestedChild: any) => nestedChild.text || '').join(' ')
          }
          return ''
        })
        .join(' ') || ''

    return calculateReadingTime(textContent)
  }, [content])

  return (
    <div className="relative -mt-[10.4rem] flex items-center">
      <div className="absolute inset-0 bg-black opacity-50 z-0" />
      <div className="container z-10 relative text-left lg:flex text-white pb-8 px-4 md:px-8">
        <div className="flex items-center gap-[6px] absolute -top-[6rem] left-[2.1rem] z-20">
          <a href="#" aria-label="Share on LinkedIn" className="hover:opacity-75">
            <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
          </a>
          <a href="#" aria-label="Share this post" className="hover:opacity-75">
            <img src="/icons/link.svg" alt="Share" className="w-6 h-6" />
          </a>
          <a href="#" aria-label="Share on Instagram" className="hover:opacity-75">
            <img src="/icons/instagram.svg" alt="Instagram" className="w-6 h-6" />
          </a>
        </div>
        <div className="w-[60%] text-left">
          <div className="flex gap-2 mb-6">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                return (
                  <span
                    key={index}
                    className="px-[0.325rem] py-[0.325rem] bg-[#F8F5ED] text-[#322B1B] rounded-[0.575rem] border border-yellow-500 font-bold"
                  >
                    {titleToUse}
                  </span>
                )
              }
              return null
            })}
          </div>

          <div>
            <h1
              className="
                mb-6
                text-white
                font-inter
                text-[64px]
                font-bold
                leading-[76.8px]
                tracking-[-0.08em]
                text-left
              "
            >
              {title}
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            {hasAuthors && (
              <div className="flex items-center gap-2 text-sm">
                <span>By {formatAuthors(populatedAuthors)}</span>
                <span className="mx-2">•</span>
                {publishedAt && (
                  <time dateTime={publishedAt}>
                    Published{' '}
                    {new Date(publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div id="content" className="min-h-[80vh] select-none">
        {heroImage && (
          <Media fill priority imgClassName="-z-10 object-cover" resource={heroImage} />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <button
          onClick={() => document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-[14px] leading-[19.6px] tracking-[-0.28px] text-[#D3D3D3] font-sans font-semibold flex items-center gap-2 pb-[34px]"
        >
          {readingTime} min Read
          <img src="/icons/arrow-down-s-line.svg" alt="Arrow Down" className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
