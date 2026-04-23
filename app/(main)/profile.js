import { View, Text, StyleSheet } from "react-native";
import MainButton from "../../components/MainButton";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import colors from "../../assets/colors/index.json";

export default function ProfilePage() {
  const [loading, setLoading] = useState;
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [picture, setPicture] = useState(null);
  const [description, setDescription] = useState("");
  const [infoModified, setInfoModified] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(null);
  const [pictureModified, setPictureModified] = useState(false);

  const { logout, userToken, userId } = useContext(AuthContext);

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
