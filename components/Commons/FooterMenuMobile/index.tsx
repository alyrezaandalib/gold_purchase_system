"use client";
import Link from "next/link";
import {useEffect, useState} from "react";
import Dashboard from "@/public/dashboard";
import {usePathname} from "next/navigation";
import SettingIcon from "@/public/SettingIcon";
import TransactionIcon from "@/public/TransactionsIcon";
import UsersIcon from "@/public/userIcon";
import checkRole from "@/services/server/check-role";
import {IconTimeline} from "@tabler/icons-react";


export default function FooterMenuMobile() {
    const [active, setActive] = useState(0);
    const pathName = usePathname();
    const [role, setRole] = useState<string>("admin")
    const [menu, setMenu] = useState([{id: 2, name: '', icon: <></>, dis: '', href: ''}])


    const get_role = async () => {
        return await checkRole()
    }


    useEffect(() => {

        if (pathName != '/login') {
            get_role().then((res) => {
                if (res){
                    setRole(res['role'])
                }
            })


            if (role == 'fellow') {
                setMenu([
                    {
                        id: 2,
                        name: "سفارشات باز",
                        icon: <TransactionIcon className={"text-white/80"}/>,
                        dis: "translate-x-[168px]",
                        href: "/orders",
                    },
                    {
                        id: 1,
                        name: "نرخ لحظه ای",
                        icon: <IconTimeline className={"text-white/80"}/>,
                        dis: "translate-x-[88px]",
                        href: "/spot-price",
                    },


                    {
                        id: 0,
                        name: "داشبورد",
                        icon: <Dashboard className={"text-white/80"}/>,
                        dis: "translate-x-2",
                        href: "/",
                    },
                ])

            } else if (role == "admin") {
                setMenu([
                    {
                        id: 2,
                        name: "تنظیمات",
                        icon: <SettingIcon className={"text-white/80"}/>,
                        dis: "translate-x-[168px]",
                        href: "/settings",
                    },
                    {
                        id: 1,
                        name: "گروه ها",
                        icon: <UsersIcon className={"text-white/80"}/>,
                        dis: "translate-x-[88px]",
                        href: "/groups",
                    },
                    {
                        id: 0,
                        name: "داشبورد",
                        icon: <Dashboard className={"text-white/80"}/>,
                        dis: "translate-x-2",
                        href: "/",
                    },
                ])
            }


            const filteredItem = menu.find((item) => pathName === item.href);
            if (filteredItem) {
                setActive(filteredItem.id);
            }

        }
    }, [pathName, role]);


    if (role) return (
        <div style={{boxShadow: "5px 0 25px -5px rgb(0 0 0 / 0.3)", zIndex: 99}}
             className={"flex bg-[#222] h-[9rem] absolute bottom-[-75px] w-full justify-center px-6"}>
            <ul className={"flex justify-between relative"}>
        <span
            style={{
                borderRadius: "50%",
                border: "4px solid rgba(0,0,0,0.3)",
                boxShadow: " 0px 25px 100px -12px",
            }}
            className={`bg-yellow-500 duration-300 ${menu[active]?.dis} h-16 w-16 absolute -top-6 shadow-accent z-50`}
        >
        </span>
                {menu.map((item: any, index) => (
                    <Link href={item.href} onClick={() => setActive(item.id)} key={index} className={"w-20"}>
                        <li className={"flex flex-col justify-center items-center pt-6"}>
                            <span
                                className={`text-xl cursor-pointer duration-0 z-50 text-red-50" ${item.id === active && "-mt-6"}`}>{item.icon}</span>
                            <span
                                className={`${active === item.id ? "translate-y-4 mt-1 duration-0 opacity-100 text-primary text-[13px]" : "opacity-0 translate-y-10"}`}>{item.name}</span>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}
