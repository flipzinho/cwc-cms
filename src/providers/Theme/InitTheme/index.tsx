import Script from 'next/script'
import React from 'react'

import { defaultTheme, themeLocalStorageKey } from '../ThemeSelector/types'

export const InitTheme: React.FC = () => {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      dangerouslySetInnerHTML={{
        __html: `
      document.documentElement.setAttribute('data-theme', 'light');
      window.localStorage.setItem('payload-theme', 'light');
    `,
      }}
      id="theme-script"
      strategy="beforeInteractive"
    />
  )
}
