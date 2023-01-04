import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';



const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : null,
    isValid: props.initiallyValid,
    touched: false
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = text => {
    let isValid = true;
    // if (props.required && text.trim().length === 0) {
    //   isValid = false;
    // }
    // if (props.min != null && +text < props.min) {
    //   isValid = false;
    // }
    // if (props.max != null && +text > props.max) {
    //   isValid = false;
    // }
    // if (props.minLength != null && text.length < props.minLength) {
    //   isValid = false;
    // }
    // console.log('text is changed');
    props.onInputChange_mablagh_text(text);
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };
// console.log(props.initialValue);



  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      {props.next}
      <TextInput
        {...props}
        ref={props.ref_props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
        
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'b-nazanin-bold',
    marginVertical: 8,
    fontSize:25,
  },
  input: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomColor: '#ccc',
    borderColor:"#ccc",
    // borderBottomWidth: 1,
    borderWidth:1,
    fontFamily: 'b-nazanin',
    fontSize: 25,
    height:50
  },
  errorContainer: {
    marginVertical: 10,
  },
  errorText: {
    // fontFamily: 'open-sans',
    color: 'red',
    fontSize: 13,
    fontFamily: 'b-nazanin-bold',
  }
});

export default Input;
