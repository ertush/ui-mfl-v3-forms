import axios from "axios"

export async function getToken (req, res) {
   
    const tokenApi = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_PUBLIC_TOKEN_URL}`
    })

    try {
        return await tokenApi.post('', {
            username: process.env.NEXT_PUBLIC_CLIENT_USERNAME,
            password: process.env.NEXT_PUBLIC_CLIENT_PASSWORD,
            grant_type: "password"
        },
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic " + Buffer.from(`${process.env.NEXT_PUBLIC_CLIENT_PUBLIC_ID}:${process.env.NEXT_PUBLIC_CLIENT_PUBLIC_SECRET}`).toString('base64')
                },
            })?.data?.data.access_token
    }
    catch (e){
        console.error('Error :',e.message)
    }
}   