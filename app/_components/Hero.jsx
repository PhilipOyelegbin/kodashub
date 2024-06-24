import Image from "next/image";
import Button from "./Button";

function Hero() {
  return (
    <header className="flex items-center justify-between h-svh px-5 lg:px-20 bg-slate-700 bg-[url('/hero_bg.png')] bg-blend-overlay bg-center bg-cover bg-no-repeat">
      <div className='flex flex-col items-center gap-3 text-center text-slate-200 lg:items-start lg:w-1/2 lg:text-left'>
        <h1>
          Elevate Your Cloud Management for Enhanced{" "}
          <span className='text-purple-700'>Efficiency</span>
        </h1>
        <p>
          Our mission is to help organizations harness the power of cloud
          computing, web development, and data analytics to drive innovation,
          efficiency, and growth.
        </p>
        <Button url='/' label='Get In Touch' />
      </div>
      <div className='hidden lg:flex justify-center w-1/2 h-full'>
        <Image
          src='/va.png'
          className='object-fill w-full h-full'
          width={300}
          height={400}
          alt='college-students'
        />
      </div>
    </header>
  );
}

export default Hero;
