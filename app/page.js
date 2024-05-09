import Image from "next/image";
import Link from "next/link";
import Button from "./(router)/_components/Button";
import CourseCard from "./(router)/_components/CourseCard";
import { Courses, Testimonials } from "./utils/data";
import { FaCube } from "react-icons/fa";

export default function Home() {
  return (
    <article>
      {/* hero */}
      <header className="flex items-center justify-between h-svh px-5 lg:px-20 bg-slate-700 bg-[url('/hero_bg.png')] bg-blend-overlay bg-center bg-cover bg-no-repeat">
        <div className="flex flex-col items-center gap-3 text-center text-slate-200 lg:items-start lg:w-1/2 lg:text-left">
          <h1>Learn New Skills Online With <span className="text-purple-700">Top Instructors</span></h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia et consequuntur, quos temporibus voluptas neque esse, ullam sapiente dolore quia culpa soluta vitae omnis odio minus repellendus quasi! Odit fugit, aspernatur tenetur nesciunt laborum optio repudiandae reprehenderit amet vero, eaque enim eligendi dolore velit libero error perspiciatis autem obcaecati quo eveniet soluta ad.</p>
          <Button url="/courses" label="Get Started"/>
        </div>
        <div className="hidden lg:flex justify-center w-1/2 h-full">
          <Image src="/college-students.png" className="object-cover w-full h-full" width={300} height={400} alt="college-students" />
        </div>
      </header>

      {/* top courses */}
      <section className="py-10 px-5 lg:px-20 text-slate-700">
        <div className="flex justify-between items-center">
          <h3>Trending <span className="text-purple-700">Skills</span></h3>
          <Button url="/courses" label="View More"/>
        </div>

        {/* card container */}
        <div className="flex flex-wrap justify-center items-center gap-5 mt-4">
          {Courses.filter(item => item.favourite === true).map((course, index) => 
            <CourseCard key={index} cover_image={course.cover_image} w={280} h={100}>
              <h4 className="line-clamp-1">{course.title}</h4>
              <p className="line-clamp-3">{course.description}</p>
              <div className="flex justify-between items-center">
                <Button url={course.url} label="Read more"/>
                <span className="text-red-500 animate-bounce">{course.price}</span>
              </div>
            </CourseCard>
          )}
        </div>
      </section>

      {/* features */}
      <section className="py-10 px-5 lg:px-20 bg-purple-900 text-slate-200">
        <h3 className="text-center">Empowering Education with Our Features</h3>
        <p className="text-center mt-2">Discover the key features that make <span className="text-white font-bold">KodasHub</span> stand out</p>
        <div className="flex flex-wrap justify-center mt-4 gap-5">
          <div className="flex gap-2 max-w-[350px] rounded-md hover:shadow-md ease-in-out duration-300 hover:shadow-slate-500 bg-purple-700 p-3">
            <FaCube className="w-6 h-6"/>
            <div>
              <h4>Interactive Learning</h4>
              <p>Engage students with interactive content and activities</p>
            </div>
          </div>
          <div className="flex gap-2 max-w-[350px] rounded-md hover:shadow-md ease-in-out duration-300 hover:shadow-slate-500 bg-purple-700 p-3">
            <FaCube className="w-6 h-6"/>
            <div>
              <h4>Progress Tracking</h4>
              <p>Monitor student progress and performance in real-time</p>
            </div>
          </div>
          <div className="flex gap-2 max-w-[350px] rounded-md hover:shadow-md ease-in-out duration-300 hover:shadow-slate-500 bg-purple-700 p-3">
            <FaCube className="w-6 h-6"/>
            <div>
              <h4>Collaborative Tools</h4>
              <p>Facilitate collaboration among students and teachers</p>
            </div>
          </div>
          <div className="flex gap-2 max-w-[350px] rounded-md hover:shadow-md ease-in-out duration-300 hover:shadow-slate-500 bg-purple-700 p-3">
            <FaCube className="w-6 h-6"/>
            <div>
              <h4>Mobile Compatibility</h4>
              <p>Access learning materials on-the-go with mobile support</p>
            </div>
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section className="py-10 px-5 lg:px-20 text-slate-700">
        <h3 className="text-center">Our Client Words of Mouth</h3>
        <div className="flex flex-wrap justify-center mt-4 gap-5">
          {Testimonials.map((list, index) =>
            <figure key={index} className="flex gap-2 max-w-[350px] rounded-md hover:shadow-md ease-in-out duration-300 hover:shadow-purple-700 bg-slate-300 p-3">
              <Image src={list.cover_image} className="rounded-full aspect-square" width={100} height={100} alt="avatar"/>
              <figcaption>
                <h4>{list.name}</h4>
                <p>{list.summary}</p>
              </figcaption>
            </figure>
          )}
        </div>
      </section>
    </article>
  );
}