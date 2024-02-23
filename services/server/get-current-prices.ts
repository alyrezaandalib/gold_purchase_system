'use client'
import {baseURL} from "@/meta/_baseURL";
import {getCookie} from "cookies-next";

export default async function getCurrentPrices() {
    const token = getCookie('TOKEN')
    // console.log('TOKEN >>>', token)
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
