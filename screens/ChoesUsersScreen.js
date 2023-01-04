import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
  Button,
  Image,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "react-navigation-hooks";
import {use_from} from '../helpers/db';

// import { fetchCalc_Users } from "../helpers/db";

import HeaderButton from "../components/HeaderButton";

import Colors from "../constants/Colors";
import * as CalcsActions from "../store/Calc-actions";



const ChoesUsersScreen_item = (props) => {
  
  return (
    <TouchableOpacity onPress={() => {
        props.onSelect(props.id,props.title);
    }} style={styles.calcItem}
    onLongPress={()=> {
        props.edit_page(props.id);
    }}
    >
        {/* <Text>{props.id}</Text> */}
      <Image style={styles.image} source={{ uri: props.image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ChoesUsersScreen = (props) => {

  // const a =  use_from();
  // console.log(a);

  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
    //   console.log("user come in Users screen");
      dispatch(CalcsActions.LoadDb_Users());
    }, [dispatch])
  );
  const Users = useSelector((state) => state.Calcs.users);
const {navigation} = props;

  const SelectedUsers = useCallback((id,title) =>{
    dispatch(CalcsActions.SelectedUsers(+id,title));
    navigation.navigate('CalcNavigator');
  }, [dispatch]);

  const edit_page = (id) =>{
    props.navigation.navigate('NewUser', {
        id:id
    });
  };

  return (
    <FlatList
      data={Users}
      key={(item) => item.id.toString()}
      keyExtractor={(item) => item.id.toString()}
      renderItem={(itemData) => (
        <ChoesUsersScreen_item
          onSelect={SelectedUsers}
          id={itemData.item.id}
          image={itemData.item.image}
          title={itemData.item.title}
          edit_page={edit_page}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  calcItem: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ccc",
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  infoContainer: {
    marginRight: 25,
    width: 250,
    justifyContent: "center",
    alignItems: "flex-end",
    // backgroundColor:"red"
  },
  title: {
    color: "black",
    fontSize: 18,
    marginBottom: 5,
  },
  address: {
    color: "#666",
    fontSize: 16,
  },
});

ChoesUsersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "انتخاب کنید",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="اضافه کردن"
            iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
            onPress={() => {
              navData.navigation.navigate("NewUser");
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

export default ChoesUsersScreen;
