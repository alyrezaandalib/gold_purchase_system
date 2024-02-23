// import http2 from "@/services/http";
import axios from "axios";
import {getCookie} from "cookies-next";

export const globalCurrencyChart = () => {

    const token = getCookie('TOKEN')
    const headers = {
        Authorization: token
    };

    return axios.get("", {headers})
};
