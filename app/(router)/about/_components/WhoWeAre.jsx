import Image from "next/image";

function WhoWeAre() {
  return (
    <section className='grid grid-cols-1 gap-5 items-center text-slate-700 lg:grid-cols-2 py-10 px-5 lg:px-20'>
      <div className=''>
        <Image
          src='/support.png'
          className='object-cover w-full h-full'
          width={300}
          height={400}
          alt='college-students'
        />
      </div>
      <div>
        <h3>
          A cutting-edge technology company empowering businesses to thrive in
          the cloud era.
        </h3>
        <p>
          Founded on the belief that technology should simplify and accelerate
          business success, our team of experts has come together to provide a
          comprehensive suite of services designed to help businesses navigate
          the rapidly evolving digital landscape. Our mission is to help
          organizations harness the power of cloud computing, web development,
          and data analytics to drive innovation, efficiency, and growth.
        </p>

        <h4>Our Values</h4>
        <ul className='list-disc list-inside font-light'>
          <li>Customer-centricity</li>
          <li>Innovation</li>
          <li>Excellence</li>
          <li>Collaboration</li>
          <li>Integrity</li>
        </ul>
      </div>
    </section>
  );
}

export default WhoWeAre;
