'use client'
import React from "react";
import {Card, CardBody, CardFooter} from "@nextui-org/react";
import Image from "next/image";
import {useRouter} from "next/navigation";

import textIcon from "@/public/logos/square-quote.svg"
import cowBellIcon from "@/public/logos/cowbell.svg"
import featuresIcon from "@/public/logos/features.svg"


export default function SettingPage() {
    const router = useRouter()
    const tabs = [
        // {name: "تنظیمات سفارش", icon:featuresIcon , href: "#"},
        {name: "تنظیمات شعر", icon:textIcon , href: "/settings/poem"},
        {name: "تنظیمات اعلانیه", icon:cowBellIcon , href: "/settings/notifications"},
    ]

    return (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 p-5 sm:p-10 overflow-y-scroll">
            {tabs.map((item, index) => (
                <Card shadow="sm" key={index} isPressable onClick={() => {
                    router.push(item.href)
                }}>
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
