import store from "./get-redux-store";

export const getAuthHttpConfig = () => {

    let token = store.getState().storage.authToken;

    if (token === undefined) {
        throw new Error("auth token is not found!")
    }

    return {
        headers: { 'Authorization': `Bearer ${token}`}
    };
}

 

