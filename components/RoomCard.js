import bg from "../assets/pictures/blackbg.jpg";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { Link } from "expo-router";

const RoomCard = ({ item }) => {
  return (
    <Link href={`/home/room?id=${item._id}`}>
      <View style={styles.itemContainer}>
        <View style={styles.relative}>
          <Image
            source={{ uri: item.photos[0].url }}
            style={styles.roomImage}
          />
          <ImageBackground source={bg} style={styles.priceContainer}>
            <Text style={styles.itemPrice}>{item.price} €</Text>
          </ImageBackground>
        </View>

        <View style={styles.legend}>
          <View style={styles.infoSection}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.reviews}>{item.reviews} reviews</Text>
          </View>
          <Image
            source={{ uri: item.user.account.photo.url }}
            style={styles.userAvatar}
          />
        </View>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  relative: {
    position: "relative",
  },
  roomImage: {
    height: 100,
    width: "100%",
  },
  priceContainer: {
    width: 70,
    padding: 15,
    alignItems: "center",
    position: "absolute",
    bottom: 1,
  },
  itemPrice: {
    color: "white",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  infoSection: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
  },
  reviews: {
    marginTop: 10,
    color: "#C2C2C2",
  },
  userAvatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

export default RoomCard;
