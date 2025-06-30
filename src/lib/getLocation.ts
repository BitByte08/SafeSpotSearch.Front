// lib/getLocation.ts
import axios from "axios";

export async function fetchGetLocations() {
    const res = await axios.get("http://localhost:8000/location/get_locations", {
        withCredentials: true,
    });
    return res.data;
}
