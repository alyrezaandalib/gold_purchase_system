'use client'
import {Input, Switch} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {get_all_tradables} from "@/services/get_all_tradables";
import {router} from "next/client";
import {update_tradable_row} from "@/services/update_tradable_row";
import {log} from "util";

export default function GroupDetails({params}: {
    params: {
        group_id: string
    }
}) {

    const [tradables, setTradables] = useState<any>()
    const [change, setChange] = useState(false)

    useEffect(() => {
        get_all_tradables(params.group_id).then((res) => {
            if (!res) toast.error('خطا در دریافت موارد قابل معامله')
            else setTradables(res)
        })
    }, [change]);

    const apply_change = (row: any) => {
        update_tradable_row(row).then((res) => {
            if (!res) toast.error('خطا در بروزرسانی مورد قابل معامله')
            else {
                toast.success('به روزرسانی با موفقیت انجام شد')
                setChange(!change)
            }
        })
    }
    let tradables_clone: any
    if (tradables) tradables_clone = tradables


    if (tradables) return (
        <div className={'flex flex-col w-full p-2 shadow-sm rounded pt-6 overflow-y-scroll h-full'}>
            <div className={'flex flex-col justify-center items-start w-full p-8'}>
                <h3 className={'mb-10 flex justify-center items-center text-sm text-gray-500'}>نام گروه:
                    <div className={'mr-4 text-medium text-gray-950'}>{String(tradables[0]['group']['name'])}</div>
                </h3>
                <div
                    className={'flex flex-row justify-between items-center w-full border-b-1 border-[#999] pb-3'}>
                    <div className={'flex flex-col justify-center items-start flex-[2] space-y-2'}>
                        <div className={'text-xs text-gray-400'}>
                            مورد معامله
                        </div>
                    </div>
                    <div className={'flex flex-col justify-center items-start flex-[1] space-y-2'}>
                        <div className={'text-xs text-gray-400'}>
                            سود فروش
                        </div>
                    </div>
                    <div className={'flex flex-col justify-center items-start flex-[1] space-y-2'}>
                        <div className={'text-xs text-gray-400'}>
                            سود خرید
                        </div>
                    </div>
                    <div className={'flex flex-col justify-center items-end flex-[1] space-y-2'}>
                        <div className={'text-xs text-gray-400'}>
                            وضعیت
                        </div>
                    </div>
                </div>

                {
                    tradables.map((item: any, index: number) => {
                        return (
                            <div key={index}
                                className={'flex flex-row justify-between items-center w-full p-2 border-b border-[#ebebeb]'}>
                                <div className={'flex flex-col justify-center items-start flex-[2] space-y-2'}>
                                    <h6 className={'text-sm'}>
                                        {item['product']['name']}
                                    </h6>
                                </div>
                                <div className={'flex flex-col justify-center items-start flex-[1] space-y-2'}>
                                    <div className={'text-xs text-gray-400'}>
                                        <Input size={'sm'} variant={'bordered'} type={'number'}
                                               defaultValue={String(item['sale_profit'])}
                                               onChange={(event) => {
                                                   tradables_clone[index]['sale_profit'] = Number(event.target.value) * 10
                                               }}
                                               onBlur={(event) => {
                                                   apply_change(tradables_clone[index])
                                               }}
                                        ></Input>
                                    </div>
                                </div>
                                <div className={'flex flex-col justify-center items-start flex-[1] space-y-2'}>
                                    <div className={'text-xs text-gray-400'}>
                                        <Input size={'sm'} variant={'bordered'} type={'number'}
                                               defaultValue={String(item['buy_profit'])}
                                               onChange={(event) => {
                                                   tradables_clone[index]['buy_profit'] = Number(event.target.value) * 10
                                               }}
                                               onBlur={(event) => {
                                                   apply_change(tradables_clone[index])
                                               }}
                                        ></Input>
                                    </div>
                                </div>
                                <div className={'flex flex-col justify-center items-end flex-[1] space-y-2'}>
                                    <div className={'text-xs text-gray-400'} dir={'ltr'}>
                                        <Switch size={'md'} color="success" onChange={() => {
                                            tradables[index]['enable'] = !Boolean(tradables[index]['enable'])
                                            apply_change(tradables[index])
                                        }}
                                                defaultSelected={Boolean(item['enable'])}></Switch>
                                    </div>
                                </div>
                            </div>
                        )
                    })

                }

            </div>
        </div>
    );

}
