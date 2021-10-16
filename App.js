import "react-native-gesture-handler";

import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect, createContext, useContext } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Search from "./components/Search";
import Dashboard from "./components/Dashboard";
import ProfileDetails from "./components/ProfileDetails";
import Notes from "./components/Notes";
import Repositories from "./components/Repositories";
import WebView from "./components/WebView";
import { MyData, MyDataProvider } from "./MyContexts/FetchAccountContext";
import Test from "./components/Test";

// const MyData = createContext();

const Stack = createStackNavigator();
const Stack2 = createStackNavigator();

// function MyDataProvider(props) {
//   const [state, setState] = useState(null);

//   const fetchAccount = async (account) => {
//     try {
//       const response = await fetch(`https://api.github.com/users/${account}`);

//       if (response.status == "200") {
//         const data = await response.json();

//         console.log(data);
//         setState(data);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     console.log("fetching data");
//     fetchAccount("asaadsaad");
//   }, []);

//   return <MyData.Provider value={{ state, setState }}>{props.children}</MyData.Provider> ;
// }

function StackNavigation2() {
  // const [state, setState] = useState(null);

  return (
    <MyDataProvider>
      <Stack2.Navigator>
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack2.Screen name="Test" component={Test} />
        <Stack.Screen name="Profile-Details" component={ProfileDetails} />
        <Stack.Screen name="Notes" component={Notes} />
        <Stack.Screen name="Repositories" component={Repositories} />

        <Stack.Screen name="Web-View" component={WebView} />
      </Stack2.Navigator>
    </MyDataProvider>
  );
}

function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={({
          route: {
            params: { data },
          },
        }) => {
          return {
            headerTitle: data.name,
          };
        }}
      />
      <Stack.Screen name="Profile-Details" component={ProfileDetails} />
      <Stack.Screen name="Notes" component={Notes} />
      <Stack.Screen name="Repositories" component={Repositories} />

      <Stack.Screen name="Web-View" component={WebView} />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      {/* <StackNavigation /> */}
      <StackNavigation2 />
    </NavigationContainer>
  );
}
