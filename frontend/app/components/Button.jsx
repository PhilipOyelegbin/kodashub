import Link from 'next/link'

export default function Button({url, label}) {
  return (
    <Link href={url} className='btn'>{label}</Link>
  )
}
