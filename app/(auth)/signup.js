import axios from "axios";
import { useState } from "react";
import { useRouter } from "expo-router";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import Title from "../../components/Title";
import MainButton from "../../components/MainButton";
import { LargeInput } from "../../components/LargeInput";
import RedirectButton from "../../components/RedirectButton";
import { KeyboardAvoidingView, Platform, StyleSheet, Text } from "react-native";
import { AuthContext } from "../../context/AuthContext";

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

// import { Link } from "expo-router";
// import { View, Text, StyleSheet } from "react-native";
// import axios from "axios";
// import { useState } from "react";
// import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";
// import Inputs from "../../components/inputs";
// import LogoTitle from "../../components/logoTitle";
// import BottomForm from "../../components/bottomForm";

// export default function Signup() {
//   const [email, setEmail] = useState("");
//   const [signup, setSignup] = useState("Sign up");
//   const [password, setPassword] = useState("");
//   //   const [visible, setVisible] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState("");
//   const [username, setUsername] = useState("");
//   const [description, setDescription] = useState("");
//   const fetchData = async () => {
//     try {
//       const response = await axios.post(
//         "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
//         {
//           email: email,
//           username: username,
//           description: description,
//           password: password,
//         },
//       );
//       //   console.log("response =>", response.data);
//       setLoading(false);
//     } catch (error) {
//       //   console.log("error=>", error.message);
//       setErrorMessage(error.message);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <ScrollView contentContainerStyle={styles.content}>
//         <LogoTitle signup={signup} />
//         <Inputs />
//         <Link href="/signin">Already have an account ? Sign in</Link>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   content: {
//     flex: 1,
//     justifyContent: "space-around",
//     alignItems: "center",
//     gap: 20,
//     paddingBottom: 30,
//   },
// });
