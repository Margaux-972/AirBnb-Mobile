import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import MainButton from "../../components/MainButton";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import colors from "../../assets/colors/index.json";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Logo from "../../components/Logo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Input from "../../components/Input";
import LargeInput from "../../components/LargeInput";
import Constants from "expo-constants";

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
    fetchData();
  }, []);
  // console.log(userId);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/${userId}`,
        {
          headers: {
            Authorization: "Bearer" + userToken,
          },
        },
      );
      setUserName(data.username);
      setEmail(data.email);
      setDescription(data.description);

      if (data.photo) {
        setPicture(data.photo.url);
      }
      setLoading(false);
    } catch (error) {
      alert({
        message: error.response.data.error,
      });
    }
  };

  const editInformations = async () => {
    if (pictureModified || infoModified) {
      setLoading(true);

      if (pictureModified) {
        try {
          const uri = picture;
          const uriParts = uri.split(".");
          const fileType = uriParts.at(-1);

          const formData = new FormData();
          formData.append("photo", {
            uri,
            name: `userPicture.${fileType}`,
            type: `image/${fileType}`,
          });

          const { data } = await axios.put(
            `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/upload_picture`,
            formData,
            {
              headers: {
                Authorization: "Bearer" + userToken,
                "Content-Type": "multipart/form-data",
              },
            },
          );

          if (data) {
            setPicture(data.photo?.url);

            alert({
              message: "Your profile has been updated",
            });
          }
        } catch (error) {
          alert({
            message: error.response.data.error,
          });
        }
      }

      if (infoModified) {
        try {
          const body = {
            email: email,
            username: userName,
            description: description,
          };

          const { data } = await axios.put(
            `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/update`,
            body,
            {
              headers: {
                Authorization: "Bearer" + userToken,
              },
            },
          );

          if (data) {
            setUserName(data.username);
            setEmail(data.email);
            setDescription(data.description);

            alert({
              message: "Your profile has been updated",
            });
          } else {
            alert({
              message: "An error occurred",
            });
          }
        } catch (error) {
          alert({
            message: error.response.data.error,
          });
        }
      }
      pictureModified && setPictureModified(false);
      infoModified && setInfoModified(false);

      setLoading(false);
    } else {
      alert({
        message: "Change at least one information",
      });
    }
  };

  const uploadPicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!result.canceled) {
        setPicture(result.assets[0].uri);

        if (!pictureModified) {
          setPictureModified(true);
        }
      }
    }
  };

  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();

      if (!result.canceled) {
        setPicture(result.assets[0].uri);
        if (!pictureModified) {
          setPictureModified(true);
        }
      }
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
        <ActivityIndicator
          color={colors.pink}
          size="large"
          style={styles.activityIndicator}
        />
      ) : (
        <View style={styles.mainView}>
          <View style={styles.topView}>
            <TouchableOpacity style={styles.pictureView}>
              {picture ? (
                <Image
                  source={{ uri: picture }}
                  style={styles.picture}
                  resizeMode="cover"
                />
              ) : (
                <FontAwesome5
                  name="user-alt"
                  size={100}
                  color={colors.lightGrey}
                />
              )}
            </TouchableOpacity>
            <View style={styles.icons}>
              <TouchableOpacity
                onPress={() => {
                  uploadPicture();
                }}
              >
                <MaterialIcons
                  name="photo-library"
                  size={30}
                  color={colors.grey}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  takePicture();
                }}
              >
                <FontAwesome5 name="camera" size={30} color={colors.grey} />
              </TouchableOpacity>
            </View>
          </View>
          <Input state={email} setState={setEmail} />
          <Input
            value={userName}
            state={userName}
            setState={setUserName}
            setInfoModified={setInfoModified}
          />
          <LargeInput
            state={description}
            setState={setDescription}
            setInfoModified={setInfoModified}
          />
          <MainButton
            text="Update"
            func={editInformations}
            // style={{ marginBottom: 10 }}
          />
          <MainButton
            text="LOG OUT"
            func={logout}
            // backgroundColor={colors.grey}
          />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  mainView: {
    alignItems: "center",
  },
  topView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
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
    marginTop: 40,
  },
  view: {
    height: 30,
  },
});
