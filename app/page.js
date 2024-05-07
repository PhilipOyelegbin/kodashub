import Image from "next/image";
import Link from "next/link";
import Button from "./(router)/_components/Button";
import CourseCard from "./(router)/_components/CourseCard";

export default function Home() {
  return (
    <article>
      <header className="flex items-center h-svh px-5 lg:px-20 bg-slate-700 bg-[url('/hero_bg.png')] bg-blend-overlay bg-center bg-cover bg-no-repeat">
        <div className="flex flex-col items-center gap-3 text-center text-slate-200 lg:items-start lg:w-1/2 lg:text-left">
          <h1>Learn New Skills Online With <span className="text-purple-700">Top Instructors</span></h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia et consequuntur, quos temporibus voluptas neque esse, ullam sapiente dolore quia culpa soluta vitae omnis odio minus repellendus quasi! Odit fugit, aspernatur tenetur nesciunt laborum optio repudiandae reprehenderit amet vero, eaque enim eligendi dolore velit libero error perspiciatis autem obcaecati quo eveniet soluta ad.</p>
          <Button url="/courses" label="Get Started"/>
        </div>
      </header>
      <section className="py-10 px-5 lg:px-20">
        <div className="flex justify-between items-center">
          <h3>Trending <span className="text-purple-700">Skills</span></h3>
          <Button url="/courses" label="View More"/>
        </div>

        {/* card container */}
        <div className="flex flex-wrap justify-center items-center gap-5 mt-4">
          <CourseCard>
            <h4 className="line-clamp-1">Frontend (React)</h4>
            <p className="line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia et consequuntur, quos temporibus voluptas neque esse, ullam sapiente dolore quia culpa soluta vitae omnis odio minus repellendus quasi! Odit fugit, aspernatur tenetur nesciunt laborum optio repudiandae reprehenderit amet vero, eaque enim eligendi dolore velit libero error perspiciatis autem obcaecati quo eveniet soluta ad. Nemo aspernatur voluptatibus perferendis repellat neque aperiam ipsum nulla aut, dolore quod ut voluptate dolorem ab distinctio pariatur vitae exercitationem id repellendus facere, suscipit molestias delectus qui illo? Blanditiis et illum itaque consequuntur commodi voluptate cupiditate, a eum iure odio perferendis libero hic cum quas placeat vitae?</p>
            <div className="flex justify-between items-center">
              <Button url="/" label="Read more"/>
              <span className="text-red-500">₦100,000</span>
            </div>
          </CourseCard>
          <CourseCard>
            <h4 className="line-clamp-1">Frontend (React)</h4>
            <p className="line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia et consequuntur, quos temporibus voluptas neque esse, ullam sapiente dolore quia culpa soluta vitae omnis odio minus repellendus quasi! Odit fugit, aspernatur tenetur nesciunt laborum optio repudiandae reprehenderit amet vero, eaque enim eligendi dolore velit libero error perspiciatis autem obcaecati quo eveniet soluta ad. Nemo aspernatur voluptatibus perferendis repellat neque aperiam ipsum nulla aut, dolore quod ut voluptate dolorem ab distinctio pariatur vitae exercitationem id repellendus facere, suscipit molestias delectus qui illo? Blanditiis et illum itaque consequuntur commodi voluptate cupiditate, a eum iure odio perferendis libero hic cum quas placeat vitae?</p>
            <div className="flex justify-between items-center">
              <Button url="/" label="Read more"/>
              <span className="text-red-500">₦100,000</span>
            </div>
          </CourseCard>
          <CourseCard>
            <h4 className="line-clamp-1">Frontend (React)</h4>
            <p className="line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia et consequuntur, quos temporibus voluptas neque esse, ullam sapiente dolore quia culpa soluta vitae omnis odio minus repellendus quasi! Odit fugit, aspernatur tenetur nesciunt laborum optio repudiandae reprehenderit amet vero, eaque enim eligendi dolore velit libero error perspiciatis autem obcaecati quo eveniet soluta ad. Nemo aspernatur voluptatibus perferendis repellat neque aperiam ipsum nulla aut, dolore quod ut voluptate dolorem ab distinctio pariatur vitae exercitationem id repellendus facere, suscipit molestias delectus qui illo? Blanditiis et illum itaque consequuntur commodi voluptate cupiditate, a eum iure odio perferendis libero hic cum quas placeat vitae?</p>
            <div className="flex justify-between items-center">
              <Button url="/" label="Read more"/>
              <span className="text-red-500">₦100,000</span>
            </div>
          </CourseCard>
          <CourseCard>
            <h4 className="line-clamp-1">Frontend (React)</h4>
            <p className="line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia et consequuntur, quos temporibus voluptas neque esse, ullam sapiente dolore quia culpa soluta vitae omnis odio minus repellendus quasi! Odit fugit, aspernatur tenetur nesciunt laborum optio repudiandae reprehenderit amet vero, eaque enim eligendi dolore velit libero error perspiciatis autem obcaecati quo eveniet soluta ad. Nemo aspernatur voluptatibus perferendis repellat neque aperiam ipsum nulla aut, dolore quod ut voluptate dolorem ab distinctio pariatur vitae exercitationem id repellendus facere, suscipit molestias delectus qui illo? Blanditiis et illum itaque consequuntur commodi voluptate cupiditate, a eum iure odio perferendis libero hic cum quas placeat vitae?</p>
            <div className="flex justify-between items-center">
              <Button url="/" label="Read more"/>
              <span className="text-red-500">₦100,000</span>
            </div>
          </CourseCard>
          <CourseCard>
            <h4 className="line-clamp-1">Frontend (React)</h4>
            <p className="line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia et consequuntur, quos temporibus voluptas neque esse, ullam sapiente dolore quia culpa soluta vitae omnis odio minus repellendus quasi! Odit fugit, aspernatur tenetur nesciunt laborum optio repudiandae reprehenderit amet vero, eaque enim eligendi dolore velit libero error perspiciatis autem obcaecati quo eveniet soluta ad. Nemo aspernatur voluptatibus perferendis repellat neque aperiam ipsum nulla aut, dolore quod ut voluptate dolorem ab distinctio pariatur vitae exercitationem id repellendus facere, suscipit molestias delectus qui illo? Blanditiis et illum itaque consequuntur commodi voluptate cupiditate, a eum iure odio perferendis libero hic cum quas placeat vitae?</p>
            <div className="flex justify-between items-center">
              <Button url="/" label="Read more"/>
              <span className="text-red-500">₦100,000</span>
            </div>
          </CourseCard>
        </div>
      </section>
    </article>
  );
}