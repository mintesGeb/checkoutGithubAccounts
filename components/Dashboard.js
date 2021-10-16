import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { MyData } from "../MyContexts/FetchAccountContext";

const Dashboard = ({ navigation: { navigate } }) => {
  const { state, dispatch } = useContext(MyData);
  const [account, setAccount] = useState("");

  // setAccount(state);

  useEffect(() => {
    setAccount(state.data);
  }, []);

  const profileDetails = () => {
    navigate("Profile-Details");
  };
  const repositories = () => {
    navigate("Repositories");
  };
  const notes = () => {
    navigate("Notes");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profilePicBox}>
        <Image
          style={styles.image}
          source={{
            uri: account.avatar_url,
          }}
        />
      </View>
      <View style={[styles.box, styles.blue]}>
        <TouchableOpacity onPress={profileDetails}>
          <Text style={styles.buttonText}>Profile Details</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.box, styles.pink]}>
        <TouchableOpacity onPress={repositories}>
          <Text style={styles.buttonText}>Repositories</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.box, styles.purple]}>
        <TouchableOpacity onPress={notes}>
          <Text style={styles.buttonText}>Notes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    padding: 0,
  },
  profilePicBox: {
    flex: 2,
  },
  image: {
    height: 350,
  },
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 26,
  },
  blue: {
    backgroundColor: "powderblue",
  },
  purple: {
    backgroundColor: "violet",
  },
  pink: {
    backgroundColor: "pink",
  },
});
export default Dashboard;
