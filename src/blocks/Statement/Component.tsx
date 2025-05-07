import React from 'react'

type StatementBlockProps = {
  text: string
}

export const StatementBlock: React.FC<StatementBlockProps> = ({ text }) => {
  return (
    <div className="my-12">
      <h1 className="statement not-prose">{text}</h1>
    </div>
  )
}
