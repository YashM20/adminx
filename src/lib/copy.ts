"use client"
import { toast } from 'sonner'

export function copy(text: string, successText: string = 'Text copied to clipboard') {
  if (typeof navigator === 'undefined') return
  navigator.clipboard.writeText(text)
    .then(() => {
      toast.success(successText)
    })
}