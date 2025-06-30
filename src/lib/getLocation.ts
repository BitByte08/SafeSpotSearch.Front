// lib/getLocation.ts
import axios from "axios";

export async function fetchGetLocations() {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/location/get_locations`, {
        withCredentials: true,
    });
    return res.data;
}
