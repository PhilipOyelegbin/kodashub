import Image from 'next/image'
import React from 'react'

export default function CourseCard({url, w, h, children}) {
  return (
    <figure className='max-w-400 bg-slate-300 rounded-md hover:shadow-md hover:shadow-purple-400'>
        <Image src={url} weight={w} height={h} alt="cover-image"/>
        <figcaption className='flex flex-col gap-2 p-3'>
            {children}
        </figcaption>
    </figure>
  )
}
