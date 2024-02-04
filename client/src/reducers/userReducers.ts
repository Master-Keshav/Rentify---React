const initialState = {
    user: {
        _id: "",
        avatar: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "",
    },
    agent: null,
    agents: []
};

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload };
        case "SET_AGENT":
            return { ...state, agent: action.payload };
        case "SET_AGENTS":
            return { ...state, agents: action.payload };
        default:
            return state;
    }
};

export default userReducer;