import { UpdatePassword } from "./_components/UpdatePassword";
import { User } from "./_components/User";

const Profile = () => {
  return (
    <article>
      <User />
      <UpdatePassword />
    </article>
  );
};

export default Profile;
