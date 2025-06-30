// lib/around.ts
import axios from "axios";

export async function fetchRange(lat: number, lon: number) {
    const response = await axios.get("http://localhost:8000/location/around", {
        params: {
            latitude: lat,
            longitude: lon
        }
    });
    return response.data;
}
