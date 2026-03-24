import { View, Text, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur Expo Router !</Text>
      <Link href="/signin">go to Sign in page</Link>
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
