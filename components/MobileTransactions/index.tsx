import React, {useEffect, useState} from "react";
import {Accordion, AccordionItem, Chip, Input} from "@nextui-org/react";
import {SearchIcon} from "@/public/SearchIcon";

export default function MobileTransactions({transactions, statusColorMap}: any) {
    const [filterValue, setFilterValue]: any = useState("")
    const [findValues,setFindValues] : any = useState()
    const transActions = findValues ? findValues  : transactions

    useEffect(() => {
        const filteredUsers = transactions.filter((transaction: any) =>
            transaction.name.toLowerCase().includes(filterValue),
        );
        setFindValues(filteredUsers)
    } , [filterValue, transactions])

    return (
        <div className={"flex flex-col gap-3 lg:hidden"}>
            <Input
                isClearable
                size={"sm"}
                radius={"lg"}
                variant={"bordered"}
                color={"secondary"}
                className={"w-full xl:w-[30%] text-default-800"}
                placeholder="جستجو"
                startContent={<SearchIcon/>}
                value={filterValue}
                onClear={() => setFilterValue("")}
                onChange={(e:any) => setFilterValue(e.target.value)}
            />
            <Accordion variant="bordered">
                {transActions.map((transaction: any) =>
                    <AccordionItem key={transaction.id} aria-label={transaction.name} title={
                        <>
                            <div className={"flex items-center justify-start gap-1"}>
                                <div className={'text-sm'}>{transaction.name}</div>
                                <Chip className="capitalize" color={statusColorMap[transaction.status]} size="sm"
                                      variant="flat">
                                    {transaction.status}
                                </Chip>
                            </div>
                            <div className={`text-sm }`}>{transaction.price}</div>
                            <div className={'text-sm'}>1402:23:12</div>
                        </>
                    }>
                        <div className={"gap-1 flex flex-col"}>
                            <div className={"text-sm flex gap-1"}>
                                <span>کد رهگیری:</span>
                                <span></span>
                            </div>
                            <div className={"text-sm flex gap-1"}>
                                <span>علت رد شدن:</span>
                                <span></span>
                            </div>
                        </div>
                    </AccordionItem>)}
            </Accordion>
        </div>
    )
}