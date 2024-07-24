import Link from "next/link";

const Login = () => {
  return (
    <article>
      <Link href='/' target='_parent'>
        Go home
      </Link>
      <Link href='/register'>Register</Link>
      <h1>Login</h1>
      <p>Welcome to the Login form!</p>
    </article>
  );
};

export default Login;
