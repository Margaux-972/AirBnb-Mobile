import { StyleSheet, TextInput } from "react-native";
import colors from "../assets/colors/index.json";

const Input = ({ placeholder, state, setState, secure }) => {
  return (
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      value={state}
      onChangeText={setState}
      autoCapitalize="none"
      secureTextEntry={secure}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: "80%",
    borderBottomColor: colors.lightPink,
    borderBottomWidth: 2,
    fontSize: 16,
  },
});
