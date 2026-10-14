import { AuthProvider } from "../features/auth/context/AuthProvider";
import AppRoutes from "./app.routes";

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
