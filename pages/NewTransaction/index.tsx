'use client'
import {useEffect, useState} from "react";
import {Tabs, Tab, Card, Button, AutocompleteItem, Select, SelectItem, Input,} from "@nextui-org/react";
import CustomInput from "@/components/Input";
import {CoinInputs, GoldInputs} from "@/Json/inputs";
import {getAllProducts} from "@/services/client/products/getAllProducts";
import {toast} from "react-toastify";
import {newCoinTransaction} from "@/services/client/NewTransaction/newCoinTransaction";
import {useRouter} from "next/navigation";
import {newGoldTransaction} from "@/services/client/NewTransaction/newGoldTransaction";
import {getAllNotification} from "@/services/client/setting/notification/getAllNotification";
import {userProfitInfo} from "@/services/client/users/userProfitInfo";
import {Label} from "recharts";

type coinType = {
    CoinOptions: string;
    UnitPrice?: string | undefined;
    Amount?: number | undefined;
    Time?: number | undefined;
    TotalPrice: number;
};
type goldType = {
    GoldOptions: string;
    UnitPrice?: string | undefined;
    Amount?: number | undefined;
    Time?: number | undefined;
    TotalPrice: number;
};

export default function NewTransactionPage() {
    const router = useRouter()
    const [coinData, setCoinData] = useState<coinType>({
        CoinOptions: "",
        UnitPrice: undefined,
        Amount: 1,
        TotalPrice: 0,
        Time: undefined
    })
    const [goldData, setGoldData] = useState<goldType>({
        GoldOptions: '',
        UnitPrice: undefined,
        Amount: 1,
        TotalPrice: 0,
        Time: undefined
    })
    const [notification, setNotification] = useState<any[]>([])
    const [UProfitInfo, setUProfitInfo] = useState<any>()
    useEffect(() => {
        const notifResponse = getAllNotification()
        notifResponse
            .then((res) => {
                const data = res.data
                const filteredNotification = data.filter((item: any) => item.enable === true)
                setNotification(filteredNotification)

            })
            .catch((err) => {
                }
            )

        //////////////////////////////////

        const userProfit = userProfitInfo()
        userProfit
            .then((res) => {
                setUProfitInfo(res.data)
            })
            .catch((err) => {
            })

    }, []);

    useEffect(() => {
        if (coinData.UnitPrice !== undefined) {
            // @ts-ignore
            coinData.TotalPrice = coinData.UnitPrice * coinData.Amount
        }
        if (goldData.UnitPrice !== undefined) {
            // @ts-ignore
            goldData.TotalPrice = goldData.UnitPrice * goldData.Amount
        }
        setCoinData({...coinData})
    }, [coinData.Amount, coinData.UnitPrice, goldData.Amount, goldData.UnitPrice]);

    //////////////////////////////////////////

    const [productItems, setProductItems] = useState([{}])
    const [goldItems, setGoldItems] = useState([{}])

    //////////////////////////////////////////

    useEffect(() => {
        const response = getAllProducts()
        response
            .then((res) => {
                setProductItems(res.data['number'])  // Number Type Gold Products
                setGoldItems(res.data['other'])  // Other Types
            })
            .catch((err) => toast.error(err.message))
    }, []);

    //////////////////////////////////////////

    const coinInputs = CoinInputs(coinData, productItems)
    const goldInputs = GoldInputs(goldData, goldItems)

    const [selected, setSelected]: any = useState("coin");
    const submitHandle = (e: any) => {
        e.preventDefault()
        const response = newCoinTransaction(coinData)
        response
            .then((res) => {
                if (res.status === 201) {
                    toast.success("معامله جدید با موفقیت ثبت شد.")
                    router.push("/orders")
                }
            })
            .catch((err) => toast.error(err.message))
    }
    const HandleGoldSubmit = (e: any) => {
        e.preventDefault()
        const response = newGoldTransaction(goldData)
        response
            .then((res) => {
                if (res.status === 201) {
                    toast.success("معامله جدید با موفقیت ثبت شد.")
                    router.push("/orders")
                }
            })
            .catch((err) => toast.error(err.message))
    }
    return (
        <div dir={"rtl"} className="h-full flex flex-col gap-3 justify-center items-center overflow-y-scroll">
            {notification.length > 0 &&
                <div dir={"ltr"}
                     className={"w-[90%] min-h-[120px] bg-white/10 border-yellow-500/50 border-3 text-right shadow-xl md:h-[70%] rounded-2xl p-3 md:p-10 md:w-[20%] md:rounded-r-none flex flex-col gap-3 justify-start items-center md:absolute md:right-0 overflow-y-scroll mt-10 md:mt-0"}>
                    {notification.map((item: any, index: number) =>
                        <div key={index}>
                            <div className={"flex flex-col justify-start items-center gap-3"}>
                                <span className={"font-bold text-lg"}>اطلاعیه های امروز</span>
                                <span>{item.text}</span>
                            </div>
                        </div>
                    )}
                </div>}
            <div className={"w-full h-full flex justify-center items-center"}>
                <Card dir={"rtl"}
                      className="max-w-full w-[340px] h-[460px] p-5 pl-4 pt-7 overflow-y-scroll mb-10 md:mb-0">
                    <Tabs
                        fullWidth
                        size="md"
                        aria-label="Tabs form"
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                    >
                        <Tab key="coin" title="خرید سکه">
                            <form className="flex flex-col gap-3" onSubmit={submitHandle}>
                                <Select
                                    dir={"ltr"}
                                    placeholder={'انتخاب سکه'}
                                    classNames={{
                                        innerWrapper: "w-full",
                                        value: "text-right",
                                        selectorIcon: "left-3"
                                    }}
                                    variant={"bordered"}
                                    color={"secondary"}
                                    size={"sm"}
                                    onChange={(e) => {
                                        coinData.CoinOptions = e.target.value
                                        setCoinData({...coinData})
                                    }}
                                >
                                    {productItems.map((item: any) => {
                                        return (<SelectItem key={item.id}>{item.name}</SelectItem>)
                                    })}

                                </Select>

                                <Input
                                    isRequired={true}
                                    variant="bordered"
                                    label={'نرخ لحظه ای'}
                                    type={'text'}
                                    size={'sm'}
                                    isInvalid={false}
                                    color={
                                        false ? 'danger' : 'secondary'
                                    }
                                    value={Number('123123123').toLocaleString()}
                                    // errorMessage={false && errorMessage}
                                    // value={formData[InputValue.value]}
                                    // onChange={(event: any) => {
                                    //     const {value} = event.target;
                                    //     const NewValue = event.target.value = value.replace(/\D/g, '');
                                    //     formData[InputValue.value] = Number(NewValue);
                                    //     setFormData({...formData});
                                    //     validateInput(NewValue);
                                    // }}
                                    onBlur={() => {
                                        // validateInput(formData[InputValue.value]);
                                    }}
                                    className="w-full"
                                />

                                <Select
                                    dir={"ltr"}
                                    placeholder={'مدت اعتبار'}
                                    classNames={{
                                        innerWrapper: "w-full",
                                        value: "text-right",
                                        selectorIcon: "left-3"
                                    }}
                                    variant={"bordered"}
                                    color={"secondary"}
                                    size={"sm"}
                                    onChange={(e) => {
                                        coinData.Time = Number(e.target.value)
                                        setCoinData({...coinData})
                                    }}
                                >

                                    <SelectItem key={1}>
                                        یک دقیقه
                                    </SelectItem>
                                    <SelectItem key={2}>
                                        دو دقیقه
                                    </SelectItem>
                                    <SelectItem key={3}>
                                        سه دقیقه
                                    </SelectItem>

                                </Select>
                                <div className="flex gap-2 justify-end">
                                    <Button radius={"sm"} fullWidth color="secondary" type={"submit"}
                                            isDisabled={coinInputs.some((input: any) => input.isInvalid)}>
                                        ثبت سفارش
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                        <Tab key="gold" title="خرید طلا وزنی">
                            <form className="flex flex-col gap-3" onSubmit={HandleGoldSubmit}>
                                {goldInputs.map((item: any, index: any) =>
                                    <CustomInput key={index} InputValue={item} formData={goldData}
                                                 setFormData={setGoldData}/>
                                )}

                                <Select
                                    dir={"ltr"}
                                    placeholder={'مدت اعتبار'}
                                    classNames={{
                                        innerWrapper: "w-full",
                                        value: "text-right",
                                        selectorIcon: "left-3"
                                    }}
                                    variant={"bordered"}
                                    color={"secondary"}
                                    size={"sm"}
                                    onChange={(e) => {
                                        goldData.Time = Number(e.target.value)
                                        setGoldData({...goldData})
                                    }}
                                >
                                    <SelectItem key={1}>
                                        یک دقیقه
                                    </SelectItem>
                                    <SelectItem key={2}>
                                        دو دقیقه
                                    </SelectItem>
                                    <SelectItem key={3}>
                                        سه دقیقه
                                    </SelectItem>
                                </Select>
                                <div className="flex gap-2 justify-end">
                                    <Button radius={"sm"} fullWidth color="secondary" type={"submit"}
                                            isDisabled={goldInputs.some((input: any) => input.isInvalid)}>
                                        ثبت سفارش
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                    </Tabs>
                </Card>
            </div>
        </div>
    )
}
