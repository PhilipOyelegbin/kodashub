import Image from "next/image";
import { Testimonials as TestimonialData } from "../utils/data";
import { FaStar } from "react-icons/fa";

function Testimonials() {
  return (
    <section className='py-10 px-5 lg:px-20 text-slate-700'>
      <h3 className='text-center'>Client Feedback and Reviews</h3>
      <div className='flex flex-wrap justify-center mt-4 gap-5'>
        {TestimonialData.map((list, index) => (
          <figure
            key={index}
            className='flex gap-2 items-center max-w-[350px] rounded-xl hover:shadow-md ease-in-out duration-300 hover:shadow-purple-700 bg-slate-200 p-3'
          >
            <Image
              src={list.cover_image}
              className='rounded-full w-[80px] aspect-square'
              width={100}
              height={100}
              alt='avatar'
            />
            <figcaption>
              <h4>{list.name}</h4>
              <p>{list.summary}</p>
              <span className='flex gap-2 mt-2 mx-auto w-fit text-purple-500'>
                {Array(list.rating)
                  .fill(0)
                  .map((d, i) => (
                    <FaStar key={i} />
                  ))}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
