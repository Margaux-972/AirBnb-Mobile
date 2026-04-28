import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";

import axios from "axios";
import Constants from "expo-constants";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import * as ImagePicker from "expo-image-picker";
import colors from "../../assets/colors/index.json";
import LargeInput from "../../components/LargeInput";
import MainButton from "../../components/MainButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [picture, setPicture] = useState(null);
  const [description, setDescription] = useState("");
  const [infoModified, setInfoModified] = useState(false);
  const [pictureModified, setPictureModified] = useState(false);

  const { logout, userId, userToken } = useContext(AuthContext);

  useEffect(() => {
    if (userId && userToken) {
      fetchData();
    }
  }, [userId, userToken]);
  const fetchData = async () => {
    if (!userId || !userToken) return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      setUserName(data.username);
      setEmail(data.email);
      setDescription(data.description || "");

      if (data.photo?.url) {
        setPicture(data.photo.url);
      }
    } catch (error) {
      alert("Erreur", error.response?.data?.error || "Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  const editInformations = async () => {
    if (!pictureModified && !infoModified) {
      alert("Change au moins une information");
      return;
    }

    setLoading(true);

    try {
      // UPDATE PICTURE
      if (pictureModified && picture) {
        const fileType = picture.split(".").pop().split("?")[0];

        const formData = new FormData();
        formData.append("photo", {
          uri: picture,
          name: `profile.${fileType}`,
          type: `image/${fileType}`,
        });

        const { data } = await axios.put(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/upload_picture",
          formData,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );

        if (data?.photo?.url) {
          setPicture(data.photo.url);
          await fetchData();
        }
      }

      // UPDATE INFOS
      if (infoModified) {
        const body = {
          email,
          username: userName,
          description,
        };

        const { data } = await axios.put(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/update",
          body,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          },
        );

        setEmail(data.email);
        setUserName(data.username);
        setDescription(data.description || "");
      }

      setPictureModified(false);
      setInfoModified(false);

      alert("Succès", "Profil mis à jour");
    } catch (error) {
      alert("Erreur", error.response?.data?.error || "Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  const uploadPicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") return;

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setPicture(result.assets[0].uri);
      setPictureModified(true);
    }
  };

  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setPicture(result.assets[0].uri);
      setPictureModified(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.logoContainer}>
        <Logo size="small" />
      </View>

      {loading ? (
        <ActivityIndicator color={colors.pink} size="large" />
      ) : (
        <View style={styles.mainView}>
          <View style={styles.topView}>
            <TouchableOpacity style={styles.pictureView}>
              {picture ? (
                <Image source={{ uri: picture }} style={styles.picture} />
              ) : (
                <FontAwesome5
                  name="user-alt"
                  size={100}
                  color={colors.lightGrey}
                />
              )}
            </TouchableOpacity>

            <View style={styles.icons}>
              <TouchableOpacity onPress={uploadPicture}>
                <MaterialIcons
                  name="photo-library"
                  size={30}
                  color={colors.grey}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton} onPress={takePicture}>
                <FontAwesome5 name="camera" size={30} color={colors.grey} />
              </TouchableOpacity>
            </View>
          </View>

          <Input
            state={email}
            setState={setEmail}
            setInfoModified={setInfoModified}
          />
          <Input
            state={userName}
            setState={setUserName}
            setInfoModified={setInfoModified}
          />
          <LargeInput
            state={description}
            setState={setDescription}
            setInfoModified={setInfoModified}
          />
          <View style={styles.buttonsContainer}>
            <MainButton text="Update" func={editInformations} />
            <MainButton text="LOG OUT" func={logout} />
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.bgColor,
    marginTop: Constants.statusBarHeight,
  },
  mainView: {
    alignItems: "center",
  },
  topView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  pictureView: {
    marginVertical: 20,
    width: 170,
    height: 170,
    borderRadius: 170,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.lightPink,
    borderWidth: 2,
  },
  picture: {
    height: 150,
    width: 150,
    borderRadius: 150,
  },
  logoContainer: {
    alignItems: "center",
  },
  icons: {
    marginLeft: 20,
  },
  iconButton: {
    marginTop: 25,
  },
  buttonsContainer: {
    width: "100%",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
