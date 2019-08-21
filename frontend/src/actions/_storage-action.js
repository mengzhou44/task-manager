import * as types from "./types";

export const setStorageItem = (key, value) => {
   return {
        type: types.SET_ITEM,
        payload: {
          key,
          value
        }
      };
   
};


export const removeStorageItem = (key) => {
    return  {
         type: types.REMOVE_ITEM,
         payload:key      
       };
     
 };