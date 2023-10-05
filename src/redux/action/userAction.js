import axios from "axios";
import { BASE_URL, FETCH_USER } from "../constant/userConst";

export let fetchUserAction = () => {
    return (dispatch) => {
        axios({
            url: BASE_URL,
            method: "GET",
        })
            .then((res) => {
                dispatch({ type: FETCH_USER, payload: res.data });
            })
            .catch((err) => {
                console.log("🚀👾👽 ~ err:", err);
            });
    };
};
