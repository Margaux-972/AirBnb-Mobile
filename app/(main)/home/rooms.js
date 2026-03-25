import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import Logo from "../../../components/Logo";
import axios from "axios";
import { useEffect, useState } from "react";

export default function HomePage() {
  // const size = "smallLogo";
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
  // console.log(data);
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF5A5F" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>HOME !</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemContainer}>
              <Text>{item.title}</Text>
              <Text>{item.price}</Text>
              <Text>{item.reviews} reviews</Text>
              <Image
                source={{ uri: item.photos[0].url }}
                style={{ height: 80, width: "100%" }}
              />
            </View>
          );
        }}
      />
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
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
});
