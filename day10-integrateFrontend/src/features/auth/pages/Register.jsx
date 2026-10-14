import { useContext, useState } from "react";
import { Auth } from "../context/AuthProvider";
import useApi from "../../shared/useApi";

const Register = () => {
  const auth = useContext(Auth);
  const api = useApi();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const repsonse = await api.post("/auth/register", formData);

      console.log(repsonse.data);
    } catch (error) {
      console.error(error.message);
    }

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] text-white px-10 py-2 flex justify-center items-center">
      <form
        className="bg-gray-600 rounded-xl flex flex-col gap-5 w-100 p-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-3">
          <label className="text-xl font-semibold" htmlFor="name">
            Name
          </label>
          <input
            className="px-4 py-3 border border-white rounded-xl focus:outline  -none"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="enter your name"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-xl font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="px-4 py-3 border border-white rounded-xl focus:outline  -none"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="enter your email"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-xl font-semibold" htmlFor="password">
            Password
          </label>
          <input
            className="px-4 py-3 border border-white rounded-xl focus:outline  -none"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="enter your password"
          />
        </div>
        <button className="bg-blue-600 py-2 font-semibold text-lg rounded-xl mt-4">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
