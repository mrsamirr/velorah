import * as React from 'react'
import { cn } from '@/lib/utils/cn'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-10 w-full bg-transparent border-b border-outline-variant px-0 py-2 text-sm text-on-surface placeholder:text-outline/40 focus:outline-none focus:border-primary transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}

export { Input }
