import Image from "next/image";
import { Testimonials as TestimonialData } from "../utils/data";

function Testimonials() {
  return (
    <section className='py-10 px-5 lg:px-20'>
      <h3 className='text-3xl text-center font-bold text-purple-600 mb-4'>
        What Our Clients Say
      </h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {TestimonialData.map((testimony, index) => (
          <div className='bg-purple-100 p-4 rounded shadow-md' key={index}>
            <Image
              src={testimony.cover_image}
              width={300}
              height={300}
              alt={testimony.cover_image}
              className='w-16 h-16 object-cover rounded-full mb-4'
            />
            <p className='text-gray-700'>{testimony.summary}</p>
            <h4 className='text-lg font-bold text-purple-600 mb-2'>
              {testimony.name}
            </h4>
            <p className='text-gray-700'>CEO, ABC Corporation</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
