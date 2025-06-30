import React, {useState} from "react";
import axios from "axios";
import useSaveListStore from "@/store/SaveListStore";
import {fetchGetLocations} from "@/lib/getLocation";

interface SaveButtonProps {
    lat: number;
    lon: number;
    description?: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({ lat, lon, description }) => {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const {setSavelist} = useSaveListStore();
    const handleSave = async () => {
        setLoading(true);
        setMsg("");
        try {
            const params = new URLSearchParams();
            params.append("latitude", lat.toString());
            params.append("longitude", lon.toString());
            if (description) params.append("description", description);

            await axios.post("http://localhost:8000/location/save_location", params, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                withCredentials: true,
            });
            setMsg("저장 성공!");
            fetchGetLocations().then(setSavelist).catch(console.error);

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button onClick={handleSave} disabled={loading}>
                {loading ? "저장 중..." : "위치 저장"}
            </button>
            {msg && <p>{msg}</p>}
        </>
    );
};

export default SaveButton;
