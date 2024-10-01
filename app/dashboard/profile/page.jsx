import { UpdatePassword } from "./_components/UpdatePassword";
import { User } from "./_components/User";

const Profile = () => {
  return (
    <section className='space-y-5 flex flex-wrap justify-around'>
      <User />
      <UpdatePassword />
    </section>
  );
};

export default Profile;
