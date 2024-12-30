'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface CopyToClipboardProps {
  text: string
  displayText?: string
}

export function CopyToClipboard({ text, displayText }: CopyToClipboardProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent the default button behavior
    event.preventDefault()

    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="flex items-center gap-2"
            type="button" // Explicitly set the button type to "button"
          >
            {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            <span className="sr-only">Copy to clipboard</span>
            {displayText || text}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isCopied ? 'Copied!' : 'Click to copy'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
