'use client'
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export default function CopyableCell({ cellData }: {
  cellData: string;
}) {

  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent the default button behavior
    event.preventDefault()

    try {
      await navigator.clipboard.writeText(cellData)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div>
      <TooltipProvider >
        <Tooltip>
          <TooltipTrigger asChild >
            <div
              style={{ display: "flex", placeItems: "center", gap: "4px" }}
            >
              <Button
                style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}
                size="icon"
                onClick={copyToClipboard}
                type="button" // Explicitly set the button type to "button"
              >
                {isCopied ? <Check size={16} color='green' /> : <Copy size={16} />}
              </Button>
              {cellData}
            </div>
          </TooltipTrigger>
          <TooltipContent side='top' align='start' style={{ backgroundColor: "grey", color: "black", fontSize: "12px", padding: "4px" }}>
            <p >{isCopied ? 'Copied!' : 'Click to copy'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
