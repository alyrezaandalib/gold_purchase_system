import TransactionsPage from "@/pages/Transactions";

export default function Transactions(){
    return(
        <div className="px-2 py-10 lg:px-10 h-full flex flex-col justify-center items-center gap-5">
            <div className={"text-xl"}>تاریخچه سفارشات</div>
            <div className={"w-full h-full overflow-y-auto"}>
                <TransactionsPage/>
            </div>
        </div>
    )
}