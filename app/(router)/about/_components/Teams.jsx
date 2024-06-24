import Image from "next/image";

function Teams() {
  return (
    <section className='py-10 px-5 lg:px-20 text-slate-700'>
      <h3 className='text-center'>Our Seasoned Teams</h3>
      <div className='flex flex-wrap justify-center mt-4 gap-5'>
        <figure className='flex flex-col gap-2 max-w-[350px] rounded-md hover:shadow-md ease-in-out duration-300 hover:shadow-purple-700 bg-slate-300'>
          <Image
            src='/philip.png'
            className='object-cover rounded-t-md w-full h-[250px]'
            width={100}
            height={100}
            alt='avatar'
          />
          <figcaption className='p-3'>
            <h4>Philip Oyelegbin</h4>
          </figcaption>
        </figure>
        <figure className='flex flex-col gap-2 max-w-[350px] rounded-md hover:shadow-md ease-in-out duration-300 hover:shadow-purple-700 bg-slate-300'>
          <Image
            src='/woman-avatar.png'
            className='object-cover rounded-t-md w-full h-[250px]'
            width={100}
            height={100}
            alt='avatar'
          />
          <figcaption className='p-3'>
            <h4>Peter Oyelegbin</h4>
          </figcaption>
        </figure>
        <figure className='flex flex-col gap-2 max-w-[350px] rounded-md hover:shadow-md ease-in-out duration-300 hover:shadow-purple-700 bg-slate-300'>
          <Image
            src='/woman-avatar.png'
            className='object-cover rounded-t-md w-full h-[250px]'
            width={100}
            height={100}
            alt='avatar'
          />
          <figcaption className='p-3'>
            <h4>Mary James</h4>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default Teams;
