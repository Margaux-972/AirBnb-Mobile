import { AuthContextProvider } from "../context/AuthContext";
import RootNavigator from "../navigation/RootNavigator";

const Layout = () => {
  return (
    <AuthContextProvider>
      {/*
      Si le state du contect isConnected est true alors on amene sur pageA sinon sur index
       */}
      <RootNavigator />
    </AuthContextProvider>
  );
};

export default Layout;
