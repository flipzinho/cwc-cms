import React from 'react'
import CircleProgress from '@/components/ui/CircleProgress'

type Column = {
  header: string
}

type Cell = {
  value?: string
  type: 'text' | 'number' | 'status' | 'date' | 'views' | 'growth' | 'author' | 'chip'
  // Campos extras para author
  name?: string
  role?: string
  media?: { url?: string } // Specify type instead of any
  // Novo campo para subtipo de texto
  textSubtype?: 'bold' | 'medium' | 'normal'
  percent?: number // 0-100, só para type 'views'
  // Chip extras
  statusType?: 'neutral' | 'success' | 'warning' | 'error' | 'cwc' | 'ww'
  showDot?: boolean
  preIcon?: string
  postIcon?: string
}

type Row = {
  blockType: 'defaultRow'
  cells: Cell[]
}

type Props = {
  columns: Column[]
  rows: Row[]
  className?: string
}

export const TableBlock: React.FC<Props> = ({ columns, rows = [], className }) => {
  return (
    <div className={className}>
      <div className="relative w-screen left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]">
        <div className="relative w-full flex justify-center">
          <div className="w-full max-w-[100vw] mx-auto">
            <div className="overflow-x-auto">
              <table className="not-prose w-[1200px] max-w-[1200px] rounded-lg bg-white mx-auto">
                <thead className="bg-[#F8F8F8]">
                  <tr className="rounded-lg">
                    {columns.map((col, idx) => (
                      <th
                        key={idx}
                        className="pl-3 pr-3 py-2 text-left font-normal first:rounded-tl-lg last:rounded-tr-lg text-[16px] prose prose-p:m-0 prose-p:text-[16px] whitespace-nowrap"
                      >
                        <p className="m-0 text-[16px] text-[#2D2D2D]">{col.header}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(Array.isArray(rows) ? rows : []).map((row, rowIdx) => {
                    // Permitir linhas sem blockType ou com blockType === 'defaultRow'
                    if (!row || (row.blockType && row.blockType !== 'defaultRow')) return null
                    // Se não houver blockType, assume como válido
                    const cells = row.cells || []
                    return (
                      <tr key={rowIdx}>
                        {cells.map((cell, colIdx) => {
                          switch (cell.type) {
                            case 'text': {
                              let textClass =
                                'flex-1 overflow-hidden [-webkit-box-orient:vertical] [-webkit-line-clamp:3] [-webkit-box]'
                              if (cell.textSubtype === 'bold') {
                                textClass += ' font-semibold text-[16px]'
                              } else if (cell.textSubtype === 'medium') {
                                textClass += ' font-normal text-[16px]'
                              } else {
                                textClass += ' font-normal text-[14px]'
                              }
                              return (
                                <td
                                  key={colIdx}
                                  className="pl-3 pr-3 py-0.5 align-middle"
                                  style={{ height: 84, minHeight: 84, maxHeight: 84 }}
                                >
                                  <div className="min-h-[60px] h-full w-full flex items-center">
                                    <span
                                      className={textClass}
                                      style={{
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 3,
                                        flex: '1 0 0',
                                        overflow: 'hidden',
                                      }}
                                    >
                                      {cell.value}
                                    </span>
                                  </div>
                                </td>
                              )
                            }
                            case 'author':
                              return (
                                <td
                                  key={colIdx}
                                  className="pl-3 pr-3 py-0.5 align-middle"
                                  style={{ height: 84, minHeight: 84, maxHeight: 84 }}
                                >
                                  <div className="min-h-[60px] h-full w-full flex items-center">
                                    <div className="flex items-center gap-3">
                                      {cell.media &&
                                        typeof cell.media === 'object' &&
                                        cell.media.url && (
                                          <img
                                            src={cell.media.url}
                                            alt={cell.name || 'Avatar'}
                                            className="w-8 h-8 rounded-full object-cover"
                                          />
                                        )}
                                      <div>
                                        <p className="!font-semibold text-[12px]">{cell.name}</p>
                                        <div className="text-xs text-[#757575]">{cell.role}</div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              )
                            case 'chip': {
                              const statusType = cell.statusType || 'neutral'
                              let dotColor = 'bg-gray-400'
                              let bgColor = 'bg-gray-100 border border-gray-300 text-gray-800'
                              switch (statusType) {
                                case 'success':
                                  dotColor = ''
                                  bgColor =
                                    'bg-[#E8FAE8] border border-[#41D641] text-[#075207] font-semibold'
                                  break
                                case 'warning':
                                  dotColor = ''
                                  bgColor =
                                    'bg-[#FCFAE9] border border-[#E4D54C] text-[#58510C] font-semibold'
                                  break
                                case 'error':
                                  dotColor = ''
                                  bgColor =
                                    'bg-[#FFF7ED] border border-[#FFBD6D] text-[#66451D] font-semibold'
                                  break
                                case 'neutral':
                                  dotColor = ''
                                  bgColor =
                                    'bg-[#F5F5F5] border border-[#A8A8A8] text-[#2D2D2D] font-semibold'
                                  break
                                case 'cwc':
                                  dotColor = ''
                                  bgColor =
                                    'bg-[#F8F5ED] border border-[#CDB060] text-[#322B1B] font-semibold'
                                  break
                                case 'ww':
                                  dotColor = ''
                                  bgColor =
                                    'bg-[#E6EFED] border border-[#2E816B] text-[#12301F] font-semibold'
                                  break
                                default:
                                  dotColor = 'bg-gray-400'
                                  bgColor =
                                    'bg-gray-100 border border-gray-300 text-gray-800 font-semibold'
                              }
                              return (
                                <td
                                  key={colIdx}
                                  className="pl-3 pr-3 py-0.5 align-middle"
                                  style={{ height: 84, minHeight: 84, maxHeight: 84 }}
                                >
                                  <div className="min-h-[60px] h-full w-full flex items-center">
                                    <span className="flex items-center"></span>
                                    <span
                                      className={`rounded-[6px] px-2 py-1 text-xs flex items-center gap-2 ${bgColor}`}
                                    >
                                      {/* Pre Icon */}
                                      {cell.preIcon && cell.preIcon !== '' && (
                                        <i
                                          className={`${cell.preIcon} font-normal`}
                                          style={{
                                            fontSize: 14,
                                            lineHeight: 1,
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                          }}
                                        />
                                      )}
                                      {/* Dot */}
                                      {cell.showDot && (
                                        <span
                                          className={`w-1.5 h-1.5 rounded-full inline-block ${
                                            statusType === 'warning'
                                              ? ''
                                              : statusType === 'error'
                                                ? ''
                                                : statusType === 'success'
                                                  ? ''
                                                  : statusType === 'neutral'
                                                    ? ''
                                                    : statusType === 'cwc'
                                                      ? ''
                                                      : statusType === 'ww'
                                                        ? ''
                                                        : dotColor
                                          }`}
                                          style={
                                            statusType === 'warning'
                                              ? { background: '#B1A219' }
                                              : statusType === 'error'
                                                ? { background: '#CC8A3A' }
                                                : statusType === 'success'
                                                  ? { background: '#0EA30E' }
                                                  : statusType === 'neutral'
                                                    ? { background: '#757575' }
                                                    : statusType === 'cwc'
                                                      ? { background: '#9A8142' }
                                                      : statusType === 'ww'
                                                        ? { background: '#084F35' }
                                                        : undefined
                                          }
                                        />
                                      )}
                                      {/* Value */}
                                      {cell.value}
                                      {/* Post Icon */}
                                      {cell.postIcon && cell.postIcon !== '' && (
                                        <i
                                          className={`${cell.postIcon} font-normal`}
                                          style={{
                                            fontSize: 14,
                                            lineHeight: 1,
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                          }}
                                        />
                                      )}
                                    </span>
                                  </div>
                                </td>
                              )
                            }
                            case 'date':
                              return (
                                <td
                                  key={colIdx}
                                  className="pl-3 pr-3 py-0.5 align-middle whitespace-nowrap"
                                  style={{ height: 84, minHeight: 84, maxHeight: 84 }}
                                >
                                  <div className="min-h-[60px] h-full w-full flex items-center">
                                    {cell.value}
                                  </div>
                                </td>
                              )
                            case 'views':
                              return (
                                <td
                                  key={colIdx}
                                  className="pl-3 pr-3 py-0.5 align-middle"
                                  style={{ height: 84, minHeight: 84, maxHeight: 84 }}
                                >
                                  <div className="min-h-[60px] h-full w-full flex items-center">
                                    <span className="flex items-center gap-2">
                                      <span className="w-8 h-8 flex items-center justify-center">
                                        <CircleProgress
                                          percent={
                                            typeof cell.percent === 'number'
                                              ? cell.percent
                                              : Number(cell.value) || 0
                                          }
                                          size={32}
                                          strokeWidth={4}
                                          color="#222"
                                          trailColor="#E5E5E5"
                                        />
                                      </span>
                                      <span>{cell.value}</span>
                                    </span>
                                  </div>
                                </td>
                              )
                            case 'growth':
                              // Formata o valor para sempre exibir +VALUE%
                              let growthValue = cell.value ?? ''
                              if (
                                typeof growthValue === 'number' ||
                                typeof growthValue === 'string'
                              ) {
                                const num = Number(growthValue)
                                if (!isNaN(num)) {
                                  growthValue = (num > 0 ? '+' : '') + num + '%'
                                }
                              }
                              return (
                                <td
                                  key={colIdx}
                                  className="pl-3 pr-3 py-0.5 align-middle"
                                  style={{ height: 84, minHeight: 84, maxHeight: 84 }}
                                >
                                  <div className="min-h-[60px] h-full w-full flex items-center">
                                    <span
                                      className="flex items-center gap-1 rounded-[6px] w-[62px] h-[24px] text-[14px] font-semibold justify-center"
                                      style={{
                                        background: '#E8FAE8',
                                        color: '#075207',
                                        paddingLeft: 4,
                                        paddingRight: 4,
                                      }}
                                    >
                                      <i
                                        className="ri-arrow-right-up-line"
                                        style={{
                                          color: '#075207',
                                          fontSize: 16,
                                          fontWeight: 400,
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          marginRight: 0,
                                          width: 16,
                                          height: 16,
                                        }}
                                      />
                                      <span
                                        className="text-[14px] font-semibold"
                                        style={{
                                          color: '#075207',
                                          fontWeight: 600,
                                          fontFamily: 'Inter, sans-serif',
                                        }}
                                      >
                                        {growthValue}
                                      </span>
                                    </span>
                                  </div>
                                </td>
                              )
                            case 'number':
                              return (
                                <td
                                  key={colIdx}
                                  className="pl-3 pr-3 py-0.5 align-middle text-right"
                                  style={{ height: 84, minHeight: 84, maxHeight: 84 }}
                                >
                                  <div className="min-h-[60px] h-full w-full flex items-center">
                                    {cell.value}
                                  </div>
                                </td>
                              )
                            default:
                              return (
                                <td
                                  key={colIdx}
                                  className="pl-3 pr-3 py-0.5 align-middle"
                                  style={{ height: 84, minHeight: 84, maxHeight: 84 }}
                                >
                                  <div className="min-h-[60px] h-full w-full flex items-center">
                                    {cell.value}
                                  </div>
                                </td>
                              )
                          }
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
