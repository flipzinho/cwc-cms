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
      <div className="container z-10 relative text-left lg:grid  text-white pb-8 px-4 md:px-8">
        <div className="flex items-center gap-4 absolute -top-32 left-6 z-20">
          <a href="#" aria-label="Share on LinkedIn" className="hover:opacity-75">
            <img src="/media/icon-link.svg" alt="LinkedIn" className="w-8 h-8" />
          </a>
          <a href="#" aria-label="Share this post" className="hover:opacity-75">
            <img src="/media/icon.svg" alt="Share" className="w-8 h-8" />
          </a>
          <a href="#" aria-label="Share on Instagram" className="hover:opacity-75">
            <img src="/media/icon-ig.svg" alt="Instagram" className="w-8 h-8" />
          </a>
        </div>
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
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

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl font-bold">{title}</h1>
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
        {heroImage && typeof heroImage !== 'string' && (
          <Media fill priority imgClassName="-z-10 object-cover" resource={heroImage} />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <button
          onClick={() => document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-sm text-white font-medium flex items-center gap-2"
        >
          {readingTime} min Read
          <img src="/media/icon-arrow-down.svg" alt="Arrow Down" className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
