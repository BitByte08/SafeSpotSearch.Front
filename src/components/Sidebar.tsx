import SaveList from "@/components/SaveList";
import Link from "next/link";

const Sidebar = () => {
    return (
        <aside className="w-100 h-full max-h-screen bg-amber-100 flex flex-col border-r-2 border-gray-950 py-10">
            <Link href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`} className="px-8 py-4 mx-2 my-1 font-bold text-xl hover:bg-amber-300 transition rounded-2xl">로그인</Link>
            <Link href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/register`} className="px-8 py-4 mx-2 my-1 font-bold text-xl hover:bg-amber-300 transition rounded-2xl">회원가입</Link>
            <Link href={`https://github.com/BitByte08/SafeSpotSearch.Front`} className="px-8 py-4 mx-2 my-1 font-bold text-xl hover:bg-amber-300 transition rounded-2xl">Github Repository</Link>
            <SaveList />
        </aside>
    )
}
export default Sidebar;