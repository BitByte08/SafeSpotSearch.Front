'use client'
import React, { useEffect } from "react";
import { fetchGetLocations } from "@/lib/getLocation";
import useSaveListStore from "@/store/SaveListStore";
import {deleteLocation} from "@/lib/delLocation";
import useMapStore from "@/store/MapStore";

export interface Location {
    id: number;
    lat: number;
    lon: number;
    description?: string;
}

const SaveList: React.FC = () => {
    const {saveList, setSavelist} = useSaveListStore();
    const {setCenter} = useMapStore();
    useEffect(() => {
        fetchGetLocations().then(setSavelist).catch(console.error);
    }, []);
    const handleDelete = async (id: number) => {
        try {
            await deleteLocation(id);
            fetchGetLocations().then(setSavelist).catch(console.error);
        } catch (e) {
            console.error("삭제 실패", e);
        }
    };
    return (
        <div className="mt-20 px-8 mx-2 overflow-y-auto">
            <p className="text-2xl font-bold sticky top-0 bg-amber-100 mb-2">내 저장 위치</p>
            <ul>
                {saveList.map((loc) => (
                    <li key={loc.id} className="flex flex-col mb-4">
                        <button onClick={() => setCenter([loc.lat,loc.lon])}>
                            <span className="font-bold text-xl">{loc.description || `위치 #${loc.id}`}</span>
                        </button>
                        <button onClick={() => handleDelete(loc.id)} className="w-full bg-amber-800 text-white rounded">삭제</button>
                        <button onClick={() => location.href=`http://localhost:8000/location/update_description/${loc.id}`} className="w-full bg-amber-300 rounded">수정</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SaveList;
