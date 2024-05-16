import Image from "next/image"
import Link from "next/link"

function LoginPage() {
  return (
    <article>
      <div className="w-full md:w-1/2 rounded-br-full px-5 lg:px-20 text-slate-200 bg-purple-700">
        <h1>Login</h1>
      </div>
      <section className="flex flex-col gap-5 md:flex-row items-center justify-between py-10 px-5 lg:px-20 text-slate-700">
        <Image src="/secure-illustration.png" className="flex-1" width={300} height={400} alt="banner"/>
        <form className='flex flex-col flex-1 gap-5 p-5 md:p-10 rounded-md'>
          <input type="email" className='form-input' placeholder='Enter your email'/>
          <input type="password" className='form-input' placeholder='Enter your password'/>
          <div className="flex flex-wrap items-center justify-between">
            <button className='btn'>Send</button>
            <Link href="/register" className="underline"> Forgot password?</Link>
          </div>
        </form>
      </section>
    </article>
  )
}

export default LoginPage