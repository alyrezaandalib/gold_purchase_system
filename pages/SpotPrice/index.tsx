'use client'
import {Button, Card, CardBody, Input, Select, SelectItem, Spinner} from "@nextui-org/react";
import {useEffect, useState} from "react";
import getCurrentPrices from "@/services/server/get-current-prices";
import checkRole from "@/services/server/check-role";
import {toast} from "react-toastify";
import {IconSquareRoundedArrowUp, IconSquareRoundedArrowDown} from "@tabler/icons-react";
import {Tooltip} from "@nextui-org/react";
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import Link from "next/link";
import {baseURL} from "@/meta/_baseURL";
import {getCookie} from "cookies-next";


export default function SpotPricePage() {
    const [prices, setPrices]: any = useState()
    const [isDirty, setIsDirty] = useState(true)
    const [loading, setLoading]: any = useState(true)
    const [role, setRole] = useState()
    const [modalTitle, setModalTitle] = useState('خرید')
    const [selected_status, set_selected_status] = useState('')
    const [product, set_product] = useState(0)
    const [selected_product_name, set_selected_product_name] = useState('')
    const [selected_phone_number] = useState('09901516063')
    const [selected_product_unit, set_selected_product_unit] = useState('')
    const [selected_price, set_selected_price] = useState<any>()
    const [selected_time, set_selected_time] = useState<any>(1)
    const [selected_product_amount, set_selected_product_amount] = useState<any>()

    const {isOpen, onOpen, onClose} = useDisclosure();

    const handleOpen = () => {
        onOpen();
    }

    useEffect(() => {
        const get_role = async () => {
            const res = await checkRole()
            setRole(res['role'])
        }
        get_role()
    }, []);


    useEffect(() => {
        getCurrentPrices().then((res) => {
            if (!res) toast.error('خطا در دریافت اطلاعات')
            else {
                setLoading(false)
                setPrices(res)
            }
        })
    }, []);

    const moment = require('jalali-moment');

    const validate_form = (value:string) => {
        let error = true

        if (value != null && value != '') error = false

        if (!error) setIsDirty(false)
        if (error) setIsDirty(true)
    }
    const handleSubmitClick = async () => {
        // console.log(selected_time)
        const res = await fetch(`${baseURL}/deal/opens/`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `${getCookie('TOKEN') as string}`
                },
                body:JSON.stringify({
                    "amount": Number(selected_product_amount),
                    "price": Number(selected_price),
                    "expire_time": Number(selected_time),
                    "product": Number(product),
                    "action": selected_status
                })
            }
        )
        const responseJson = await res.json()
        if(res.ok)
            toast.success("معامله با موفقیت ثبت شد.");
        else
            toast.error("حافظه موقت خود را پاک کنید.");
    }

    if (loading) return (
        <div className={`flex justify-center items-center w-full h-full`}>
            <Spinner size={"lg"} color="secondary"/>
        </div>
    )

    if (prices) return (
        <>
            <Modal backdrop={'blur'} size={'sm'} isOpen={isOpen} onClose={onClose} closeButton={false} radius={'sm'}
                   hideCloseButton={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader
                                className={modalTitle == 'فروش' ? "flex flex-col gap-1 justify-center items-center border-t-4 border-[red]" : "flex flex-col gap-1 justify-center items-center border-t-4 border-[teal]"}>
                                <div className={'text-xs'}>ثبت
                                    سفارش ({modalTitle})
                                </div>
                                <div>{selected_product_name}</div>
                                <Link href={`tel:${selected_phone_number}`} className={"text-[15px] mt-2"}>{selected_phone_number}</Link>
                            </ModalHeader>
                            <ModalBody>

                                <div className="flex w-full flex-col justify-center items-center">
                                    <div className={'flex w-full flex-col mb-6'}>
                                        <label htmlFor={'price'} className={'text-sm mt-3 mb-2'}>نرخ سفارش</label>
                                        <Input id={'price'} size={'sm'} variant={"bordered"} type={'number'}
                                               defaultValue={selected_price}
                                               onChange={(event) => {
                                                   set_selected_price(event.target.value)
                                                   validate_form(event.target.value)
                                               }}
                                        />
                                        <label htmlFor={'amount'} className={'text-sm mt-3 mb-2'}>مقدار
                                            ({selected_product_unit == 'number' ? 'عدد' : 'گرم'})</label>
                                        <Input id={'amount'} size={'sm'} variant={"bordered"}
                                               value={selected_product_amount} onChange={(event) => {
                                            set_selected_product_amount(event.target.value)
                                            validate_form(event.target.value)
                                        }}
                                               type={selected_product_unit == 'number' ? 'number' : 'number'}/>
                                        <label htmlFor={'time'} className={'text-sm mt-3 mb-2'}>مدت اعتبار</label>
                                        <Select
                                            size={'sm'}
                                            className="w-full"
                                            id={'time'}
                                            variant={"bordered"}
                                            // onSelect={set_selected_time}
                                            onChange={(event) => {
                                                set_selected_time(event.target.value)
                                                validate_form(event.target.value)}}
                                            defaultSelectedKeys={['1']}
                                        >
                                            <SelectItem key={1} value={1}>
                                                یک دقیقه
                                            </SelectItem>
                                            <SelectItem key={2} value={2}>
                                                دو دقیقه
                                            </SelectItem>
                                            <SelectItem key={3} value={3}>
                                                سه دقیقه
                                            </SelectItem>

                                        </Select>

                                    </div>
                                </div>

                            </ModalBody>
                            <ModalFooter className={'flex flex-row justify-center items-center gap-x-5'}>
                                <Button color="secondary" isDisabled={isDirty} onPress={() => {
                                    handleSubmitClick()
                                    onClose()
                                }}>
                                    ثبت سفارش
                                </Button>
                                <Button color="danger" variant="bordered" onPress={onClose}>
                                    انصراف
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>


            <div className="gap-x-4 gap-y-3 grid grid-cols-1 lg:grid-cols-2 my-10 mx-4">
                {prices.map((item: any, index: any) => (
                    <Card shadow="sm" key={index}>
                        <CardBody className="flex flex-row justify-between items-center">
                            <div className={'flex flex-col justify-start items-center space-y-2 flex-[1]'}>
                                <h5 className={'text-xs text-gray-400'}>نام</h5>
                                <div className={'text-sm font-bold'}>{item['name']}</div>
                            </div>

                            <div className={'flex flex-col justify-start items-center space-y-2 flex-[1]'}>
                                <h5 className={'text-xs text-gray-400'}>به روز شده در</h5>
                                <div className={'text-sm'}>{moment(new Date(item['updated_at'])).format('HH:mm')}</div>
                            </div>

                            <div className={'flex flex-col justify-start items-center space-y-2 flex-1'}>
                                <h5 className={'text-xs text-gray-400'}>قیمت خرید</h5>
                                <div className={'text-sm'}>{(Number(item['buy_price']) / 10).toLocaleString()}</div>
                            </div>


                            <div className={'flex flex-col justify-start items-center space-y-2 flex-1'}>
                                <h5 className={'text-xs text-gray-400'}>قیمت فروش</h5>
                                <div className={'text-sm'}>{(Number(item['sell_price']) / 10).toLocaleString()}</div>
                            </div>
                            {
                                role == 'admin' ? (
                                    <></>
                                ) : (
                                    <div className={'flex flex-col justify-start items-center space-y-2 flex-1'}>
                                        <h5 className={'text-xs text-gray-400'}>عملیات</h5>
                                        <div className={'flex flex-row gap-x-3'}>
                                            <Tooltip content="خرید">
                                                <div className={'cursor-pointer'} onClick={(e) => {
                                                    e.preventDefault()
                                                    setModalTitle('خرید')
                                                    set_selected_status("buy")
                                                    set_selected_product_name(item.name)
                                                    set_selected_price(Number(item['buy_price']))
                                                    set_product(item.id)
                                                    set_selected_product_unit(item.unit)
                                                    handleOpen()
                                                }}>
                                                    <IconSquareRoundedArrowDown color={'teal'}/>
                                                </div>
                                            </Tooltip>
                                            <Tooltip content="فروش">

                                                <div className={'cursor-pointer'} onClick={(e) => {
                                                    e.preventDefault()
                                                    setModalTitle('فروش')
                                                    set_selected_status("sell")
                                                    set_selected_product_name(item.name)
                                                    set_selected_price(item['sell_price'])
                                                    set_product(item.id)
                                                    set_selected_product_unit(item.unit)
                                                    handleOpen()
                                                }}>
                                                    <IconSquareRoundedArrowUp color={'red'}/>
                                                </div>
                                            </Tooltip>
                                        </div>
                                    </div>
                                )
                            }

                        </CardBody>
                    </Card>
                ))}
            </div>
        </>
    )
}
