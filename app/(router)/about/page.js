import Image from "next/image"
import Link from "next/link"
import { FaEnvelope, FaLinkedinIn, FaTwitter } from "react-icons/fa"

function AboutPage() {
  return (
    <article>
      <div className="w-full md:w-1/2 rounded-br-full px-5 lg:px-20 text-slate-200 bg-purple-700">
        <h1>About Us</h1>
      </div>
      <section className="grid grid-cols-1 gap-5 items-center text-slate-700 lg:grid-cols-2 py-10 px-5 lg:px-20">
        <div className="">
          <Image src="/course_banner.jpg" className="object-cover w-full h-full" width={300} height={400} alt="college-students" />
        </div>
        <div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia et consequuntur, quos temporibus voluptas neque esse, ullam sapiente dolore quia culpa soluta vitae omnis odio minus repellendus quasi! Odit fugit, aspernatur tenetur nesciunt laborum optio repudiandae reprehenderit amet vero, eaque enim eligendi dolore velit libero error perspiciatis autem obcaecati quo eveniet soluta ad. Nemo aspernatur voluptatibus perferendis repellat neque aperiam ipsum nulla aut, dolore quod ut voluptate dolorem ab distinctio pariatur vitae exercitationem id repellendus facere, suscipit molestias delectus qui illo? Blanditiis et illum itaque consequuntur commodi voluptate cupiditate, a eum iure odio perferendis libero hic cum quas placeat vitae?</p>
        </div>
      </section>

      {/* instructors */}
      <section className="py-10 px-5 lg:px-20 text-slate-700">
        <h3 className="text-center">Seasoned Instructors</h3>
        <div className="flex flex-wrap justify-center mt-4 gap-5">
          <figure className="flex flex-col gap-2 max-w-[350px] rounded-md hover:shadow-md ease-in-out duration-300 hover:shadow-purple-700 bg-slate-300">
            <Image src="/woman-avatar.png" className="rounded-t-md w-full" width={100} height={100} alt="avatar"/>
            <figcaption className="p-3">
              <h4>Mary James</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia et consequuntur, quos temporibus voluptas neque esse, ullam sapiente dolore quia culpa soluta vitae omnis odio minus repellendus quasi! Odit fugit, aspernatur tenetur nesciunt laborum optio repudiandae reprehenderit amet vero, eaque enim eligendi dolore velit libero error perspiciatis autem obcaecati quo eveniet soluta ad.</p>
              <div className="flex gap-4 justify-end text-2xl">
                <Link href="https://linkedin.com/in/"><FaLinkedinIn/></Link>
                <Link href="https://linkedin.com/in/"><FaTwitter/></Link>
                <Link href="mailto: xample@mail.com"><FaEnvelope/></Link>
              </div>
            </figcaption>
          </figure>
          <figure className="flex flex-col gap-2 max-w-[350px] rounded-md hover:shadow-md ease-in-out duration-300 hover:shadow-purple-700 bg-slate-300">
            <Image src="/woman-avatar.png" className="rounded-t-md w-full" width={100} height={100} alt="avatar"/>
            <figcaption className="p-3">
              <h4>Mary James</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia et consequuntur, quos temporibus voluptas neque esse, ullam sapiente dolore quia culpa soluta vitae omnis odio minus repellendus quasi! Odit fugit, aspernatur tenetur nesciunt laborum optio repudiandae reprehenderit amet vero, eaque enim eligendi dolore velit libero error perspiciatis autem obcaecati quo eveniet soluta ad.</p>
              <div className="flex gap-4 justify-end text-2xl">
                <Link href="https://linkedin.com/in/"><FaLinkedinIn/></Link>
                <Link href="https://linkedin.com/in/"><FaTwitter/></Link>
                <Link href="mailto: xample@mail.com"><FaEnvelope/></Link>
              </div>
            </figcaption>
          </figure>
          <figure className="flex flex-col gap-2 max-w-[350px] rounded-md hover:shadow-md ease-in-out duration-300 hover:shadow-purple-700 bg-slate-300">
            <Image src="/woman-avatar.png" className="rounded-t-md w-full" width={100} height={100} alt="avatar"/>
            <figcaption className="p-3">
              <h4>Mary James</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia et consequuntur, quos temporibus voluptas neque esse, ullam sapiente dolore quia culpa soluta vitae omnis odio minus repellendus quasi! Odit fugit, aspernatur tenetur nesciunt laborum optio repudiandae reprehenderit amet vero, eaque enim eligendi dolore velit libero error perspiciatis autem obcaecati quo eveniet soluta ad.</p>
              <div className="flex gap-4 justify-end text-2xl">
                <Link href="https://linkedin.com/in/"><FaLinkedinIn/></Link>
                <Link href="https://linkedin.com/in/"><FaTwitter/></Link>
                <Link href="mailto: xample@mail.com"><FaEnvelope/></Link>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
    </article>
  )
}

export default AboutPage