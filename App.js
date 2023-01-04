
import React,{useState,useEffect} from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import CalcNavigator from './navigation/CalcNavigator';
import CalcReducer from './store/Calc-reducer';
import { init_Make_Calc_item,init_Make_Users,use_from } from './helpers/db';




init_Make_Users()
  .then((su) => {
    // console.log(su);
    console.log('init_Make_Users su');
  })
  .catch(err => {
    console.log('init_Make_Users db failed.');
    console.log(err);
  });
  init_Make_Calc_item().then((su) => {
    // console.log(su);
    console.log('init_Make_Calc_item su');
  })
  .catch(err => {
    console.log('init_Make_Calc_item db failed.');
    console.log(err);
  });

  // use_from();
// const use_from_db = use_from();
// console.log(use_from_db);


const fetchFonts = () =>{
  return Font.loadAsync({
    'b-nazanin': require('./assets/fonts/Far_Nazanin.ttf'),
    'b-nazanin-bold': require('./assets/fonts/B_Nazanin_Bold.ttf')
  });
};

const rootReducer = combineReducers({
  Calcs: CalcReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={() =>{
      setFontLoaded(true)
    }} />
  }

  // useEffect(() => {
    
  // }, [])

  return (
    <Provider store={store}>
      <CalcNavigator />
     </Provider>
  );
}
