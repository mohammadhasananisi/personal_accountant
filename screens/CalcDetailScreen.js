import React from "react";
import { ScrollView, Image, View, Text, StyleSheet,Button } from "react-native";
import { useSelector } from "react-redux";
import * as FileSystem from 'expo-file-system';

import Colors from "../constants/Colors";

const CalcDetailScreen = (props) => {
  console.log('is working from detail scrren');
  // const CalcId = props.navigation.getParam("CalcId");
  // const selectedCalc = useSelector((state) =>
  //   state.Calcs.Calcs.find((Calc) => Calc.id === CalcId)
  // );

  // const selectedLocation = { lat: selectedCalc.lat, lng: selectedCalc.lng };
  // const showMapHandler = () => {
  //   props.navigation.navigate("Map", {
  //     readonly: true,
  //     initialLocation: { selectedLocation },
  //   });
  // };
  // const removefile = () =>{
  //   FileSystem.deleteAsync(selectedCalc.imageUri,{idempotent:true});
  // console.log('is ');
  
  // };
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image source={{ uri: selectedCalc.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <Button title="remove file" onPress={() => {}} />
        <View style={styles.addressContainer}>
          <Text style={styles.address}>text from address</Text>
        </View>
      </View>
    </ScrollView>
  );
};

CalcDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("CalcTitle"),
  };
};

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default CalcDetailScreen;
