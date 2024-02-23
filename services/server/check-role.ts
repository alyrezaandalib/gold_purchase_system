import {baseURL} from "@/meta/_baseURL";
import {getCookie, hasCookie} from "cookies-next";

export default async function checkRole() {
    // console.log('Checking Token Validation ...')
    const isToken = hasCookie('TOKEN')
    if (isToken) {
        const token = getCookie('TOKEN') as string

        try {
            const response = await fetch(
                ``,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    }
                }
            )
            // console.log('Validation response', response.status)
            if (response.ok) return await response.json()
            else return false;

        } catch (e) {
            // console.log('Login Check Error:', e)
        }
    }
}
