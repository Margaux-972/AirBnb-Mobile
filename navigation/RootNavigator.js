import { Stack } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const RootNavigator = () => {
  const { setUserID, setUserToken, userID, userToken } =
    useContext(AuthContext);

  //   console.log("userID", userID); // userID 646b7ecd29c89a2fa16e935c
  //   console.log("userToken", userToken); // userToken ZcO9iX-lrY_mHfq0aONLQDDz2TQM5TC-ujWY_mlR8UROosx6ikSgtyZayfr8cLbh

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!setUserID && !setUserToken}>
        <Stack.Screen name="index" />
      </Stack.Protected>

      <Stack.Protected guard={setUserID & setUserToken}>
        <Stack.Screen name="(main)" />
      </Stack.Protected>
    </Stack>
  );
};

export default RootNavigator;
