const initialState = {
    property: {
        description: "",
        facilities: [],
        imageURL: "",
        location: "",
        name: "",
        phone: "",
        price: "",
        type: "",
        _id: ""
    },
    user: {
        _id: "",
        avatar: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "",
    },
};

const propertyReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_AGENT":
            return { ...state, user: action.payload };
        case "SET_PROPERTY":
            return { ...state, property: action.payload };
        default:
            return state;
    }
};

export default propertyReducer;