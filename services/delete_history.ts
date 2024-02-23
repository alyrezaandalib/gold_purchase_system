'use client'
import {getCookie} from "cookies-next";
import {baseURL} from "@/meta/_baseURL";

export const delete_history = async () => {
    const token = getCookie('TOKEN')
    // console.log('TOKEN >>>', token)
    const res = await fetch(``,
        {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `${token}`
            },
        }
    )
    // console.log('RES STATUS >>>', res.status)

    return res.status == 200;

}
