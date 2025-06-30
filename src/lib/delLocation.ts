// lib/deleteLocation.ts
import axios from "axios";

export async function deleteLocation(id: number) {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/location/delete_location/${id}`, {
        withCredentials: true,
    });
    return res.data;
}
