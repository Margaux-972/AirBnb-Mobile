import axios from "axios";
import MapView, { Marker } from "react-native-maps";

export default function MapCompo({ location }) {
  // console.log("loc", { location });

  const markers = [
    {
      id: location._id,
      latitude: location.location[1],
      longitude: location.location[0],
      title: location.title,
      description: location.description,
    },
  ];
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 48.856614,
        longitude: 2.3522219,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      // showsUserLocation={true}
    >
      {markers.map((marker) => {
        return (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
          />
        );
      })}
    </MapView>
  );
}
