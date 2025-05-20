'use client'
import React from 'react'

const Logo = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <img
      src="/icons/CWC-logo.png"
      alt="CWC Logo"
      style={{
        width: '70%',
        height: '100%',
        objectFit: 'contain',
        display: 'block',
      }}
    />
  </div>
)

export default Logo
