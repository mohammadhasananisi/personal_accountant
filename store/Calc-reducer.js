import { ADD_Calc, LOADDB, LOADDBArchive, LOADDBUSERS, SELECTEUSERS, LOGOUT, ADD_USERS,EditClac,ADD_Pay } from "./Calc-actions";
import Calc from "../models/Calc";
import Users from "../models/Users";

const initialState = {
  items: [],
  sum: 0,
  users: [],
  chosed_User_id: 0,
  chosed_User_title: '',
  items_archive: [],
  sum_archive: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_USERS:
      return {
        chosed_User_id:0,
        chosed_User_title: '',
        users:[]
      };

    case LOGOUT:
      return{
        chosed_User_id:0,
        chosed_User_title: '',
      };
    case LOADDBUSERS:
      const users_db = action.UsersDb.map((u) => {
        return new Users(u.id, u.title,u.image);
      });
// console.log(users_db);

      return {
        chosed_User_id: 0,
        chosed_User_title:'',
        users: users_db,
      };

    case SELECTEUSERS:

      return {
        chosed_User_id:action.id,
        chosed_User_title:action.title
      };
      
    
    case LOADDB:
      // load from db
      let sum_map = 0;
      // return state;
      const newItems = action.Calc.map((pl) => {
        if (pl.pay === 0) {
          sum_map = sum_map + pl.mablagh;  
        }else if(pl.pay === 1){
          sum_map = sum_map - pl.mablagh;  
        }
        // console.log(pl.mablagh);

        return new Calc(pl.id, pl.title, pl.mablagh, pl.pay);
      });
      return {
        chosed_User_id: state.chosed_User_id,
        chosed_User_title:state.chosed_User_title,
        items: newItems,
        sum: sum_map,
      };

    case LOADDBArchive:
      let sum_map_Archive = 0;
      const newItems_Archive = action.CalcArchive.map((pl) => {
        if(pl.pay ===0){
        sum_map_Archive = sum_map_Archive + pl.mablagh;
        }else if(pl.pay===1){
          sum_map_Archive = sum_map_Archive - pl.mablagh;
        }
        // console.log(pl.mablagh);

        return new Calc(pl.id, pl.title, pl.mablagh, pl.pay);
      });
      return {
        chosed_User_id: state.chosed_User_id,
        chosed_User_title:state.chosed_User_title,
        items_archive: newItems_Archive,
        sum_archive: sum_map_Archive,
        items: state.items,
        sum: state.sum,
      };

    case ADD_Calc:
      const newCalc = new Calc(
        action.CalcData.id,
        action.CalcData.title,
        action.CalcData.mablagh,
        0
      );
      // console.log(state.sum + action.CalcData.mablagh);
// console.log(state.items);

      // Object.assign({}, o1, o2, o3);
      return {
        chosed_User_id: state.chosed_User_id,
        chosed_User_title:state.chosed_User_title,
        items_archive:state.items_archive,
        sum_archive: state.sum_archive,
        items: [newCalc,...state.items],
        sum: state.sum + action.CalcData.mablagh,
      };
      case ADD_Pay:
        const newPay = new Calc(
          action.CalcData.id,
          action.CalcData.title,
          action.CalcData.mablagh,
          1
        );
        // console.log(state.sum + action.CalcData.mablagh);
        return {
          chosed_User_id: state.chosed_User_id,
          chosed_User_title:state.chosed_User_title,
          items_archive: state.items_archive,
          sum_archive: state.sum_archive,
          items: [newPay,...state.items],
          sum: state.sum - action.CalcData.mablagh,
        };

      case EditClac:
        // console.log(pay_status);
        
        const newCalc_edit = new Calc(
          action.CalcData.id,
          action.CalcData.title,
          action.CalcData.mablagh,
          action.editPay
        );
        const itemsIndex = state.items.findIndex(item => item.id === action.CalcData.id);

        const item_old = [...state.items];
        const old_item_for_edit = item_old[itemsIndex];
        item_old[itemsIndex] = newCalc_edit;
    
        
        const sum_find = action.editPay === 1 ? (state.sum +old_item_for_edit.mablagh) - action.CalcData.mablagh : (state.sum - old_item_for_edit.mablagh) + action.CalcData.mablagh;
        // console.log(sum_find);
        // del old_item_for_edit

        return {
          chosed_User_id: state.chosed_User_id,
          chosed_User_title:state.chosed_User_title,
          items_archive:state.items_archive,
          sum_archive: state.sum_archive,
          items: item_old,
          sum: sum_find,
        };
    default:
      return state;
  }
};
