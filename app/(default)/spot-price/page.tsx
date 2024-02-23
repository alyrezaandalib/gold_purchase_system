import SpotPricePage from "@/pages/SpotPrice";

export default function SpotPrice() {
    return (
        <div className="py-10 px-4 lg:px-10 h-full flex flex-col justify-center items-center gap-5">
            <div className={"text-xl"}>نرخ لحظه ای طلا</div>
            <div className={"w-full h-full overflow-y-auto"}>
                <SpotPricePage/>
            </div>
        </div>
    )
}
