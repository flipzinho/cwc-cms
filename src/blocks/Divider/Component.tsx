import React from 'react'

export const DividerBlock: React.FC = () => (
  <div className="w-4/5 mx-auto flex items-center justify-center my-8">
    <svg width="380" height="2" viewBox="0 0 380 2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1H379" stroke="#BEBEBE" strokeLinecap="round" />
    </svg>
    <div className="flex items-center mx-4 gap-4">
      {[0, 1, 2].map((i) => (
        <svg
          key={i}
          width="4"
          height="4"
          viewBox="0 0 4 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="2" cy="2" r="2" fill="#BEBEBE" />
        </svg>
      ))}
    </div>
    <svg width="380" height="2" viewBox="0 0 380 2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1H379" stroke="#BEBEBE" strokeLinecap="round" />
    </svg>
  </div>
)
