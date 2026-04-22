import axios from "axios";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import RoomCard from "../../../components/RoomCard";
import { View, Text, StyleSheet } from "react-native";
import Logo from "../../../components/Logo";
import MapCompo from "../../../components/MapCompo";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "../../../assets/colors/index.json";
import Constants from "expo-constants";

export default function RoomPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

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
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <View style={styles.logoContainer}>
            <Logo size="small" />
          </View>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <RoomCard item={data} isSlider={true} />
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text
              numberOfLines={expanded ? undefined : 3}
              style={{ padding: 10 }}
            >
              {data.description}
            </Text>
            <View style={styles.overview}>
              <Text
                style={{
                  color: colors.grey,
                  marginTop: 5,
                  paddingBottom: 10,
                  marginRight: 5,
                }}
              >
                {expanded ? "Show less" : "Show more"}
              </Text>
              <AntDesign
                name={expanded ? "caret-up" : "caret-down"}
                size={16}
                color="#717171"
              />
            </View>
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
    marginTop: Constants.statusBarHeight,
  },
  logoContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  overview: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 5,
  },
  backButton: {
    position: "absolute",
    left: 10,
    bottom: 5,
    color: colors.grey,
  },
});
