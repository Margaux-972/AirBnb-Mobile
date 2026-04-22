import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  ImageBackground,
} from "react-native";
import Logo from "../../../components/Logo";
import axios from "axios";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import RoomCard from "../../../components/RoomCard";

export default function RoomsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms",
        );
        setData(response.data);
        setLoading(false);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Logo size="small" />
        <ActivityIndicator size="large" color="#FF5A5F" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo size="small" />
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return <RoomCard item={item} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: Constants.statusBarHeight,
  },
  logoContainer: {
    alignItems: "center",
  },
});
