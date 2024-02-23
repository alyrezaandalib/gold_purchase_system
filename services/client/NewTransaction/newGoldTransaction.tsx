import http from "@/services/http";
import {getCookie} from "cookies-next";

export const newGoldTransaction = async (formData: any) => {
    // console.log(formData)
    const token = getCookie('TOKEN')
    const headers = {
        Authorization: token
    };

    const body = {
        product: formData.GoldOptions,
        amount: formData.Amount,
        expire_time: formData.Time,
        price: formData.UnitPrice
    };


    return await http.post("", body, {headers});
};
