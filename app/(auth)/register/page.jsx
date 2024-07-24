import Link from "next/link";

const Register = () => {
  return (
    <article>
      <Link href='/' target='_parent'>
        Go home
      </Link>
      <Link href='/login'>Login</Link>
      <h1>Signup</h1>
      <p>Welcome to the Signup form!</p>
    </article>
  );
};

export default Register;
