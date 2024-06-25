import React from "react";
import { FaCube } from "react-icons/fa";

function Features() {
  return (
    <section className='py-10 px-5 lg:px-20'>
      <h3 className='text-center'>Enhancing Efficiency and Scalability</h3>
      <p className='text-center mt-2'>
        Discover the key features that make{" "}
        <span className='text-purple-500 font-bold'>KodasHub</span> stand out
      </p>
      <div className='flex flex-wrap justify-center mt-4 gap-5'>
        <div
          className='flex gap-2 max-w-[350px] border border-purple-500 py-5 px-14'
          style={{
            borderRadius: "116px 0px",
          }}
        >
          <FaCube className='w-6 h-6' />
          <div>
            <h4>Cost Optimization</h4>
            <p>Engage students with interactive content and activities</p>
          </div>
        </div>
        <div
          className='flex gap-2 max-w-[350px] border border-purple-500 py-5 px-14'
          style={{
            borderRadius: "116px 0px",
          }}
        >
          <FaCube className='w-6 h-6' />
          <div>
            <h4>Enhanced Security</h4>
            <p>Monitor student progress and performance in real-time</p>
          </div>
        </div>
        <div
          className='flex gap-2 max-w-[350px] border border-purple-500 py-5 px-14'
          style={{
            borderRadius: "116px 0px",
          }}
        >
          <FaCube className='w-6 h-6' />
          <div>
            <h4>Streamlined Operations</h4>
            <p>Facilitate collaboration among students and teachers</p>
          </div>
        </div>
        <div
          className='flex gap-2 max-w-[350px] border border-purple-500 py-5 px-14'
          style={{
            borderRadius: "116px 0px",
          }}
        >
          <FaCube className='w-6 h-6' />
          <div>
            <h4>Performance and Reliability</h4>
            <p>Access learning materials on-the-go with mobile support</p>
          </div>
        </div>
        <div
          className='flex gap-2 max-w-[350px] border border-purple-500 py-5 px-14'
          style={{
            borderRadius: "116px 0px",
          }}
        >
          <FaCube className='w-6 h-6' />
          <div>
            <h4>Scalability and Flexibility</h4>
            <p>Access learning materials on-the-go with mobile support</p>
          </div>
        </div>
        <div
          className='flex gap-2 max-w-[350px] border border-purple-500 py-5 px-14'
          style={{
            borderRadius: "116px 0px",
          }}
        >
          <FaCube className='w-6 h-6' />
          <div>
            <h4>Monitoring and Support</h4>
            <p>Access learning materials on-the-go with mobile support</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
