import {cookies} from "next/headers";
import {baseURL} from "@/meta/_baseURL";

export default async function checkLogin() {
    // console.log('Checking Token Validation ...')
    const token = cookies().get('TOKEN')?.value as string
    try {
        // console.log(token)
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
        return response.ok;

    } catch (e) {
        // console.log('Login Check Error:', e)
    }

}
