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
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import * as CalcsActions from "../store/Calc-actions";
import Input from "../components/UI/Input";
import ImagePicker from "../components/ImagePicker";
import {full_delete_users_db} from '../helpers/db';
const NewUserScreen = (props) => {
  const [imageUri, setImageUri] = useState("");
  const ImagePicker_uri = (uri) => {
    setImageUri(uri);
    // console.log(uri);
  };

  // const editedProduct = false;

  const userid = props.navigation.getParam("id");
  const editedProduct = useSelector((state) =>
    state.Calcs.users.find((u) => u.id === userid)
  );


  // console.log();
  useEffect(() => {
    if (editedProduct) {
      setImageUri(editedProduct.image);
    }
  }, [editedProduct]);

  const formReducer = (state, action) => {
    if (action.type === CalcsActions.ADD_USERS) {
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
      title: editedProduct ? editedProduct.title : "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: CalcsActions.ADD_USERS,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    // console.log('is touched');
// console.log(!!imageUri);
// console.log(imageUri);


    if (!formState.formIsValid || !imageUri) {
      var title = "خطا";
      var text = "لطفا فیلد ها را بادقت پرکنید";
      Alert.alert(title, text, [{ text: "باشه" }]);
      return;
    }
    if (editedProduct) {
      dispatch(
        CalcsActions.UpdateUser(userid, formState.inputValues.title, imageUri)
      );
      
    } else {
      // insert
      dispatch(
        // formState.inputValues.title,
        CalcsActions.addUser(formState.inputValues.title, imageUri)
      );
    }

    props.navigation.goBack();
    return;
  }, [dispatch, formState, imageUri]);

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
          // placeholderTextColor="#666"
          placeholder="عنوان را وارد کنید"
          returnKeyLabel="فیلد بعدی"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.title : ""}
          initiallyValid={!!editedProduct}
          required
          onInputChange_mablagh_text={(text) => {}}
        />
        <View style={styles.ImagePicker}>
          {!!imageUri ? (
            <View>
              <Image source={{ uri: imageUri }} style={styles.image} />
              <View style={styles.change_photo}>
                <ImagePicker
                  title="عوض کردن عکس"
                  ImagePicker_uri={ImagePicker_uri}
                />
              </View>
            </View>
          ) : (
            <ImagePicker title="انتخاب عکس" ImagePicker_uri={ImagePicker_uri} />
          )}
        </View>

        <View style={styles.submitContainer}>
          <TouchableOpacity onPress={submitHandler} style={styles.sumbit}>
            <Text style={styles.sumbitText}>ذخیره کردن</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

NewUserScreen.navigationOptions = navData => {
  return{
  headerTitle: "اضافه کردن کاربر",
  headerRight: () => {
    if(navData.navigation.getParam('id')){
    return (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
        buttonStyle={{color:'red'}}
          title="پاک کردن"
          color='red'
          iconName={Platform.OS === "android" ? "md-trash" : "ios-trash"}
          onPress={() => {
            var title = 'پاک کردن';
            var msg = "ایا مایل به پاک کردن این کاربر هستید";
            Alert.alert(title,msg,[
              {text: 'خیر', style:'cancel'},
              {text:'بله' , onPress: () => {
                full_delete_users_db(navData.navigation.getParam('id'));
                navData.navigation.goBack();
              }},
            ]);
          }}
        />
      </HeaderButtons>
    );
        }else{
          // in new users page
        }
  },
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  ImagePicker: {
    marginTop: 20,
  },
  image: {
    flex: 1,
    height: 200,
    borderRadius: 20,
  },
  change_photo: {
    marginTop: 20,
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

export default NewUserScreen;
