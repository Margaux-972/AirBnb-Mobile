import { View, Image, StyleSheet } from "react-native";

const Logo = ({ size }) => {
  return (
    <View>
      <Image
        source={require("../assets/pictures/logo.png")}
        style={styles.mainLogo}
        resizeMode="contain"
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  mainLogo: {
    height: 100,
    width: 100,
  },
  smallLogo: {
    height: 40,
    width: 40,
  },
});
