'use client'
import {getCookie} from "cookies-next";
import {baseURL} from "@/meta/_baseURL";

export const get_all_users = async () => {
    const token = getCookie('TOKEN')

    const res = await fetch(``,

        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `${token}`
            }
        }
    )

    if (!res.ok) return false

    return await res.json()

}
