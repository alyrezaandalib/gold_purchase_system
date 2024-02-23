import NotificationsPage from "@/pages/NotificationsPage";

export default function Page() {
    return (
        <div className="px-2 py-10 lg:px-10 h-full flex flex-col justify-center items-center gap-5">
            <div className={"text-xl"}>تنظیمات اطلاعیه</div>
            <div className={"w-full h-full overflow-y-auto"}>
                <NotificationsPage/>
            </div>
        </div>
    )
}