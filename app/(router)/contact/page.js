import Link from 'next/link'
import React from 'react'
import { FaEnvelopeOpen, FaTwitter, FaWhatsapp } from 'react-icons/fa'

function ContactPage() {
  return (
    <article>
        <div className="w-full md:w-1/2 rounded-br-full px-5 lg:px-20 text-slate-200 bg-purple-700">
            <h1>Contact Us</h1>
        </div>
        <section className='flex flex-col gap-5 md:flex-row md:h-[80vh] items-center justify-evenly py-10 px-5 lg:px-20 text-slate-700'>
            <form className='flex flex-col gap-5 w-full max-w-[550px] shadow-md shadow-slate-700 p-5 rounded-md'>
                <input type="text" className='form-input' placeholder='Enter your full name'/>
                <input type="email" className='form-input' placeholder='Enter your email address'/>
                <textarea name="message" className='form-input resize-y' cols={30} rows={5} placeholder="Enter your email address" ></textarea>
                <button className='btn'>Send</button>
            </form>
            <div>
                <h3>We are a click away!!!</h3>
                <div className='mt-4'>
                    <Link href="mailto: hq@kh.com" className='flex items-center gap-3 pb-3 border-b'>
                        <FaEnvelopeOpen className='w-6 h-6 text-sky-500'/>
                        <p>hq@kh.com</p>
                    </Link>
                    <Link href="https://" className='flex items-center gap-3 pb-3 border-b'>
                        <FaWhatsapp className='w-6 h-6 text-lime-500'/>
                        <p>+2348XXXXXXXXX</p>
                    </Link>
                    <Link href="https://" className='flex items-center gap-3 pb-3 border-b'>
                        <FaTwitter className='w-6 h-6 text-blue-500'/>
                        <p>@kh_hq</p>
                    </Link>
                </div>
            </div>
        </section>
    </article>
  )
}

export default ContactPage