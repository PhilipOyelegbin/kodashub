import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { Verify } from "../../utils/middleware";

function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const authenticate = Verify(username, password);

    if (authenticate) {
      localStorage.setItem("ssp", import.meta.env.VITE_SSP);
      navigate("/admin/panel");
    } else {
      toast.error("Invalid username or password");
    }
  };

  return (
    <article className='h-screen flex justify-center items-center bg-purple-100'>
      <div className='max-w-md w-full p-4 bg-white rounded shadow-md'>
        <h2 className='text-3xl font-bold text-purple-600 mb-4'>Admin Login</h2>

        <form onSubmit={handleSubmit}>
          <label className='block mb-2'>
            <span className='text-gray-700'>Username</span>
            <input
              type='text'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className='w-full p-2 pl-10 text-sm text-gray-700'
              placeholder='Enter username'
            />
          </label>
          <label className='block mb-2'>
            <span className='text-gray-700'>Password</span>
            <input
              type='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className='w-full p-2 pl-10 text-sm text-gray-700'
              placeholder='Enter password'
            />
          </label>
          <button
            type='submit'
            className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'>
            Login
          </button>
        </form>
      </div>
    </article>
  );
}

export default AdminLoginPage;
