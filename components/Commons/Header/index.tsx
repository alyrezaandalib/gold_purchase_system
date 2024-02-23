'use client'
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";
import {useEffect, useState} from "react";
import ProfileIcon from "@/public/user";
import CustomInput from "@/components/Input";
import {ProfileInputs} from "@/Json/inputs";
import Image from 'next/image'
import mousaviLogo from "@/public/mousaviGoldLogo/mousavi_logo.svg"
import Link from "next/link";
import {deleteCookie} from "cookies-next";
import {usePathname, useRouter} from "next/navigation";
import {getUserInformation} from "@/services/client/miniProfile/getUserInformation";
import {toast} from "react-toastify";
import checkRole from "@/services/server/check-role";
import {IconPhone, IconPhoneCall, IconPhoneFilled} from "@tabler/icons-react";

export default function Header() {
    const pathName = usePathname()
    const router = useRouter()
    const [userInfo, setUserInfo] = useState<any>({})
    const [isOpenExitModal, setOpenExitModal] = useState(false);
    const [isOpenProfileModal, setOpenProfileModal] = useState(false);
    const [formData, setFormData] = useState<any>({
        FirstName: "",
        LastName: "",
        PhoneNumber: "",
    })

    const [role, setRole] = useState()

    useEffect(() => {
        if (pathName !== '/login') {
            const get_role = async () => {
                const res = await checkRole()
                setRole(res['role'])
            }
            get_role()
        }
    }, []);

    useEffect(() => {
        if (pathName !== '/login') {
            const response = getUserInformation()
            response
                .then((res) => {
                    const data = res.data
                    setUserInfo(data)
                    setFormData({
                        FirstName: data.first_name,
                        LastName: data.last_name,
                        PhoneNumber: data.phone_number,
                    })
                })
                .catch((err) => toast.error(err.message))
        }
    }, [pathName]);

    const inputs = ProfileInputs(formData)
    const route = useRouter()

    const submitHandler = (e: any) => {
        e.preventDefault()
        const response = ""
    }

    if (role) return (
        <div className={"w-full bg-white h-fit py-3 px-7 fixed shadow-lg flex justify-between items-center z-50"}>

            <div className={'flex flex-row justify-between items-center'}>
                <Link href={'/'}>
                    <Image src={mousaviLogo} alt={"mousavi logo"}
                           width={50}
                           blurDataURL="data:..."
                           placeholder="blur"
                    />
                </Link>
            </div>

            <div className={'flex flex-row justify-center items-center gap-12'}>

                <Dropdown>
                    <DropdownTrigger>
                        <IconPhoneCall stroke={1.5}/>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="شماره تماس ها">
                        <DropdownItem key="1">
                            <div className={'flex flex-col justify-between items-center'}>
                                <p className={'text-xs text-gray-600'}>معامله و حواله طلا</p>

                                <Link href={'tel:09901516063'}>09901516063</Link>
                            </div>
                        </DropdownItem>
                        <DropdownItem key="2">
                            <div className={'flex flex-col justify-between items-center'}>
                                <p className={'text-xs text-gray-600'}>حسابداری</p>

                                <Link href={'tel:09901516063'}>09911516063</Link>
                            </div>
                        </DropdownItem>
                        <DropdownItem key="3">
                            <div className={'flex flex-col justify-between items-center'}>
                                <p className={'text-xs text-gray-600'}>دفتر ۱</p>

                                <Link href={'tel:09901516063'}>03536276161</Link>
                            </div>
                        </DropdownItem>
                        <DropdownItem key="4">
                            <div className={'flex flex-col justify-between items-center'}>
                                <p className={'text-xs text-gray-600'}>دفتر ۲</p>

                                <Link href={'tel:09901516063'}>03536276162</Link>
                            </div>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>


                <Dropdown>
                    <DropdownTrigger>
                        <div className={"flex items-center gap-2 text-xs lg:text-[15px]"}>

                            <div className={"flex flex-col justify-end items-end"}>
                                <span
                                    className={"font-bold mb-1.5 text-md"}>{userInfo.last_name}</span>
                                <span className={'font-light text-xs'}>{userInfo.phone_number}</span>
                            </div>

                            <Avatar
                                className={"w-8 h-8"}
                                isBordered
                                icon={<ProfileIcon/>}
                                classNames={{
                                    base: "bg-white",
                                }}
                            />
                        </div>
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem key="new" onClick={() => setOpenProfileModal(!isOpenProfileModal)}>ویرایش
                            پروفایل</DropdownItem>
                        <DropdownItem key="delete" className="text-danger" color="danger"
                                      onClick={() => setOpenExitModal(!isOpenExitModal)}>
                            خروج از حساب
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>


            {/*// *** loge out modal ////////////////////////////*/}
            <Modal isOpen={isOpenProfileModal} onOpenChange={setOpenProfileModal}>
                <ModalContent className={'flex items-center justify-center pt-3'}>
                    {(onClose) => (
                        <form className={"w-full"} onSubmit={submitHandler}>
                            <ModalHeader>ویرایش پروفایل</ModalHeader>
                            <ModalBody className={"w-full"}>
                                {inputs.map((item: any, index: any) =>
                                    <CustomInput key={index} InputValue={item} formData={formData}
                                                 setFormData={setFormData}/>
                                )}
                            </ModalBody>
                            <ModalFooter className={"w-full"}>
                                <Button color="secondary" radius={"sm"} onPress={onClose} fullWidth
                                        isDisabled={inputs.some((input: any) => input.isInvalid)} type={"submit"}>
                                    اعمال تغییرات
                                </Button>
                                <Button color="danger" radius={"sm"} variant="flat" onPress={onClose} fullWidth>
                                    لغو
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>

            {/*// *** loge out modal ////////////////////////////*/}
            <Modal isOpen={isOpenExitModal} onOpenChange={setOpenExitModal}>
                <ModalContent className={'flex items-center justify-center pt-3'}>
                    {(onClose) => (
                        <>
                            <ModalHeader>خروج از حساب کاربری</ModalHeader>
                            <ModalBody>
                                <p>آیا میخواهید از حساب خود خارج شوید؟</p>
                            </ModalBody>
                            <ModalFooter className={"w-full"}>
                                <Button color="secondary" radius={"sm"} onPress={() => {
                                    onClose()
                                    deleteCookie('TOKEN');
                                    route.push('/login');
                                }} fullWidth>
                                    خروج
                                </Button>
                                <Button color="danger" radius={"sm"} variant="light" onPress={onClose} fullWidth>
                                    لغو
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>

    )
}
