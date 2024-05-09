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
          <p>We believe that learning should be accessible, engaging, and effective.

Our team of experts in diverse technical career came together with a shared vision: to empower people with the needed skills for tomorrows job. With us you only need to purchase a course and an instructor will be assigned to you in relation to the course you purchased. Knowing what was missing from traditional learning platforms, we set out to create something better.

Our mission is to empower brilliant minds like you with the needed skills to start your technical career. We strive to:
- Make learning accessible to everyone, everywhere
- Provide high-quality, engaging, and relevant courses.
- Continuously improve and innovate our services.

*Our Values*
- *Accessibility*: We believe that learning should be available to all, regardless of location, device, or ability.
- *Engaging*: We stay at the forefront of technology and pedagogy to bring you the best learning experience.
- *Quality*: We are committed to delivering high-quality content and services that meet the highest standards.

Are you an individual looking to upskill? Look no further, discover our courses, and start achieving your goals today!</p>
        </div>
      </section>

      {/* instructors */}
      <section className="py-10 px-5 lg:px-20 text-slate-700">
        <h3 className="text-center">Our Seasoned Instructors</h3>
        <div className="flex flex-wrap justify-center mt-4 gap-5">
          <figure className="flex flex-col gap-2 max-w-[350px] rounded-md hover:shadow-md ease-in-out duration-300 hover:shadow-purple-700 bg-slate-300">
            <Image src="/philip.png" className="rounded-t-md w-full h-[250px]" width={100} height={100} alt="avatar"/>
            <figcaption className="p-3">
              <h4>Philip Oyelegbin</h4>
              <p>I am a Frontend Developer, and Cloud Engineer with a background in customer support and front-end development. I have proven skills in customer service, technical support, JavaScript, HTML5, CSS, React.js, cloud services, and Infrastructure as Code (IaC). I am experienced with Google Cloud Platform (GCP), Terraform, and Ansible.</p>
              <div className="flex gap-4 justify-end text-2xl mt-2">
                <Link href="https://linkedin.com/in/philipoyelegbin"><FaLinkedinIn/></Link>
                <Link href="https://mobile.twitter.com/OyelegbinPhilip"><FaTwitter/></Link>
                <Link href="mailto: philipoyelegbin@gmail.com"><FaEnvelope/></Link>
              </div>
            </figcaption>
          </figure>
          <figure className="flex flex-col gap-2 max-w-[350px] rounded-md hover:shadow-md ease-in-out duration-300 hover:shadow-purple-700 bg-slate-300">
            <Image src="/woman-avatar.png" className="rounded-t-md w-full h-[250px]" width={100} height={100} alt="avatar"/>
            <figcaption className="p-3">
              <h4>Peter Oyelegbin</h4>
              <p>I am a skilled Backend Engineer with a perfectionist personality based in Lagos. He has more than 2 years hands-on experience building functional and secure Apps/APIs. He currently volunteers as a Backend Engineer at See9ja remotely where he develops a scalable, fast, and secure server-side application and collaborate with other developers to build a fully functional web app.</p>
              <div className="flex gap-4 justify-end text-2xl mt-2">
                <Link href="https://linkedin.com/in/peteroyelegbin"><FaLinkedinIn/></Link>
                <Link href="https://twitter.com/PeterOyelegbin"><FaTwitter/></Link>
                <Link href="mailto: peteroyelegbin@gmail.com"><FaEnvelope/></Link>
              </div>
            </figcaption>
          </figure>
          <figure className="flex flex-col gap-2 max-w-[350px] rounded-md hover:shadow-md ease-in-out duration-300 hover:shadow-purple-700 bg-slate-300">
            <Image src="/woman-avatar.png" className="rounded-t-md w-full h-[250px]" width={100} height={100} alt="avatar"/>
            <figcaption className="p-3">
              <h4>Mary James</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia et consequuntur, quos temporibus voluptas neque esse, ullam sapiente dolore quia culpa soluta vitae omnis odio minus repellendus quasi! Odit fugit, aspernatur tenetur nesciunt laborum optio repudiandae reprehenderit amet vero.</p>
              <div className="flex gap-4 justify-end text-2xl mt-2">
                <Link href="https://linkedin.com/in/philipoyelegbin"><FaLinkedinIn/></Link>
                <Link href="https://mobile.twitter.com/OyelegbinPhilip"><FaTwitter/></Link>
                <Link href="mailto: philipoyelegbin@gmail.com"><FaEnvelope/></Link>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
    </article>
  )
}

export default AboutPage
