import {combineReducers} from 'redux';
import { reducer as form } from "redux-form";

import auth from './_auth-reducer';
import storage from './_storage-reducer';

export default combineReducers({
      form,
      auth,
      storage
});
