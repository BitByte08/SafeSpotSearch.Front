// lib/deleteLocation.ts
import axios from "axios";

export async function deleteLocation(id: number) {
    const res = await axios.delete(`http://localhost:8000/location/delete_location/${id}`, {
        withCredentials: true,
    });
    return res.data;
}
