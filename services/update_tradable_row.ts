'use client'
import {getCookie} from "cookies-next";
import {baseURL} from "@/meta/_baseURL";

export const update_tradable_row = async (row: any) => {
    const token = getCookie('TOKEN')

    const res = await fetch(``,

        {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                sale_profit: Number(row['sale_profit']),
                buy_profit: Number(row['buy_profit']),
                enable: Boolean(row['enable'])
            })
        }
    )

    if (!res.ok) return false

    return await res.json()

}
