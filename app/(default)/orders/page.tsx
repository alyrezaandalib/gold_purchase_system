import OrdersPage from "@/pages/OrdersPage";

export default function Page(){
    return   <div className="py-10 px-4 lg:px-10 h-full flex flex-col justify-center items-center gap-5">
        <div className={"text-xl"}>سفارشات باز</div>
        <div className={"w-full h-full overflow-y-auto"}>
            <OrdersPage/>
        </div>
    </div>
}