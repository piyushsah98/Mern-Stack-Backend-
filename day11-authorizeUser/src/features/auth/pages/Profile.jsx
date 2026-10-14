import { useEffect } from "react";
import { useApi } from "../../shared/useApi";
import { useAuthContext } from "../context/AuthProvider";

const Profile = () => {
  const AuthContext = useAuthContext();
  const api = useApi();

  const fetchUser = async () => {
    const response = await api.get("/auth/me");

    AuthContext.setUser(response.data.data.user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <h1>User's Information</h1>
      <p>Name: {AuthContext.user?.name}</p>
      <p>Email: {AuthContext.user?.email}</p>
    </div>
  );
};

export default Profile;
