'use client'
import {Input, Switch} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {get_all_tradables} from "@/services/get_all_tradables";
import {router} from "next/client";
import {update_tradable_row} from "@/services/update_tradable_row";

export default function UserDetails({params}: {
    params: {
        user_id: string
    }
}) {

    useEffect(() => {

    }, [])

    const apply_change = (row: any) => {
        update_tradable_row(row).then((res) => {
            if (!res) toast.error('خطا در دریافت کاربران')
            else {
                toast.success('به روزرسانی با موفقیت انجام شد')

            }
        })
    }

    return (
        <div className={'flex flex-col w-full p-2 shadow-sm rounded pt-6 overflow-y-scroll h-full'}>

        </div>
    );

}
