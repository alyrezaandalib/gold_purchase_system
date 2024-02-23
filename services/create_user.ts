'use client'
import {getCookie} from "cookies-next";
import {baseURL} from "@/meta/_baseURL";

export const create_user = async (data: any) => {
    const token = getCookie('TOKEN')

    const res = await fetch(``,

        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                first_name: data['firstName'],
                last_name: data['lastName'],
                national_code: data['nationalCode'],
                phone_number: data['phoneNumber'],
                password: data['password'],
                username: data['username'],
                group: data['group']
            })
        }
    )

    if (!res.ok) return false

    return await res.json()

}
