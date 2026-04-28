import axios from "axios";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import Title from "../../components/Title";
import MainButton from "../../components/MainButton";
import LargeInput from "../../components/LargeInput";
import { useRouter } from "expo-router";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import RedirectButton from "../../components/RedirectButton";
import { KeyboardAvoidingView, Platform, StyleSheet, Text } from "react-native";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState("");

  const router = useRouter();
  const { login } = useContext(AuthContext);

  const createAccount = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
        {
          email: email,
          username: username,
          description: description,
          password: password,
        },
      );
      // console.log("response =>", response.data);
      login(response.data.id, response.data.token);
      setLoading(false);
    } catch (error) {
      //   console.log("error=>", error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Logo />
      <Title text={"Sign Up"} />
      <Input state={email} setState={setEmail} placeholder={"email"} />
      <Input state={username} setState={setUsername} placeholder={"username"} />
      <LargeInput
        state={description}
        setState={setDescription}
        placeholder={"Describe yourself in a few words..."}
      />
      <Input
        state={password}
        setState={setPassword}
        placeholder={"password"}
        secure={true}
      />
      <Input
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder={"confirm password"}
        secure={true}
      />
      {errorMessage && <Text>{errorMessage}</Text>}
      <MainButton text={"Sign Up"} func={createAccount} />
      <RedirectButton
        text={"Already have an account ? Sign in"}
        func={() => {
          router.back();
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default SignupPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 45,
  },
});
