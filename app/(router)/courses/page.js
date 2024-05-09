import { Courses } from "@/app/utils/data"
import Button from "../_components/Button"
import CourseCard from "../_components/CourseCard"

function CoursePage() {
  return (
    <article>
      <div className="w-full md:w-1/2 rounded-br-full px-5 lg:px-20 text-slate-200 bg-purple-700">
        <h1>Courses</h1>
      </div>

      {/* card container */}
      <section className="py-10 px-5 lg:px-20 text-slate-700">
        <div className="flex justify-between items-center">
          <h3>Course <span className="text-purple-700">Library</span></h3>
          <select className="w-max px-3 py-2 rounded-md bg-purple-700 text-slate-200">
            <option>All</option>
            <option>Web</option>
            <option>CLoud</option>
            <option>Robotics</option>
          </select>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-5 mt-4">
          {Courses.map((course, index) => 
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
    </article>
  )
}

export default CoursePage