import { useState } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Image
        source={require("../../assets/images/logo.png")}
        style={{ height: 100, width: 100 }}
      />
      <Text style={styles.title}>Sign in</Text>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Pressable style={styles.authbutton}>
        <Text>Sign in</Text>
      </Pressable>
      <Link href="/signup">No account ? Register</Link>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
  },
  authbutton: {
    borderColor: "#F9585D",
    borderWidth: 2,
    borderRadius: 30,
    padding: 15,
  },
});
