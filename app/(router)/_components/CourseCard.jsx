import Image from 'next/image'

export default function CourseCard({cover_image, w, h, children}) {
  return (
    <figure className='max-w-[350px] bg-slate-300 rounded-md hover:shadow-md hover:shadow-purple-400 ease-in-out duration-300'>
      <Image className="rounded-t-md w-full object-cover" src={cover_image} width={w} height={h} alt="cover-image"/>
      <figcaption className='flex flex-col gap-2 p-3'>
        {children}
      </figcaption>
    </figure>
  )
}
