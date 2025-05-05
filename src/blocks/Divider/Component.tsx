import React from 'react'
import { Separator } from '@/components/ui/separator'

type DividerProps = {
  style: 'solid' | 'dashed' | 'dotted'
  color?: string
  thickness?: number
  margin?: number
}

// Substituindo o conteúdo do Divider pelo Separator
export const Divider: React.FC = () => <Separator className="flex-1" />
