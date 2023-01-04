import React from 'react';
import {Alert,TouchableOpacity,ScrollView, SafeAreaView,Text, StyleSheet,Button} from 'react-native';
import { createAppContainer,createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator,DrawerItems } from "react-navigation-drawer";


import CalcListScreen from "../screens/CalcListScreen";
import CalcDetailScreen from "../screens/CalcDetailScreen";
import NewCalcScreen from "../screens/NewCalcScreen";

import ArchiveListScreen from "../screens/ArchiveListScreen";


import Colors from "../constants/Colors";
import ChoesUsersScreen from "../screens/ChoesUsersScreen";
import NewUserScreen from "../screens/NewUserScreen";

import Login from "../screens/login";
// import Update_App from "../update_app";


const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  headerTitleStyle: {
    // width: "75%",
      overflow: "hidden",
    },
};
const CalcNormal = createStackNavigator(
  {
    Calcs: CalcListScreen,
    CalcDetail: CalcDetailScreen,
    NewCalc: NewCalcScreen,
  },
  {
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const CalcArchive = createStackNavigator(
  {
    ArchiveList: ArchiveListScreen,
  },
  {
    defaultNavigationOptions: defaultNavigationOptions,
  }
);


const ChoseUsers = createStackNavigator(
  {
    ChoesUsersList: ChoesUsersScreen,
    NewUser: NewUserScreen,
  },
  {
    defaultNavigationOptions: defaultNavigationOptions,
  }
);


const DrawerWithLogoutButton = (props) => (
  <ScrollView contentContainerStyle={{flex: 1,  flexDirection: 'column', justifyContent: 'space-between' }}>
    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
    <Button
      style={styles.logoutButton}
      title="به روز رسانی"
      onPress={Update_App}/>
    {/* <TouchableOpacity onPress={() => Alert.alert('title', 'messsage', [{ text: 'cancel',style:'cancel',onPress: ()=> props.navigation.navigate('CalcNormal') } ])}>
      <Text>update</Text>
    </TouchableOpacity> */}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  logoutButton: {
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0
  }
});

const CalcNavigator = createDrawerNavigator(
  {
    // ChoseUsers:{
    //   screen:ChoseUsers,
    //   navigationOptions:{
    //     title:'انتخاب کنید',
    //   }
    // },

    CalcNormal: {
      screen: CalcNormal,
      navigationOptions: {
        title: "لیست خرید",
      },
    },
    CalcArchive: {
      screen: CalcArchive,
      navigationOptions: {
        title: "بایگانی",
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    defaultNavigationOptions: {
      // title:'isworngi'
    },
    // contentComponent: DrawerWithLogoutButton,
  }
);



const MainNavigator = createSwitchNavigator({
  // Login: Login,
  ChoseUsers: ChoseUsers,
  CalcNavigator: CalcNavigator
});

export default createAppContainer(MainNavigator);
