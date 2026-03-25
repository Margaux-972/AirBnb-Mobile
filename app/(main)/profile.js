import { View, Text, StyleSheet } from "react-native";
import MainButton from "../../components/MainButton";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function HomePage() {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <MainButton text="LOG OUT" func={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
