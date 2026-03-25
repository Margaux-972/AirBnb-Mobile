import { KeyboardAvoidingView, Platform, StyleSheet, Text } from "react-native";
import Logo from "../../components/Logo";
import Title from "../../components/Title";
import Input from "../../components/Input";
import MainButton from "../../components/MainButton";
import RedirectButton from "../../components/RedirectButton";
import { useState, useContext } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const router = useRouter();
  const { login } = useContext(AuthContext);

  const connect = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          email: email,
          password: password,
        },
      );
      login(response.data.id, response.data.token);
      // console.log("response", response.data);
    } catch (error) {
      // console.log("Erreur", error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Logo />
      <Title text={"Sign in"} />
      <Input placeholder="email" state={email} setState={setEmail} />
      <Input
        placeholder="password"
        state={password}
        setState={setPassword}
        secure={true}
      />

      {/* {errorMessage && <Text>{errorMessage}</Text>} */}
      <MainButton text="Sign In" func={connect} />
      <RedirectButton
        text={"No account ? Register"}
        func={() => {
          router.navigate("/signup");
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 30,
  },
});
