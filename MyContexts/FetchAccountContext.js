import { registerRootComponent } from "expo";
import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  useReducer,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MyData = createContext();

const getAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (err) {
    console.log(err);
  }
  console.log(keys);
};

const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (err) {
    console.log(err);
  }
  console.log("Clearing done");
};

const removeValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.log(err);
  }
  console.log("removed");
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET-ACCOUNT":
      return { ...state, username: payload };

    default:
      return state;
  }
};

export function MyDataProvider(props) {
  const [accountName, dispatch] = useReducer(reducer, {
    username: "asaadsaad",
  });
  const [state, setState] = useState({ data: null, repo_list: null });

  const getData = async (key) => {
    try {
      let value = await AsyncStorage.getItem(key);
      console.log("getting stored data", key);
      if (value !== null) {
        let parsed = JSON.parse(value);
        const retrieveTime = Date.now();
        let dayDiff =
          new Date(retrieveTime).getDate() -
          new Date(parsed.date).getDate() +
          1;

        console.log(key, dayDiff);

        if (dayDiff <= 30) {
          setState(parsed.data);
          return true;
        } else {
          removeValue(key);
        }
      }
      return false;
    } catch (err) {
      console.log(err);
    }
  };

  const storeData = async (key, value) => {
    try {
      console.log("storing data");
      let jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (err) {
      console.log(err);
    }
  };

  const setName = (payload) => {
    if (!payload) {
      console.log("no payload");
      return dispatch({ type: "SET-ACCOUNT", payload: "mintesgeb" });
    }
    console.log(payload);
    getData(payload).then((res) => {
      if (!res) {
        dispatch({ type: "SET-ACCOUNT", payload });
      }
    });
  };

  const fetchAccount = async (account) => {
    try {
      console.log("fetching data");
      const response = await fetch(`https://api.github.com/users/${account}`);

      if (response.status == "200") {
        const data = await response.json();

        let res = await fetch(data.repos_url);
        let repo_data = await res.json();

        setState({ data, repo_list: repo_data });
        storeData(account, {
          data: { data, repo_list: repo_data },
          date: Date.now(),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData(accountName.username).then((res) => {
      console.log(res);
      if (!res) {
        fetchAccount(accountName.username);
      }
    });

    getAllKeys();
    // clearAll();
  }, [accountName]);

  return (
    <MyData.Provider value={{ state, setName }}>
      {props.children}
    </MyData.Provider>
  );
}
