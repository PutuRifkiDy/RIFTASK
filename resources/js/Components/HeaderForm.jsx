import React from 'react'

export default function HeaderForm({ className, title, subtitle }) {
  return (
    <div className={cn('px-4 sm:px-0', className)}>
      <h2 className='text-base font-semibold leading-relaxed text-foreground'>{title}</h2>
      <p className='mt-1 text-muted-foreground leading-6'>{subtitle}</p>
    </div>
  )
}
