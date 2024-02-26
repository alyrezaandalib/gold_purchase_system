'use client'
import React, {useEffect, useState} from "react";
import {Button, Card, Input} from "@nextui-org/react";
import {TypeAnimation} from "react-type-animation"
import {checkLogin} from "@/services/client/login/check-login";
import {toast} from "react-toastify";
import {hasCookie, setCookie} from 'cookies-next';
import mousaviLogo from "@/public/mousaviGoldLogo/mousavi_logo.svg"
import {useRouter} from "next/navigation";
import Image from "next/image";
import {getAllPoems} from "@/services/client/setting/getAllPoems";
import {EyeFilledIcon, EyeSlashFilledIcon} from "@nextui-org/shared-icons";


export default function LogIn() {
    const router = useRouter()
    const [poem, setPoem] = useState<any>({})

    const [passWordError, setPassWordError] = useState(false)
    const [passWordErrorMsg, setPassWordErrorMsg]: any = useState(null)

    const [userNameError, setUserNameError] = useState(false)
    const [userNameErrorMsg, setUserNameErrorMsg]: any = useState(null)

    const [isDirtyForm, setIsDirtyForm] = useState(true)
    const [showPassword, setShowPassword] = useState(false)


    useEffect(() => {
        const token = hasCookie("TOKEN")
        if (token) {
            router.push("/")
            router.refresh()
        }
        const poemResponse = getAllPoems()
        poemResponse
            .then((res) => {
                const data = res.data
                const randomPoem = Math.floor(Math.random() * data.length);
                if (data.length > 0) {
                    setPoem(data[randomPoem])

                } else {
                    setPoem({text: 'متنی جهت نمایش وجود ندارد'})
                }
            })
            .catch((err) => {
                // console.log(err.message, 'err')
            })
    }, [router]);

    const [loginData, setLoginData] = useState<any>({
        userName: "",
        passWord: "",
    })

    const submitHandler = async (e: any) => {
        if (!isDirtyForm) {

            e.preventDefault()
            try {
                const response = await checkLogin(loginData)
                if (response.status === 200) {
                    setCookie('TOKEN', "lian " + response.data.token);
                    toast.success("خوش آمدید")
                    router.push("/")
                    router.refresh()
                }
            } catch (err: any) {
                toast.error('نام کاربری یا کلمه عبور را بررسی کنید')
            }
        }
    }

    const validateInput = (data: any, inputName: string) => {
        if (inputName == 'user_name') {
            if (data != null && data != '' && data.length > 3) {
                setIsDirtyForm(false)
                setUserNameError(false)
                setUserNameErrorMsg(null)
            } else {
                setIsDirtyForm(true)
                setUserNameError(true)
                setUserNameErrorMsg('لطفا نام کاربری خود را وارد نمایید')
            }
        } else {
            if (data != null && data != '' && data.length > 4) {
                setIsDirtyForm(false)
                setPassWordError(false)
                setPassWordErrorMsg(null)
            } else {
                setIsDirtyForm(true)
                setPassWordError(true)
                setPassWordErrorMsg('لطفا کلمه عبور را به درستی وارد نمایید')
            }
        }
    }


    return (
        <div className={'absolute top-0 left-0 flex w-full flex-1 h-screen flex-grow bg-white z-50'}>
            <div className="p-10 h-full flex flex-col justify-center items-center w-full z-50">
                <Card className="max-w-full w-[350px] h-fit p-5 pl-4 pt-7 overflow-y-scroll">
                    <div className={"w-full flex justify-center items-center mb-5"}>
                        <Image src={mousaviLogo} alt={"mousaviLogo"} width={100}/>
                    </div>
                    <div className={"mb-3"}>
                        <TypeAnimation
                            preRenderFirstString={true}
                            sequence={[
                                500,
                                'سلام',
                                1000,
                                'سامانه خرید و فروش سکه و طلا آبشده',
                            ]}
                            speed={50}
                            style={{fontSize: '1em'}}
                            repeat={Infinity}
                        />
                    </div>
                    <div className={"text-xs leading-5 mb-5 border border-amber-600/40 p-3 rounded-xl"}>
                        {poem.text}
                    </div>
                    <form onSubmit={(e) => submitHandler(e)} className="flex flex-col gap-3">

                        <Input
                            isRequired={true}
                            variant="bordered"
                            label={'نام کاربری'}
                            type={"text"}
                            size={'sm'}
                            isInvalid={userNameError}
                            color={
                                userNameError ? 'danger' : 'secondary'
                            }
                            errorMessage={userNameError && userNameErrorMsg}
                            value={loginData.userName}
                            onChange={(event: any) => {
                                loginData.userName = event.target.value;
                                setLoginData({...loginData});
                            }}
                            onBlur={() => {
                                validateInput(loginData.userName, 'user_name');
                            }}
                            className="w-full"
                        />


                        <Input
                            isRequired={true}
                            variant="bordered"
                            label={'کلمه عبور'}
                            type={showPassword ? 'text' : 'password'}
                            size={'sm'}
                            isInvalid={passWordError}
                            color={
                                passWordError ? 'danger' : 'secondary'
                            }
                            errorMessage={passWordError && passWordErrorMsg}
                            value={loginData.passWord}
                            onChange={(event: any) => {
                                loginData.passWord = event.target.value;
                                setLoginData({...loginData});
                            }}
                            onBlur={() => {
                                validateInput(loginData.passWord, 'passwd');
                            }}
                            className="w-full"
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={() => {
                                    setShowPassword(!showPassword)
                                }}>
                                    {showPassword ? (
                                        <EyeSlashFilledIcon className="text-xl text-default-400 pointer-events-none"/>
                                    ) : (
                                        <EyeFilledIcon className="text-xl text-default-400 pointer-events-none"/>
                                    )}
                                </button>
                            }
                        />

                        <div className="flex gap-2 justify-end">
                            <Button type={"submit"} radius={"sm"} fullWidth color="secondary"
                                    isDisabled={isDirtyForm}>
                                ورود
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
            <div className={'absolute w-full bottom-10 left-0 py-4 text-center'}>
                <p className={'text-sm text-gray-500'}>هرگونه کپی برداری دارای پیگرد قانونی می باشد</p>
            </div>
        </div>
    )
}
