'use client'
import {getCookie} from "cookies-next";
import {baseURL} from "@/meta/_baseURL";

export const get_all_tradables = async (group_id: string) => {
    const token = getCookie('TOKEN')
    // console.log('TOKEN TRADABLE>>>', token)

    const res = await fetch(``,
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `${token}`
            },
        }
    )

    if (!res.ok) return false

    return await res.json()

}
