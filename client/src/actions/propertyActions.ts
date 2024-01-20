export const setAgent = (user: any) => {
    return {
        type: "SET_AGENT",
        payload: user,
    };
};

export const setProperty = (user: any) => {
    return {
        type: "SET_PROPERTY",
        payload: user,
    };
};