import * as React from 'react'
import { cn } from '@/lib/utils/cn'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex min-h-20 w-full bg-transparent border-b border-outline-variant px-0 py-2 text-sm text-on-surface placeholder:text-outline/40 focus:outline-none focus:border-primary transition-colors disabled:cursor-not-allowed disabled:opacity-50 resize-none',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
