import bg from "../assets/pictures/blackbg.jpg";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
  Dimensions,
} from "react-native";
import { Link } from "expo-router";
import { Entypo } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const displayStars = (number) => {
  let tab = [];
  for (let i = 1; i <= 5; i++) {
    if (number < i) {
      tab.push(
        <Entypo
          name="star"
          size={20}
          color="#BBBBBB"
          style={{ marginRight: 4 }}
          key={i}
        />,
      );
    } else {
      tab.push(
        <Entypo
          name="star"
          size={20}
          color="#FFB100"
          style={{ marginRight: 4 }}
          key={i}
        />,
      );
    }
  }
  return tab;
};

const RoomCard = ({ item, isSlider }) => {
  return (
    <Link href={`/home/room?id=${item._id}`}>
      <View style={styles.itemContainer}>
        <View style={styles.relative}>
          {isSlider ? (
            <FlatList
              data={item.photos}
              horizontal
              pagingEnabled
              style={{ width: width, marginLeft: -20 }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item.url }}
                  style={styles.roomImageSlider}
                />
              )}
            />
          ) : (
            <Image
              source={{ uri: item.photos[0].url }}
              style={styles.roomImage}
            />
          )}

          <ImageBackground source={bg} style={styles.priceContainer}>
            <Text style={styles.itemPrice}>{item.price} €</Text>
          </ImageBackground>
        </View>

        <View style={styles.legend}>
          <View style={styles.infoSection}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={styles.reviewsContainer}>
              {displayStars(item.ratingValue)}
              <Text style={styles.reviewsText}>{item.reviews} reviews</Text>
            </View>
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
  reviewsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  reviewsText: {
    color: "#C2C2C2",
    marginLeft: 2,
  },
  userAvatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  roomImageSlider: {
    width: width,
    height: 200,
  },
});

export default RoomCard;
