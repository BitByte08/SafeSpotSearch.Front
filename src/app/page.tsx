"use client"; // 안 넣어도 괜찮지만, 넣는 게 명확성에 도움됨

import {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {fetchRange} from "@/lib/around";
import Location from '@/types/location';

const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
});

export default function Home() {
    const [position, setPosition] = useState<{ lat: number; lon: number } | null>(null);
    const [data, setData] = useState<Location>();

    useEffect(() => {
        // 클라이언트 환경에서만 실행
        if (typeof window !== "undefined" && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                setPosition({lat, lon});

                try {
                    const response = await fetchRange(lat, lon);
                    setData(response);
                    console.log(response);
                } catch (err) {
                    console.error("API 요청 실패", err);
                }
            });
        }
    }, []);

    return (
        <main className="h-full w-full">

            {position && data ? (
                <>
                    <div className="absolute top-0 z-1 bg-amber-100 pr-8 py-4 rounded-lg border-2 ml-4 mt-2">
                        <h1>📍 내 위치 기반 5000m 반경 표시</h1>
                        <p>🧭 위도: {position.lat}</p>
                        <p>🧭 경도: {position.lon}</p>
                        <p>📏 반경: {data.center.radius} m</p>
                    </div>
                    <Map />
                </>
            ) : (
                <p>위치 정보를 가져오는 중입니다...</p>
            )}
        </main>
    );
}
