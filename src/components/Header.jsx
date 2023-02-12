import React from 'react'

export default function Header() {
  return (
    <header className='sticky top-0 bg-blue-600 px-6 py-8 lg:py-8 lg:px-40 shadow-lg z-auto'>
        <h1 className='text-2xl font-bold text-white' data-cy="header-title">
            TO DO LIST APP
        </h1 >
    </header >
  )
}
