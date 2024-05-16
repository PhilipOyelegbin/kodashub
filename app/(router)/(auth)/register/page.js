import Image from 'next/image'
import Link from 'next/link'

function RegistrationPage() {
  return (
    <article>
      <div className="w-full md:w-1/2 rounded-br-full px-5 lg:px-20 text-slate-200 bg-purple-700">
        <h1>Register</h1>
      </div>
      <section className="flex flex-col gap-5 md:flex-row items-center justify-between py-10 px-5 lg:px-20 text-slate-700">
        <Image src="/secure-illustration.png" className="flex-1" width={300} height={400} alt="banner"/>
        <form className='flex flex-col flex-1 gap-5 p-5 md:p-10 rounded-md'>
          <input type="text" className='form-input' placeholder='Enter your full name'/>
          <input type="email" className='form-input' placeholder='Enter your email'/>
          <input type="tel" className='form-input' placeholder='Enter your phone number'/>
          <input type="password" className='form-input' placeholder='Enter your password'/>
          <div className="flex flex-wrap items-center justify-between">
            <button className='btn'>Send</button>
            <p>
              {"Do you have an account?"}
              <Link href="/login" className="text-purple-700 font-normal"> Login</Link>
            </p>
          </div>
        </form>
      </section>
    </article>
  )
}

export default RegistrationPage