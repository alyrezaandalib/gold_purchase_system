'use client'
import React, {useEffect, useState} from "react";
import {Card, CardBody, CardFooter} from "@nextui-org/react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import pricesIcon from "@/public/logos/clock-up-arrow.svg"
import usersIcon from "@/public/logos/users-alt.svg"
import ChartIcon from "@/public/logos/chart-mixed.svg"
import exchangeIcon from "@/public/logos/exchange-alt.svg"
import CheckedListIcon from "@/public/logos/memo-circle-check.svg"
import calculatorIcon from "@/public/logos/calculator-money.svg"
import checkRole from "@/services/server/check-role";

export default function App() {

    const router = useRouter()

    const [role, setRole] = useState()

    useEffect(() => {
        const get_role = async () => {
            const res = await checkRole()
            setRole(res['role'])
        }
        get_role()
    }, [role]);
    let tabs = [{name: "", icon: "", href: ""}]


    if (role == 'fellow') {
        tabs = [
            {name: "نرخ لحظه‌ای", icon: pricesIcon, href: "/spot-price"},
            {name: "سفارشات باز", icon: exchangeIcon, href: "/orders",},
            {name: "تاریخچه سفارشات", icon: CheckedListIcon, href: "/transactions"},

        ]
    } else {
        tabs = [
            {name: "کاربران", icon: usersIcon, href: "/users"},
            {name: "سفارشات باز", icon: exchangeIcon, href: "/orders",},
            {name: " تاریخچه سفارشات", icon: CheckedListIcon, href: "/transactions"},
            {name: "گروه ها", icon: usersIcon, href: "/groups"},
        ]
    }


    if(role)return (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 p-5 sm:p-10 overflow-y-scroll">
            {tabs.map((item, index) => (
                <Card shadow="sm" key={index} isPressable onClick={() => router.push(item.href)}>
                    <CardBody
                        className="w-full h-[160px] sm:h-[200px] p-5 shadow flex justify-center items-center overflow-visible">
                        <Image
                            width={100}
                            src={item.icon}
                            alt={item.name}
                        />
                    </CardBody>
                    <CardFooter className="text-small sm:font-bold justify-center">
                        <span>{item.name}</span>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
