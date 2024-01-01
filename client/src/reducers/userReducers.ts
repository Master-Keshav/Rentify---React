const initialState = {
    user: {
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "",
    },
};

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload };
        case "SET_ROLE":
            return { ...state, user: { ...state.user, role: action.payload } };
        default:
            return state;
    }
};

export default userReducer;
