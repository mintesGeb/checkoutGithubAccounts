import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { MyData } from "../MyContexts/FetchAccountContext";

function Test() {
  // const [state, setState] = useContext(MyData);
  // console.log(state);
  return (
    // <View style={{ flex: 1 }}>
    //   <Text style={{ size: 50 }}>{state.id}</Text>
    // </View>
    <MyData.Consumer>
      {({ state, setState }) => {
        console.log(state);
        return (
          <View style={{ flex: 1 }}>
            {state ? <Text style={{ size: 50 }}>{state.login}</Text> : null}
          </View>
        );
      }}
    </MyData.Consumer>
  );
}
export default Test;
