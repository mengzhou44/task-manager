import * as types from "../actions/types";

const INITIAL_STATE= {
     signUpData: null, 
     authenticated: false,
     profile: null
};

export default (state=INITIAL_STATE, action) => {
     switch(action.type) {
         case types.SET_SIGNUP_DATA: 
             return {...INITIAL_STATE, signUpData: action.payload};

       case types.SIGN_IN_SUCCESS:
             return {...INITIAL_STATE, authenticated: true, profile: action.payload};

         case types.SIGN_OUT_SUCCESS:
             return  INITIAL_STATE;

         default:
             return state    
     }
}