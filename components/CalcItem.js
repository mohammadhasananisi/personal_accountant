import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
// import {useDispatch } from "react-redux";
import * as wordifyfa from "../helpers/wordifyfa";

import Colors from "../constants/Colors";
import get_date from "../helpers/date";

const CalcItem = (props) => {
const [isLongPress, setIsLongPress] = useState(false);

  useEffect(() =>{
    props.selectedThisItem({
      id: props.time,
      value:isLongPress
    });
  },[isLongPress]);
  // console.log(props.pay);
  
  return (
    <TouchableOpacity
    onLongPress={() =>{
      // console.log('on long press');
      setIsLongPress(!isLongPress);
      
    }}
    // bind(this,props.time,props.title)
      onPress={()=> props.TouchableOpacity_clicked(props.time,props.title)}
      style={isLongPress? styles.CalcItem_Active: styles.CalcItem}
    >

      <View style={styles.infoContainer}>
        <TouchableOpacity style={styles.titleContainer} onPress={() => props.pay === 1?props.navigation.navigate('NewCalc',{id: props.time,pay_add:true}) :props.navigation.navigate('NewCalc',{id: props.time})}>
        <View>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        </TouchableOpacity>
        <View style={styles.mablaghContainer}>
          <Text style={
            {
              fontFamily: "b-nazanin",
              fontSize: 25,
              marginBottom: 3,
              color: props.pay === 0? 'green': 'rgb(255,0,0)' ,
            }
            // styles.mablagh
            }>{props.mablagh}</Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.mablaghTextContainer}>
          <Text style={{
          color: props.pay === 0? 'green': 'rgb(255,0,0)' ,
          width:"100%",
          fontSize: 25,
          fontFamily: "b-nazanin-bold",
          }
          // }, styles.mablaghText
        }>
            {wordifyfa.wordifyRialsInTomans(props.mablagh)}
          </Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{get_date(props.time)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  CalcItem: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    // flexDirection: 'row',
    // alignItems: 'center'
  },

  CalcItem_Active: {
    backgroundColor:'#d9d9d9',
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    // flexDirection: 'row',
    // alignItems: 'center'
  },

  infoContainer: {
    flex: 1,
    // marginRight: 25,
    // backgroundColor:"red",
    width: 250,
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: 'flex-start',
    // direction: "ltr"
  },
  titleContainer: {
    // flex:1,
    width: "50%",
    // backgroundColor: "red",
    alignItems:"flex-start",
    marginHorizontal: 20,
    marginTop: 10,
  },
  title: {
    color: "black",
    fontSize: 25,
    marginBottom: 3,
    fontFamily: "b-nazanin-bold",
  },
  mablaghContainer: {
    width: "50%",
    // backgroundColor: "blue",
    alignItems:"flex-end",
    marginTop: 10,
    marginHorizontal: 20,
  },
  mablagh: {
    color: "#666",
    fontFamily: "b-nazanin",
    fontSize: 25,
    marginBottom: 3,
  },
  bottomContainer: {
    flex: 1,
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mablaghTextContainer: {
    alignItems: "flex-start",
    width: "50%",
    // backgroundColor:'red'
  },
  mablaghText: {
    width:"100%",
    fontSize: 25,
    fontFamily: "b-nazanin-bold",
    color: 'rgb(255,0,0)',
  },
  dateContainer: {
    flex:1,
    // left:0,
    textAlign: 'left',
    // backgroundColor:"red",
    // alignItems: "flex-start",
    width: "50%",
    // right:10,
  },
  date: {
    width: '100%',
    fontSize: 25,
    fontFamily: "b-nazanin",
    color: 'rgb(0,0,255)',
  },
});

export default CalcItem;
