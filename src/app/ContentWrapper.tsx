'use client'
import { useEffect, useRef, ReactNode } from 'react'
import { useLineCount } from './LineContext'

export default function ContentWrapper({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { setLineCount } = useLineCount()

  useEffect(() => {
    const updateLines = () => {
      if (ref.current) {
        const computedStyle = window.getComputedStyle(ref.current)
        const lineHeight = parseFloat(computedStyle.lineHeight)
        const contentHeight = ref.current.scrollHeight
        const lines = Math.ceil(contentHeight / lineHeight)
        setLineCount(Math.max(lines, 3))
      }
    }

    updateLines()

    const observer = new MutationObserver(updateLines)
    if (ref.current) {
      observer.observe(ref.current, { childList: true, subtree: true })
    }

    return () => observer.disconnect()
  }, [children, setLineCount])

  return <div ref={ref}>{children}</div>
}
