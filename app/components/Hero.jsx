import Image from "next/image";
import Button from "./Button";

function Hero() {
  return (
    <header className="flex items-center justify-center h-svh px-5 lg:px-20 bg-slate-900 bg-[url('/servers.jpg')] bg-blend-overlay bg-center bg-cover bg-no-repeat">
      <div className='flex flex-col items-center gap-5 text-center text-slate-200 md:w-2/3 xl:w-2/5'>
        <h1>
          <span className='text-purple-700'>Reliable</span> &{" "}
          <span className='text-purple-700'>Affordable</span> Web Hosting
          Solutions
        </h1>
        <h5 className='mb-5'>
          Experience unparalleled web hosting and development services tailored
          to your needs. Join us and elevate your online presence.
        </h5>
        <Button url='/register' label='Get Started' />
      </div>
    </header>
  );
}

export default Hero;
