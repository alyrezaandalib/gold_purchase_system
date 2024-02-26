'use client'
import NotFound from "@/app/not-found";
import GoldChart from "@/components/Charts/goldChart";
import {useState} from "react";
import GlobalCurrency from "@/components/Charts/GlobalCurrency";
import {Button} from "@nextui-org/react";
import globalCurrency from "@/components/Charts/GlobalCurrency";
import {globalCurrencyChart} from "@/services/client/charts/GlobalCurrency/globalCurrencyChart";
import {toast} from "react-toastify";

const data = [
    {
        name: 'Page A',
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        pv: 11200,
        amt: 2290,
    },
    {
        name: 'Page D',
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        pv: 4300,
        amt: 2100,
    },
];

const tab = [
    {tabName: "روز", key: "day"},
    {tabName: "هفته", key: "week"},
    {tabName: "ماه", key: "month"},
    {tabName: "سال", key: "year"},
]

export default function Chart({params}: { params: { chart: string } }) {

    const [selectedTab, setSelectedTab] = useState(data)
    const [selectedTab2, setSelectedTab2] = useState(data)

    const onSelectionChange = (key: any) => {
        key === "day" ? setSelectedTab(data) : key === "week" ? setSelectedTab(data) : key === "month" ? setSelectedTab(data) : setSelectedTab(data)
    }
    const onSelectionChange2 = (key: any) => {
        key === "day" ? setSelectedTab2(data) : key === "week" ? setSelectedTab2(data) : key === "month" ? setSelectedTab2(data) : setSelectedTab2(data)
    }

    if (params.chart === "gold-chart") {
        return (

            <div
                className={"flex flex-col justify-center items-center w-full h-full py-32 xl:py-10 xl:p-10 bg-primary overflow-y-auto"}>
                <div className={"text-xl mb-3"}>نمودار طلا</div>
                <GoldChart onSelectionChange={onSelectionChange} selectedTab={selectedTab} tab={tab}/>
            </div>
        );
    } else if (params.chart === "dollar-chart") {
        return (
            <div
                className={"flex flex-col justify-center items-center w-full h-full py-32 xl:py-10 xl:p-10 bg-primary overflow-y-auto"}>
                <div className={"text-xl mb-3"}>نمودار دلار</div>
                <GlobalCurrency onSelectionChange={onSelectionChange2} selectedTab={selectedTab2} tab={tab}/>
            </div>
        );
    } else {
        return <NotFound/>;
    }
}
