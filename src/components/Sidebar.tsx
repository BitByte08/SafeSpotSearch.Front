import SaveList from "@/components/SaveList";
import Link from "next/link";

const Sidebar = () => {
    return (
        <aside className="w-100 h-full bg-amber-100 flex flex-col">
            <Link href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`} className="px-8 py-4">login</Link>
            <Link href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/register`} className="px-8 py-4">register</Link>
            <SaveList />
        </aside>
    )
}
export default Sidebar;