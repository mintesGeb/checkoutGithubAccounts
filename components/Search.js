import { useRoute } from "@react-navigation/core";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { MyData } from "../MyContexts/FetchAccountContext";

const Search = ({ navigation: { navigate } }) => {
  const { state: x, setName } = useContext(MyData);
  

  const inputRef = useRef();

  const [state, setState] = useState({
    username: "",
    loading: false,
    error: "",
  });

  const onChangeText = (text) => {
    setState({ ...state, username: text.toLowerCase() });
  };
  useEffect(() => {
    inputRef.current.focus();
  });

  const searchPressed = () => {
    
    setName(state.username);
    setTimeout(() => {
      navigate("Dashboard");
    }, 500);
  };
  // const searchPressed = () => {
  //   const fetchAccount = async (account) => {
  //     try {
  //       const response = await fetch(`https://api.github.com/users/${account}`);

  //       if (response.status == "200") {
  //         const data = await response.json();

  //         navigation.navigate("Dashboard", { data });
  //       }
  //     } catch (err) {
  //       setState({ ...state, error: err });
  //     }
  //   };
  //   setTimeout(() => {
  //     setState({ ...state, loading: false });
  //     fetchAccount(state.username);
  //   }, 1000);
  //   setState({ ...state, loading: true });
  // };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for a GitHub user</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="GitHub username"
        value={state.username}
        onChangeText={onChangeText}
        ref={inputRef}
        // autoFocus={true}
      />
      <TouchableOpacity style={styles.button} onPress={searchPressed}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      {state.loading ? <ActivityIndicator size="large" /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#48BBEC",
    justifyContent: "center",
    padding: 30,
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: "center",
    color: "white",
  },
  searchInput: {
    height: 50,
    padding: 5,
    marginRight: 5,
    fontSize: 22,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "white",
    color: "white",
  },
  buttonText: {
    fontSize: 20,
    color: "#111",
    alignSelf: "center",
  },
  button: {
    height: 50,
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "white",
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  error: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
});
export default Search;
