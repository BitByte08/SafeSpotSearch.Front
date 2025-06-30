// components/Map.tsx
"use client";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
});

import {MapContainer, TileLayer, Circle, Marker, Popup, useMapEvents, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SaveButton from "@/components/SaveButton";
import {useEffect, useState} from "react";
import axios from "axios";
import useMapStore from "@/store/MapStore";
import {Shelter} from "@/types/location";

const ClickHandler = ({ onClick }: { onClick: (lat: number, lon: number) => void }) => {
    useMapEvents({
        click(e) {
            onClick(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
};

const MapFlyTo = ({ center }: { center: [number, number] }) => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;  // map이 없으면 아무것도 안 함
        if (!center) return; // center 값도 체크
        map.flyTo(center, 15);
    }, [center, map]);

    return null;
};

const MapWithPing = () => {
    const {center, setCenter} = useMapStore();
    const [clickPos, setClickPos] = useState<[number, number] | null>(null);
    const [shelters, setShelters] = useState<Shelter[]>([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            setCenter([lat, lon]);
        });
    }, []);
    const fetchShelters = async () => {
        if (!clickPos) return;
        const res = await axios.get("http://localhost:8000/location/around", {
            params: {
                latitude: clickPos[0],
                longitude: clickPos[1],
                radius: 5000,
            },
        });
        setShelters(res.data.shelters);
        console.log(res.data);
    };
    useEffect(() => {
        setClickPos(center);
        fetchShelters();
    }, [center]);
    if (!center) return <p>📍 위치 불러오는 중...</p>;

    return (
        <div>
            <MapContainer center={center} zoom={14} style={{ height: "600px", marginTop: "10px" }}>
                <MapFlyTo center={center} /> {/* MapContainer 안에 위치 */}
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ClickHandler onClick={(lat, lon) => setClickPos([lat, lon])} />

                {/* 클릭한 핑 */}
                {clickPos && (
                    <>
                        <Marker position={clickPos} icon={L.icon({ iconUrl: "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png", iconSize: [30, 40] })}>
                            <Popup>🟡 선택된 위치<br />{clickPos[0].toFixed(5)}, {clickPos[1].toFixed(5)}</Popup>
                        </Marker>
                        <Circle center={clickPos} radius={5000} color="red" />
                    </>
                )}

                {/* 대피소 마커들 */}
                {shelters.map((shelter,) => (
                    <Marker key={shelter.name} position={[shelter.lat, shelter.lon]} icon={ L.icon({
                        iconUrl: "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png",
                        iconSize: [20, 30],
                        iconAnchor: [15, 40],
                        popupAnchor: [0, -35],
                    })} >
                        <Popup>
                            <h3>{shelter.name}</h3>
                            <p>{shelter.address}</p>
                            <SaveButton lat={shelter.lat} lon={shelter.lon} description={shelter.name} />
                        </Popup>
                    </Marker>
                ))}
                <Circle center={center} radius={5000} color="blue" />
            </MapContainer>
            <button onClick={fetchShelters} disabled={!clickPos} className="p-2 bg-blue-300 rounded">
                🔍 핑 기준으로 대피소 검색
            </button>
        </div>
    );
};

export default MapWithPing;

