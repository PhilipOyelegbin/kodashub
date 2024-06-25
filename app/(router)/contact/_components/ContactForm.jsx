function ContactForm() {
  return (
    <form className='flex flex-col gap-5 w-full max-w-[550px] border border-purple-700 p-5 rounded-xl'>
      <h3>Questions or Feedback?</h3>
      <input
        type='text'
        className='form-input'
        placeholder='Enter your full name'
      />
      <input
        type='email'
        className='form-input'
        placeholder='Enter your email address'
      />
      <textarea
        name='message'
        className='form-input resize-y'
        cols={30}
        rows={5}
        placeholder='Enter your email address'
      ></textarea>
      <button className='btn'>Send</button>
    </form>
  );
}

export default ContactForm;
