

import get_date from '../helpers/date';

export const LOADDB = 'LOADDB';
export const LOADDBArchive = 'LOADDBArchive';
export const ADD_Calc = 'ADD_Calc';
export const ADD_Pay = 'ADD_Pay';
export const ADD_USERS = 'ADD_USERS';
export const LOADDBUSERS = 'LOADDBUSERS';
export const SELECTEUSERS = 'SELECTEUSERS';
export const EditClac = 'EditClac';
import {insertCalc,fetchCalc,fetchCalc_archive,fetchCalc_Users,insertUsers,UpdateUser_db,Edit_Calc_db} from '../helpers/db';

export const addCalc = (title,mablagh,for_user) => {
  return async dispatch => {
    const id = get_date();
    const dbResult = await insertCalc(id,title,mablagh,for_user);
      console.log(dbResult);
      console.log('is add');
      

    dispatch({
      type: ADD_Calc,
      CalcData: {
        id: id,
        title: title,
        mablagh:mablagh
      }
    });

  };
};


export const addPay = (title,mablagh,for_user) => {
  return async dispatch => {
    const id = get_date();
    const dbResult = await insertCalc(id,title,mablagh,for_user,1);
      console.log(dbResult);
      console.log('is add pay');
      

    dispatch({
      type: ADD_Pay,
      CalcData: {
        id: id,
        title: title,
        mablagh:mablagh
      }
    });

  };
};


export const editCalc = (id,title,mablagh,for_user) => {
  return async dispatch => {
    const dbResult = await Edit_Calc_db(id,title,mablagh,for_user);
      console.log(dbResult);
      console.log('updated');


    dispatch({
      type: EditClac,
      CalcData: {
        id: id,
        title: title,
        mablagh:mablagh
      },
      editPay: 0,
    });

  };
};



export const editPay = (id,title,mablagh,for_user) => {
  return async dispatch => {
    const dbResult = await Edit_Calc_db(id,title,mablagh,for_user);
      console.log(dbResult);
      console.log('updated');


    dispatch({
      type: EditClac,
      CalcData: {
        id: id,
        title: title,
        mablagh:mablagh,
      },
      editPay: 1,
    });

  };
};




export const addUser = (title,image) => {
  return async dispatch => {
    const id = get_date();
    const dbResult = await insertUsers(id,title,image);
      console.log(dbResult);
    dispatch({
      type: ADD_USERS,
    });

  };
};





export const UpdateUser = (id,title,image) => {
  // console.log(id);
  // console.log(title);
  // console.log(image);
  return async dispatch => {
    const dbResult = await UpdateUser_db(id,title,image);
    
      console.log(dbResult);
      console.log('updated');
    dispatch({
      type: ADD_USERS,
    });

  };
};



export const LoadDb_func = (userid) => {
  // console.log('is called');
  
  return async dispatch => {
    try {
      const dbResult = await fetchCalc(userid);
      // console.log(dbResult.rows._array);
      dispatch({ type: LOADDB, Calc: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};




export const LoadDb_Users = () => {
  // console.log('is called');
  
  return async dispatch => {
    try {
      const dbResult = await fetchCalc_Users();
      // console.log(dbResult.rows._array);
      dispatch({ type: LOADDBUSERS, UsersDb: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};



export const SelectedUsers = (id,title) => {
  return async dispatch => {
    try {
      dispatch({ type: SELECTEUSERS, id:id,title:title });
    } catch (err) {
      throw err;
    }
  };
};



export const LoadDb_func_archive = (userid) => {
  console.log('is Archive');
  
  return async dispatch => {
    try {
      const dbResult = await fetchCalc_archive(userid);
      // console.log(dbResult.rows._array);
      dispatch({ type: LOADDBArchive, CalcArchive: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};


export const LOGOUT = 'LOGOUT';
export const log_out = ()=>{
  return { type: LOGOUT };
};