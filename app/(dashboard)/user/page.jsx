import Link from "next/link";

const Dashboard = () => {
  return (
    <article>
      <Link href='/' target='_parent'>
        Home
      </Link>
      <h1>Dashboard</h1>
      <p>Welcome to the Dashboard!</p>
    </article>
  );
};

export default Dashboard;
