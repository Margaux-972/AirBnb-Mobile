import { lazy, useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Logo from "../../components/Logo";
import Constants from "expo-constants";
import colors from "../../assets/colors/index.json";
import * as Location from "expo-location";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";
import { router } from "expo-router";

export default function AroundMePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getLocationAndData = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        let response;

        if (status === "granted") {
          // get rooms around
          const { coords } = await Location.getCurrentPositionAsync();

          const lat = coords.latitude;
          const lng = coords.longitude;

          response = await axios.get(
            `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${lat}&longitude=${lng}`,
          );
        } else {
          // get all rooms
          response = await axios.get(
            `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms`,
          );
        }
        const coordsTab = [];
        for (let i = 0; i < response.data.length; i++) {
          coordsTab.push({
            latitude: response.data[i].location[1],
            longitude: response.data[i].location[0],
            id: response.data[i]._id,
          });
        }
        setData(coordsTab);
        setLoading(false);
      } catch (error) {
        alert("To use this service you need to authorize location");
        setLoading(false);
      }
    };
    getLocationAndData();
  }, []);
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo size="small" />
        </View>
        <ActivityIndicator size="large" color="#FF5A5F" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo size="small" />
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        showsUserLocation={true}
      >
        {data.map((item, index) => {
          return (
            <Marker
              onPress={() => {
                router.push({
                  pathname: "/home/room",
                  params: {
                    id: item.id,
                  },
                });
              }}
              key={index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  logoContainer: {
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
