import { Pressable, StyleSheet, Text } from "react-native";
import colors from "../assets/colors/index.json";

const RedirectButton = ({ text, func }) => {
  return (
    <Pressable onPress={func}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default RedirectButton;

const styles = StyleSheet.create({
  text: {
    color: colors.grey,
  },
});
