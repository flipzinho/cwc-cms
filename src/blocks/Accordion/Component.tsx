'use client'
import React, { useState, useRef, useLayoutEffect } from 'react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import RichText from '@/components/RichText'

type AccordionItem = {
  title: string
  subtitle?: string
  content: SerializedEditorState
}

type Props = {
  items: AccordionItem[]
  className?: string
}

export const AccordionBlock: React.FC<Props> = ({ items = [], className }) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([])
  const [maxHeights, setMaxHeights] = useState<number[]>([])
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  // Atualiza as alturas máximas dos painéis quando itens mudam
  useLayoutEffect(() => {
    setMaxHeights(items.map((_, idx) => contentRefs.current[idx]?.scrollHeight || 0))
  }, [items])

  return (
    <div className={['w-full', className].filter(Boolean).join(' ')}>
      {items.map((item, idx) => {
        const isOpen = openIndexes.includes(idx)
        return (
          <div key={idx} className="mb-2">
            <div
              className={`
                rounded
                flex flex-col items-start gap-3 self-stretch border-0 p-3
                !rounded-[4px] !p-[12px] !gap-[12px]
                transition-colors
                ${isOpen ? 'bg-[#f8f8f8]' : 'bg-white'}
              `}
            >
              <button
                type="button"
                className="w-full text-left flex items-center justify-between bg-transparent 
                p-0 border-0 focus:outline-none"
                onClick={() => {
                  setOpenIndexes((prev) =>
                    prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
                  )
                }}
                aria-expanded={isOpen}
                style={{ width: '100%' }}
              >
                <span>
                  <span className="prose prose-neutral max-w-none">
                    <h3 className="m-0" style={{ color: '#2D2D2D', fontWeight: 600 }}>
                      {item.title}
                    </h3>
                  </span>
                </span>
                <span className="ml-2 text-2xl font-light select-none">{isOpen ? '−' : '+'}</span>
              </button>
            </div>
            <div
              ref={(el) => {
                contentRefs.current[idx] = el
              }}
              style={{
                maxHeight: isOpen ? (maxHeights[idx] ? `${maxHeights[idx]}px` : '1000px') : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              aria-hidden={!isOpen}
            >
              {isOpen && (
                <div
                  className="mb-2 text-base rounded-[4px] bg-[#F8F8F8] flex flex-col 
                items-start self-stretch p-[12px] pt-0"
                >
                  {item.subtitle && (
                    <div className="prose prose-neutral max-w-none block">
                      <h3 className="m-0" style={{ color: '#2D2D2D', fontWeight: 600 }}>
                        {item.subtitle}
                      </h3>
                    </div>
                  )}
                  <div className="!mx-0 w-full prose prose-neutral max-w-none">
                    {/* O RichText já renderiza <p>, então só precisa da classe .prose */}
                    <RichText data={item.content} enableGutter={false} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
