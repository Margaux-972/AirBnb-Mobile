import { Pressable, StyleSheet, Text } from "react-native";
import colors from "../assets/colors/index.json";

const MainButton = ({ text, func }) => {
  return (
    <Pressable style={styles.button} onPress={func}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  button: {
    height: 60,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.pink,
    borderWidth: 3,
    borderRadius: 60,
  },
  text: { color: colors.grey, fontWeight: "500", fontSize: 18 },
});
