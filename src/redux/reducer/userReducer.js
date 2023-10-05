import { FETCH_USER, GET_DETAIL, SET_DATA_FORM } from "../constant/userConst";

let initialState = {
    userArr: [],
    user: {
        id: "",
        account: "",
        name: "",
        password: "",
    },
};

export let userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_USER: {
            state.userArr = payload;
            return { ...state };
        }

        case SET_DATA_FORM: {
            state.user = payload;
            return { ...state };
        }

        case GET_DETAIL: {
            state.user = payload;
            return { ...state };
        }

        default:
            return state;
    }
};
