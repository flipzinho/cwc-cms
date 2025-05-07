import React from 'react'

type Props = {
  percent: number // 0-100
  size?: number // px
  strokeWidth?: number // px
  color?: string // stroke color
  trailColor?: string // background circle color
}

export const CircleProgress: React.FC<Props> = ({
  percent,
  size = 40,
  strokeWidth = 5,
  color = '#414141',
  trailColor = '#D3D3D3',
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - percent / 100)

  return (
    <svg width={size} height={size} style={{ display: 'block' }}>
      {/* Fundo */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={trailColor}
        strokeWidth={strokeWidth}
      />
      {/* Progresso */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{
          transition: 'stroke-dashoffset 0.4s',
          transform: `rotate(0deg)`,
          transformOrigin: '50% 50%',
        }}
      />
    </svg>
  )
}

export default CircleProgress
