import axios from "axios";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import RoomCard from "../../../components/RoomCard";
import { View, Text, StyleSheet } from "react-native";
import Logo from "../../../components/Logo";
import MapCompo from "../../../components/MapCompo";
// import Fontisto from "@expo/vector-icons/Fontisto";

export default function RoomPage() {
  const { id } = useLocalSearchParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`,
        );
        setData(response.data);
        setLoading(false);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <View style={styles.container}>
      <Logo size="small" />
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <RoomCard item={data} />
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text
              numberOfLines={expanded ? undefined : 3}
              style={{ padding: 10 }}
            >
              {data.description}
            </Text>
            <Text style={{ color: "ligthgrey", marginTop: 5, padding: 10 }}>
              {expanded ? "Show less" : "Show more"}
            </Text>
          </TouchableOpacity>
          <MapCompo location={data} />
          {/* {console.log(data.location)} */}
        </View>
      )}
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
