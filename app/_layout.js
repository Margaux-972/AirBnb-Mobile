import { AuthContextProvider } from "../context/AuthContext";
import RootNavigator from "../navigation/RootNavigator";

const Layout = () => {
  return (
    <AuthContextProvider>
      <RootNavigator />
    </AuthContextProvider>
  );
};

export default Layout;
