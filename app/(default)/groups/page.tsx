import UserGroupPage from "@/pages/UserGroupPage";

export default function Page(){
    return(
        <div className="px-2 py-10 lg:px-10 h-full flex flex-col justify-center items-center gap-5">
            <div className={"text-xl"}>گروه های کاربران</div>
            <div className={"w-full h-full overflow-y-auto"}>
                <UserGroupPage/>
            </div>
        </div>
    )
}
