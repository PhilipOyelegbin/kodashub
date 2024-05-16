"use client"
import Button from "../_components/Button"
import CourseCard from "../_components/CourseCard"
import { FaSearch } from "react-icons/fa"
import { useEffect, useState } from "react"

function CoursePage() {
  const [courses, setCourses] = useState()
  
  useEffect(() => {
    fetch('http://localhost:3000/api/course')
      .then(resp => resp.json())
      .then(data => setCourses(data))
      .catch(error => console.log(error));
  }, [])

  return (
    <article>
      <div className="w-full md:w-1/2 rounded-br-full px-5 lg:px-20 text-slate-200 bg-purple-700">
        <h1>Courses</h1>
      </div>

      {/* card container */}
      <section className="py-10 px-5 lg:px-20 text-slate-700">
        <div className="flex flex-wrap gap-5 justify-between items-center">
          <div className="mx-auto sm:mx-0 flex items-center gap-3 shrink bg-white p-2 rounded-md text-slate-700">
            <FaSearch className="h-6 w-6"/>
            <input className="w-full outline-none" type="search" name="course"/>
          </div>
          <select className="mx-auto sm:mx-0 w-max px-3 py-2 rounded-md bg-purple-700 text-slate-200">
            <option>All</option>
            <option>Web</option>
            <option>CLoud</option>
            <option>Robotics</option>
          </select>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-5 mt-4">
          {courses?.map(course => 
            <CourseCard key={course.id} cover_image={course.cover_image || "/course_banner.jpg"} w={280} h={100}>
              <h4 className="line-clamp-1">{course.title}</h4>
              <p className="line-clamp-3">{course.description}</p>
              <div className="flex justify-between items-center">
                <Button url={course.url || "/"} label="Read more"/>
                <span className="text-red-500 animate-bounce">{course.price}</span>
              </div>
            </CourseCard>
          )}
        </div>
      </section>
    </article>
  )
}

export default CoursePage