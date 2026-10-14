import { useState } from "react";
import { useApi } from "../../shared/useApi";
import { useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthProvider";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const api = useApi();
  const AuthContext = useAuthContext();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData(() => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await api.post("/auth/register", formData);

    AuthContext.setAccessToken(response.data.accessToken);
    AuthContext.setUser(response.data.data.user);

    console.log(response.data);

    navigate("/profile");

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen w-full bg-zinc-900 text-white flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-100 flex flex-col gap-5 bg-zinc-600 p-5"
      >
        <div className="flex flex-col gap-3 text-lg">
          <label>Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="px-2 py-3 rounded-xl border border-white w-full"
            type="text"
            placeholder="name"
            required
          />
        </div>
        <div className="flex flex-col gap-3 text-lg">
          <label>Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="px-2 py-3 rounded-xl border border-white w-full"
            type="email"
            placeholder="email"
            required
          />
        </div>
        <div className="flex flex-col gap-3 text-lg">
          <label>Password</label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="px-2 py-3 rounded-xl border border-white w-full"
            type="password"
            placeholder="password"
            required
          />
        </div>
        <button className="w-full py-2 bg-gray-700">Submit</button>
      </form>
    </div>
  );
};

export default Register;
