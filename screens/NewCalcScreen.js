import React, {
  useEffect,
  useCallback,
  useReducer,
  useState,
  createRef,
} from "react";
import {
  ScrollView,
  View,
  Button,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../constants/Colors";
import * as CalcsActions from "../store/Calc-actions";
import Input from "../components/UI/Input";
import * as wordifyfa from "../helpers/wordifyfa";
// import ImagePicker from '../components/ImagePicker';
// import LocationPicker from '../components/LocationPicker';

// let secondTextInput = forwardRef();
let secondTextInput = createRef();

const NewCalcScreen = (props) => {
  const userid = useSelector((state) => state.Calcs.chosed_User_id);

  const edit_id = props.navigation.getParam("id");
  const editedCalc = useSelector((state) =>
    state.Calcs.items.find((item) => item.id === edit_id)
  );

  const [mablagh_text, setmablagh_text] = useState();

  const formReducer = (state, action) => {
    if (action.type === CalcsActions.ADD_Calc) {
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues,
      };
    }
    return state;
  };

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedCalc ? editedCalc.title : "",
      mablagh: editedCalc ? editedCalc.mablagh : 0,
    },
    inputValidities: {
      title: editedCalc ? true : false,
      mablagh: editedCalc ? true : false,
    },
    formIsValid: editedCalc ? true : false,
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      if (inputIdentifier === "mablagh") {
        var a = wordifyfa.wordifyRialsInTomans(inputValue);
        // var a = wordifyfa.wordifyfa(inputValue);
        setmablagh_text(a);
        // console.log(a);
      }

      dispatchFormState({
        type: CalcsActions.ADD_Calc,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );
  // console.log(props.navigation.getParam('pay_add'));
  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    // console.log('is touched');

    if (!formState.formIsValid) {
      var title = "خطا";
      var text = "لطفا فیلد ها را بادقت پرکنید";
      Alert.alert(title, text, [{ text: "باشه" }]);
      return;
    }
    if(props.navigation.getParam('pay_add') === true || props.navigation.getParam('pay_add') === 'true'){
      // inser pay
      if (editedCalc) {
      dispatch(
        CalcsActions.editPay(
          edit_id,
          formState.inputValues.title,
          +formState.inputValues.mablagh,
          +userid
        )
      );
      props.navigation.goBack();
      return true;
        }else{
          dispatch(
            CalcsActions.addPay(
              formState.inputValues.title,
              +formState.inputValues.mablagh,
              +userid
            )
          );

          props.navigation.goBack();
      return true;
        }

    }else if (editedCalc) {
      dispatch(
        CalcsActions.editCalc(
          edit_id,
          formState.inputValues.title,
          +formState.inputValues.mablagh,
          +userid
        )
      );
    } else {
      // insert item
      dispatch(
        CalcsActions.addCalc(
          formState.inputValues.title,
          +formState.inputValues.mablagh,
          +userid
        )
      );
      // console.log(userid);
    }
    props.navigation.goBack();
    return;
  }, [dispatch, formState]);

  const find_mablagh_text = (text) => {
    var a = wordifyfa.wordifyRialsInTomans(text);
    // var a = wordifyfa.wordifyfa(inputValue);
    setmablagh_text(a);
  };
  useEffect(() => {
    if (editedCalc) {
      var a = wordifyfa.wordifyRialsInTomans(editedCalc.mablagh);
      setmablagh_text(a);
    }
  }, [editedCalc]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id="title"
          label="عنوان"
          errorText="لطفا عنوان را وارد کنید"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          autoFocus={true}
          // ref={(input) => {}}
          onSubmitEditing={() => {
            secondTextInput.focus();
            // console.log(secondTextInput);
          }}
          // placeholderTextColor="#666"
          placeholder="عنوان را وارد کنید"
          returnKeyLabel="فیلد بعدی"
          onInputChange={inputChangeHandler}
          initialValue={editedCalc ? editedCalc.title : ""}
          initiallyValid={!!editedCalc}
          required
          onInputChange_mablagh_text={(text) => {}}
        />
        {/* <TextInput keyboardType="numeric"    ref={(input) => { secondTextInput = input; }} returnKeyType=""  /> */}
        <Input
          id="mablagh"
          // ref={(input) => { secondTextInput = input; }}
          ref_props={(input) => {
            secondTextInput = input;
          }}
          label="مبلغ"
          errorText="لطفا مبلغ را وارد کنید"
          keyboardType="numeric"
          // returnKeyType="send"
          placeholder="مبلغ را وارد کنید"
          // onEndEditing={send_from_mablagh}
          onSubmitEditing={find_mablagh_text}
          // onKeyPress={onKeyDownHandler}
          onInputChange={inputChangeHandler}
          initialValue={editedCalc ? String(editedCalc.mablagh) : 0}
          initiallyValid={!!editedCalc}
          required
          onInputChange_mablagh_text={find_mablagh_text}
        />

        <View style={styles.mablagh_textContainer}>
          <Text style={styles.mablagh_text}>{mablagh_text}</Text>
        </View>

        <View style={styles.submitContainer}>
          <TouchableOpacity
            // title="ذخیره کردن"
            // color={}
            onPress={submitHandler}
            style={styles.sumbit}
          >
            <Text style={styles.sumbitText}>ذخیره کردن</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

NewCalcScreen.navigationOptions = (navData) => {
  const pay_add = "کم کردن از صورت حساب";
  const add_calc_text = "اضافه کردن خرید";
  return {
    headerTitle: navData.navigation.getParam("pay_add")
      ? pay_add
      : add_calc_text,
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  mablagh_textContainer: {
    alignItems: "center",
    textAlign: "center",
    marginTop: 20,
  },
  mablagh_text: {
    color: Colors.primary,
    fontSize: 25,
    fontFamily: "b-nazanin-bold",
  },
  submitContainer: {
    marginTop: 30,
  },
  sumbit: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 1,
    paddingVertical: 12,
    borderRadius: 5,
    // padding:12,
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
  },
  sumbitText: {
    fontFamily: "b-nazanin-bold",
  },
});

export default NewCalcScreen;
