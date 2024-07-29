"use client";
import Image from "next/image";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export const FAQ = () => {
  const [toggle, setToggle] = useState(null);

  const handleClick = (index) => {
    setToggle(index === toggle ? null : index);
  };

  const faq = [
    {
      question: "What services does KodasHub offer?",
      answer:
        "We offer web hosting, web development, and a variety of other services to help your business grow.",
    },
    {
      question: "Can KodasHub handle e-commerce projects?",
      answer:
        "Yes, we provide comprehensive e-commerce solutions to enhance your online store.",
    },
    {
      question: "How do I start a web development project with KodasHub?",
      answer:
        "Schedule a consultation with us to discuss your needs and we'll help you get started.",
    },
  ];

  return (
    <section className='flex flex-col md:flex-row gap-5 py-10 px-5 lg:px-20'>
      <Image
        src='/questions.jpg'
        className='flex-1 w-72 h-auto rounded-md'
        width={300}
        height={300}
        alt='faq banner'
      />
      <div className='flex-1'>
        <h3 className='text-center'>Frequently Asked Questions</h3>
        <div className='flex flex-col gap-5 mt-3'>
          {faq.map((item, i) => (
            <div key={i}>
              <div className='flex items-center justify-between mb-3'>
                <h6 className='w-full'>{item.question}</h6>
                <FaChevronDown
                  className='cursor-pointer'
                  onClick={() => handleClick(i)}
                />
              </div>
              <p
                className={`${
                  i !== toggle && "hidden"
                } duration-300 ease-linear`}
              >
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
