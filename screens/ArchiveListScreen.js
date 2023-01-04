import React, { useEffect, useCallback,useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  ScrollView,
  Alert,
  TouchableOpacity
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import * as wordifyfa from "../helpers/wordifyfa";
import {useFocusEffect} from 'react-navigation-hooks';
import { Ionicons } from '@expo/vector-icons';
// import { useFocusEffect } from 'react-navigation';
// import {useFocusEffect} from '@react-navigation/native';
// @react-navigation/native

// import { LoadDb_func } from "../store/Calc-actions";
import { full_delete_db,send_to_ListItem_db } from "../helpers/db";
import CalcItem from "../components/CalcItem";
import Colors from "../constants/Colors";
import * as CalcsActions from "../store/Calc-actions";


const ArchiveListScreen = (props) => {
  const dispatch = useDispatch();

  const userid = useSelector(state=> state.Calcs.chosed_User_id);
  const usertitle = useSelector(state=> state.Calcs.chosed_User_title);

  // useFocusEffect(
  //   useCallback(() => {
  //     // console.log('user come in Archive screen');    
  //     dispatch(CalcsActions.LoadDb_func_archive(userid));
  //   }, [dispatch])
  // );

  const [ListItemOnLongPressValue, setListItemOnLongPressValue] = useState([]);

  const Calcs = useSelector((state) => state.Calcs.items_archive);
  const sum = useSelector((state) => state.Calcs.sum);
  
  useEffect(() =>{
    props.navigation.setParams({ usertitle: usertitle });
    dispatch(CalcsActions.LoadDb_func_archive(userid));
  },[usertitle,dispatch,userid]);



const TouchableOpacity_Mulite_clicked = ()=>{

  var title = "وضعیت";
    var text = "لطفا یکی از گزینه های زیر را برای کالاها انتخاب کنید"
    Alert.alert(title, text, [
      // {text:'حذف کامل'},
      { text: "لغو", style: "cancel" },
      { text: "حذف کامل", onPress: () => {
        ListItemOnLongPressValue.map(l => {
          full_delete_db(l.id);
        });
        dispatch(CalcsActions.LoadDb_func_archive(userid));
      } },
      {
        text: "خروج از بایگانی",
        onPress: () => {
          ListItemOnLongPressValue.map(l => {
            send_to_ListItem_db(l.id);
          });
          dispatch(CalcsActions.LoadDb_func_archive(userid));
        },
      },
    ]);

};
  
const TouchableOpacity_clicked = (id,title_prop) => {
  var title = "وضعیت";
  var text =
    "لطفا یکی از گزینه های زیر را برای کالای  " +
    title_prop +
    " انتخاب کنید";
  Alert.alert(title, text, [
    // {text:'حذف کامل'},
    { text: "لغو", style: "cancel" },
    { text: "حذف کامل", onPress: () => full_delete(id) },
    {
      text: "خروج از بایگانی",
      onPress: send_to_ListItem.bind(this, id),
    },
  ]);
};


const full_delete = useCallback((id)=>{
  // its must delete from db  send to cartItem
  const dbResult = full_delete_db(id);
    // console.log(dbResult);
    dispatch(CalcsActions.LoadDb_func_archive(userid));
  },[dispatch]);

const send_to_ListItem = useCallback((id)=>{
// its must delete from db  send to cartItem
const dbResult = send_to_ListItem_db(id);
  // console.log(dbResult);
  dispatch(CalcsActions.LoadDb_func_archive(userid));
},[dispatch]);


const selectedThisItem = (p)=>{
  let item = ListItemOnLongPressValue;
  if (p.value === true) {
    setListItemOnLongPressValue(item.filter(f => f.id != p.id).concat({id: p.id}));
  }else{
    setListItemOnLongPressValue(item.filter(f => f.id != p.id));
  }
};

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.9 }}>
        <FlatList
          data={Calcs}
          key={(item) => item.id.toString()}
          keyExtractor={(item) => item.id.toString()}

          renderItem={(itemData) => (
            <CalcItem
              title={itemData.item.title}
              mablagh={itemData.item.mablagh}
              time={itemData.item.id}
              TouchableOpacity_clicked={TouchableOpacity_clicked}
              selectedThisItem={selectedThisItem}
              navigation={props.navigation}
            />
          )}
          // ListFooterComponent={() => <Text>footer</Text>}
        />
      </View>
      <View style={styles.sumContainer}>
        <View style={styles.sum_textContainer}>
          <ScrollView>
            <Text style={styles.sumText}>
              {wordifyfa.wordifyRialsInTomans(sum)}
            </Text>
          </ScrollView>
        </View>
        <View style={styles.sum_numberContainer}>
          <ScrollView>
            <Text style={styles.sumNumber}>{sum}</Text>
          </ScrollView>
        </View>
      </View>

      {ListItemOnLongPressValue.length >=1?
      <TouchableOpacity onPress={TouchableOpacity_Mulite_clicked} style={styles.info}>
      <Ionicons
              name={"md-information-circle-outline"}
              size={50}
              color="black"
            />
  </TouchableOpacity>
: <View></View> }

    </View>
  );
};

ArchiveListScreen.navigationOptions = (navData) => {
  const title = navData.navigation.getParam('usertitle');
  return {
    headerTitle: "بایگانی کاربر "+ title,
  };
};

const styles = StyleSheet.create({
  sumContainer: {
    flex: 0.1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    alignItems: "center",
    paddingVertical: 0,
    paddingHorizontal: 30,
  },
  sum_numberContainer: {
    width: "20%",
    // backgroundColor: "blue",
    alignItems: "flex-end",
  },
  sumNumber: {
    fontSize: 15,
    fontFamily: "b-nazanin",
    color: Colors.primary,
  },
  sum_textContainer: {
    width: "80%",
    // backgroundColor: "red",
    alignItems: "flex-start",
    overflow: "scroll",
  },
  sumText: {
    fontSize: 30,
    fontFamily: "b-nazanin-bold",
    color: Colors.primary,
  },
  info:{
    position: 'absolute',
    // width: 56,
    // height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    left: 25,
    bottom: 55,
    // backgroundColor: '#03A9F4',
    borderRadius: 30,
    elevation: 8
  }
});

export default ArchiveListScreen;
