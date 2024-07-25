import WhoWeAre from "./_components/WhoWeAre";
import Teams from "./_components/Teams";

function About() {
  return (
    <article>
      <div className='w-full md:w-1/2 rounded-br-full px-5 lg:px-20 text-slate-200 bg-purple-700'>
        <h1>About Us</h1>
      </div>
      <WhoWeAre />
      <Teams />
    </article>
  );
}

export default About;
