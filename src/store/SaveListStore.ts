import { create } from 'zustand';
import { Location } from "@/components/SaveList";

interface SaveListState {
    saveList: Location[];
    setSavelist: (newSaveList: Location[]) => void;
}

const useSaveListStore = create<SaveListState>((set) => ({
    saveList: [],
    setSavelist: (newSaveList) =>
        set(() => ({
            saveList: newSaveList,  // ✅ 배열 그대로 대입
        })),
}));

export default useSaveListStore;
