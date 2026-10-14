import AppRoutes from "./app.routes";
import { AuthProvider } from "../features/auth/context/AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
