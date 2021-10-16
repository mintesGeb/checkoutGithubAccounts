import "react-native-gesture-handler";
import React, { useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { MyData } from "../MyContexts/FetchAccountContext";
import Separator from "./Separator";
import Badge from "./Badge";

function Repositories({ navigation: { navigate } }) {
  const { state: stateFromContext } = useContext(MyData);

  const account = stateFromContext.data;
  const [state, setState] = React.useState({
    list: [],
    loading: false,
    error: "",
  });
  useEffect(() => {
    setState({ ...state, list: stateFromContext.repo_list });
  }, []);

  const repoPressed = (url) => {
    setTimeout(() => {
      setState({ ...state, loading: false });
      navigate("Web-View", { url });
    }, 1000);
    setState({ ...state, loading: true });
  };

  return (
    <View style={styles.container}>
      <Badge
        userInfo={{
          avatar_url: account.avatar_url,
          name: account.name,
          login: account.login,
        }}
      />
      {state.loading ? <ActivityIndicator size="large" /> : null}
      <ScrollView>
        {state.list.map((item) => {
          return (
            <View style={styles.rowContainer} key={item.id}>
              <TouchableOpacity onPress={() => repoPressed(item.html_url)}>
                <Text style={styles.name}>{item.name}</Text>
              </TouchableOpacity>
              <Text style={styles.description}>{item.description}</Text>
              <Separator />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: "column",
    flex: 1,
    padding: 10,
  },
  name: {
    color: "#48BBEC",
    fontSize: 18,
    paddingBottom: 5,
  },
  stars: {
    color: "#48BBEC",
    fontSize: 14,
    paddingBottom: 5,
  },
  description: {
    fontSize: 14,
    paddingBottom: 5,
  },
});

export default Repositories;
