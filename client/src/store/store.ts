import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducers';
import propertyReducer from '../reducers/propertyReducers';

const store = configureStore({
    reducer: {
        user: userReducer,
        property: propertyReducer,
    },
});

export default store;
