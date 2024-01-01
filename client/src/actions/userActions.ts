import { Dispatch } from "redux";

export const setUser = (user: any) => {
    return {
        type: "SET_USER",
        payload: user,
    };
};

export const setRole = (role: string | undefined) => {
    return {
        type: "SET_ROLE",
        payload: role,
    };
};

export const setUserAndRole = (user: any, role: string | undefined) => {
    return (dispatch: Dispatch) => {
        dispatch(setUser(user));
        dispatch(setRole(role));
    };
};
