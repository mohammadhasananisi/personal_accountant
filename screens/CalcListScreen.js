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
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import * as wordifyfa from "../helpers/wordifyfa";
import { useFocusEffect } from "react-navigation-hooks";
import { Ionicons } from "@expo/vector-icons";

// import {LoadDb_func} from '../store/Calc-actions';
import { full_delete_db, send_to_Archive_db } from "../helpers/db";

import HeaderButton from "../components/HeaderButton";
import CalcItem from "../components/CalcItem";
import Colors from "../constants/Colors";
import * as CalcsActions from "../store/Calc-actions";

const CalcsListScreen = (props) => {
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.Calcs.chosed_User_id);
  const usertitle = useSelector((state) => state.Calcs.chosed_User_title);
  // useFocusEffect(
  //   useCallback(() => {
  //     console.log("user come in Nomal screen");
  //     dispatch(CalcsActions.LoadDb_func(userid));
  //   }, [dispatch])
  // );

  const [ListItemOnLongPressValue, setListItemOnLongPressValue] = useState([]);
  const Calcs = useSelector((state) => state.Calcs.items);
  const sum = useSelector((state) => state.Calcs.sum);

  useEffect(() => {
    props.navigation.setParams({ usertitle: usertitle });
    console.log("user come in Nomal screen");
    dispatch(CalcsActions.LoadDb_func(userid));
  }, [usertitle, dispatch, userid]);

  const TouchableOpacity_Mulite_clicked = () => {
    var title = "وضعیت";
    var text = "لطفا یکی از گزینه های زیر را برای کالاها انتخاب کنید";
    Alert.alert(title, text, [
      // {text:'حذف کامل'},
      { text: "لغو", style: "cancel" },
      {
        text: "حذف کامل",
        onPress: () => {
          ListItemOnLongPressValue.map((l) => {
            full_delete_db(l.id);
          });
          dispatch(CalcsActions.LoadDb_func(userid));
        },
      },
      {
        text: "ارسال به بایگانی",
        onPress: () => {
          ListItemOnLongPressValue.map((l) => {
            console.log(l.id);

            send_to_Archive_db(l.id);
          });
          dispatch(CalcsActions.LoadDb_func(userid));
        },
      },
    ]);
  };

  const TouchableOpacity_clicked = (id, title_prop) => {
    var title = "وضعیت";
    var text =
      "لطفا یکی از گزینه های زیر را برای کالای  " + title_prop + " انتخاب کنید";
    Alert.alert(title, text, [
      // {text:'حذف کامل'},
      { text: "لغو", style: "cancel" },
      { text: "حذف کامل", onPress: () => full_delete(id) },
      { text: "ارسال به بایگانی", onPress: () => send_to_Archive(id) },
    ]);
  };

  const full_delete = useCallback(
    (id) => {
      // its must delete from db  send to cartItem
      const dbResult = full_delete_db(id);
      // console.log(dbResult);
      dispatch(CalcsActions.LoadDb_func(userid));
    },
    [dispatch]
  );

  const send_to_Archive = useCallback(
    (id) => {
      // its must delete from db  send to cartItem
      const dbResult = send_to_Archive_db(id);
      // console.log(dbResult);
      dispatch(CalcsActions.LoadDb_func(userid));
    },
    [dispatch]
  );

  const selectedThisItem = (p) => {
    let item = ListItemOnLongPressValue;
    if (p.value === true) {
      setListItemOnLongPressValue(
        item.filter((f) => f.id != p.id).concat({ id: p.id })
      );
    } else {
      setListItemOnLongPressValue(item.filter((f) => f.id != p.id));
    }
    return;
  };

  const open_sum = () => {
    Alert.alert("مجموع به عدد", String(sum), [{ text: "بستن", style: "cancel" }]);
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.8 }}>
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
              pay={itemData.item.pay}
            />
          )}
          // ListFooterComponent={() => <Text>footer</Text>}
        />
      </View>
      <View style={styles.sumContainer}>
        <View style={styles.sum_textContainer}>
          <ScrollView>
            <Text style={styles.sumText} onLongPress={open_sum}>
              {wordifyfa.wordifyRialsInTomans(sum)}
            </Text>
          </ScrollView>
        </View>
      </View>
      {/* <View style={styles.sum_numberContainer}>
        <ScrollView>
         <Text style={styles.sumNumber}>{sum}</Text>
         </ScrollView>
        </View> */}

      {ListItemOnLongPressValue.length >= 1 ? (
        <TouchableOpacity
          onPress={TouchableOpacity_Mulite_clicked}
          style={styles.info}
        >
          <Ionicons
            name={"md-information-circle-outline"}
            size={50}
            color="black"
          />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
  );
};

CalcsListScreen.navigationOptions = (navData) => {
  const title = navData.navigation.getParam("usertitle");
  return {
    headerTitle: " لیست  خرید " + title,
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primary : "",
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    headerTitleStyle: {
      width: "100%",
      overflow: "hidden",
    },
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="خروج"
            iconName={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
            onPress={() => {
              CalcsActions.log_out();
              navData.navigation.navigate("ChoseUsers");
            }}
          />
        </HeaderButtons>
      );
    },

    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            buttonStyle={{color:'green'}}
            title="اضافه کردن"
            iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
            onPress={() => {
              navData.navigation.navigate("NewCalc");
              // console.log('is on prees at add');
            }}
          />

          <Item
          buttonStyle={{color:'red'}}
            title="کم کردن صورت حساب"
            iconName={Platform.OS === "android" ? "md-remove" : "ios-remove"}
            onPress={() => {
              navData.navigation.navigate("NewCalc", { pay_add: true });
              // console.log('is on prees at remove');
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  sumContainer: {
    flex: 0.2,
    width: "100%",
    // flexDirection: "row",
    // justifyContent: "space-between",
    textAlign: "center",
    alignItems: "center",
    paddingVertical: 0,
    paddingHorizontal: 30,
    // color: 'black',
    backgroundColor: "rgb(0,200,255)",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  sum_numberContainer: {
    width: "100%",
    // height: "50%",
    // backgroundColor: "blue",
    // alignItems:"flex-end",
  },
  sumNumber: {
    fontSize: 15,
    fontFamily: "b-nazanin",
    color: Colors.primary,
  },
  sum_textContainer: {
    width: "100%",
    height: "100%",
    // backgroundColor: "#ccc",
    // alignItems:"flex-start",
    overflow: "scroll",
  },
  sumText: {
    fontSize: 30,
    fontFamily: "b-nazanin-bold",
    color: "black",
  },
  info: {
    position: "absolute",
    // width: 56,
    // height: 56,
    alignItems: "center",
    justifyContent: "center",
    left: 25,
    bottom: 150,
    // backgroundColor: '#03A9F4',
    borderRadius: 30,
    elevation: 8,
  },
});

export default CalcsListScreen;
