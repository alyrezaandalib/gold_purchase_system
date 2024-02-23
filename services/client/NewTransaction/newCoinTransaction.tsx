import http from "@/services/http";
import {getCookie} from "cookies-next";

export const newCoinTransaction = async (formData: any) => {
    const token = getCookie('TOKEN')
    const headers = {
        Authorization: token
    };

    const body = {
        product: formData.CoinOptions,
        amount: formData.Amount,
        expire_time: formData.Time,
        price: formData.UnitPrice
    };

    return await http.post("", body, {headers});
};
