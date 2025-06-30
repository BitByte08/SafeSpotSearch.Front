'use client'
import React, { useEffect, useState } from "react";
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
    const {center, setCenter} = useMapStore();
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
        <div className="px-8 overflow-y-auto">
            <p className="text-2xl font-bold sticky top-0 bg-amber-100">내 저장 위치</p>
            <ul>
                {saveList.map((loc) => (
                    <li key={loc.id} className="flex flex-col">
                        <button onClick={() => setCenter([loc.lat,loc.lon])}>
                            {loc.description || `위치 #${loc.id}`}
                        </button>
                        <button onClick={() => handleDelete(loc.id)} className="w-full bg-amber-400 rounded">삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SaveList;
