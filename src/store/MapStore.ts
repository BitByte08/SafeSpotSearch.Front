// stores/useMapStore.ts
import { create } from 'zustand';

interface MapState {
    center: [number, number]; // [latitude, longitude]
    setCenter: (newCenter: [number, number]) => void;
}

const useMapStore = create<MapState>((set) => ({
    center: [0,0], // 초기값 (예시)
    setCenter: (newCenter) => set({ center: newCenter }),
}));

export default useMapStore;
