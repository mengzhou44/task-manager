import httpService from "../_utils/http-service";
import { getAuthHttpConfig } from "../_utils/auth-utils";

export const getTasks = callback => {
  return function(dispatch) {
    httpService
      .get("/tasks", getAuthHttpConfig())
      .then(res => {
        if (res.status === 200) {
          callback({ success: true, tasks: res.data });
        } else {
          callback({ success: false });
        }
      })
      .catch(e => {
        callback({ success: false });
      });
  };
};

export const updateTask = (task, callback) => {
  return function(dispatch) {
    httpService
      .put("/task", task, getAuthHttpConfig())
      .then(res => {
        if (res.status === 200) {
          callback({ success: true, task: res.data });
        } else {
          callback({ success: false });
        }
      })
      .catch(e => {
        callback({ success: false });
      });
  };
};
