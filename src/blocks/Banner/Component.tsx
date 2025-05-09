import type { BannerBlock as BannerBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

type Props = {
  className?: string
  content?: any
} & BannerBlockProps

export const BannerBlock: React.FC<Props> = ({ className, content, style }) => {
  return (
    <div
      className={cn(
        'relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen px-4 my-8',
        className,
      )}
    >
      <div
        className={cn(
          'border py-3 px-6 flex items-center justify-center rounded max-w-7xl mx-auto',
          {
            'border-border bg-card': style === 'info',
            'border-error bg-error/30': style === 'error',
            'border-success bg-success/30': style === 'success',
            'border-warning bg-warning/30': style === 'warning',
          },
        )}
      >
        <RichText data={content} enableGutter={false} enableProse={false} />
      </div>
    </div>
  )
}
