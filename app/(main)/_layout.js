import { Tabs } from "expo-router";

const Layout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" />
    </Tabs>
  );
};

export default Layout;
