// lib/around.ts
import axios from "axios";

export async function fetchRange(lat: number, lon: number) {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/location/around`, {
        params: {
            latitude: lat,
            longitude: lon
        }
    });
    return response.data;
}
