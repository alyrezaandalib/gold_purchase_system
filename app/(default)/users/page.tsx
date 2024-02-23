'use client'
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem, useDisclosure
} from "@nextui-org/react";
import {IconPencil, IconTrash} from "@tabler/icons-react";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {getAllGroups} from "@/services/client/usersGroup/getAllGroups";
import {toast} from "react-toastify";
import {create_user} from "@/services/create_user";
import {get_all_users} from "@/services/get_all_users";

export default function Users() {

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [groups, setGroups] = useState<any>()
    const [users, setUsers] = useState<any>([{}])
    const [formData, setFormData] = useState<any>({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        password: '',
        username: '',
        nationalCode: '',
        group: ''
    })

    const handleOpen = () => {
        onOpen();
    }


    useEffect(() => {
        getAllGroups().then((res) => {
            if (!res) toast.error('خطا در دریافت گروه ها')
            else setGroups(res.data)
        })

        get_all_users().then((res) => {
            if (!res) toast.error('خطا در دریافت کاربران')
            else {
                setUsers(res)

            }
        })

    }, [users]);


    const handleSubmit = () => {
        create_user(formData).then((res) => {
            if (!res) toast.error('خطا در ایجاد کاربر جدید')
            else {
                toast.success('کاربر جدید با موفقیت ذخیره شد')
                onClose()
            }
        })
    }


    if (groups) return (

        <>
            <Modal backdrop={'blur'} size={'lg'} isOpen={isOpen} onClose={onClose} closeButton={false} radius={'sm'}
                   hideCloseButton={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader
                                className={"flex flex-col gap-1 justify-center items-center]"}>
                                <div className={'text-md'}>کاربر جدید
                                </div>
                            </ModalHeader>
                            <ModalBody>

                                <div className="flex w-full flex-col justify-center items-center">
                                    <div className={'flex w-full flex-col mb-6'}>
                                        <div className={'flex flex-row justify-between items-center'}>
                                            <div className={'flex flex-col w-[48%]'}>
                                                <label htmlFor={'first_name'}
                                                       className={'text-sm mt-3 mb-2'}>نام*</label>
                                                <Input id={'first_name'} size={'sm'} variant={"bordered"}
                                                       inputMode={'text'} isRequired={true} value={formData.firstName}
                                                       onChange={(e) => {
                                                           formData.firstName = e.target.value
                                                           setFormData({...formData})
                                                       }}/>
                                            </div>
                                            <div className={'flex flex-col w-[48%]'}>
                                                <label htmlFor={'last_name'} className={'text-sm mt-3 mb-2'}>نام
                                                    خانوادگی*</label>
                                                <Input id={'last_name'} size={'sm'} variant={"bordered"}
                                                       inputMode={'text'} value={formData.lastName}
                                                       onChange={(e) => {
                                                           formData.lastName = e.target.value
                                                           setFormData({...formData})
                                                       }}/>
                                            </div>


                                        </div>


                                        <label htmlFor={'username'} className={'text-sm mt-3 mb-2'}>نام کاربری*</label>
                                        <Input id={'username'} size={'sm'} variant={"bordered"} inputMode={'text'}
                                               minLength={4} value={formData.username}
                                               onChange={(e) => {
                                                   formData.username = e.target.value
                                                   setFormData({...formData})
                                               }}/>
                                        <label htmlFor={'password'} className={'text-sm mt-3 mb-2'}>کلمه عبور*</label>
                                        <Input id={'password'} size={'sm'} variant={"bordered"} inputMode={'text'}
                                               type={'password'} minLength={8} value={formData.password}
                                               onChange={(e) => {
                                                   formData.password = e.target.value
                                                   setFormData({...formData})
                                               }}/>


                                        <div className={'flex flex-row justify-between items-center'}>
                                            <div className={'flex flex-col w-[48%]'}>
                                                <label htmlFor={'phone_number'} className={'text-sm mt-3 mb-2'}>شماره
                                                    همراه*</label>
                                                <Input id={'phone_number'} size={'sm'} variant={"bordered"}
                                                       inputMode={'tel'} maxLength={11} value={formData.phoneNumber}
                                                       onChange={(e) => {
                                                           formData.phoneNumber = e.target.value
                                                           setFormData({...formData})
                                                       }}/>
                                            </div>
                                            <div className={'flex flex-col w-[48%]'}>
                                                <label htmlFor={'national_code'} className={'text-sm mt-3 mb-2'}>کد
                                                    ملی*</label>
                                                <Input id={'national_code'} size={'sm'} variant={"bordered"}
                                                       inputMode={'tel'} maxLength={10} value={formData.nationalCode}
                                                       onChange={(e) => {
                                                           formData.nationalCode = e.target.value
                                                           setFormData({...formData})
                                                       }}/>
                                            </div>
                                        </div>


                                        <label htmlFor={'group'} className={'text-sm mt-3 mb-2'}>گروه*</label>
                                        <Select
                                            size={'sm'}
                                            className="w-full"
                                            id={'group'}
                                            variant={"bordered"}
                                            defaultSelectedKeys={['1']}
                                            unselectable={"off"}
                                            value={formData.groups}
                                            onChange={(e) => {
                                                formData.groups = e.target.value
                                                setFormData({...formData})
                                            }}
                                        >
                                            {groups.map((item: any, index:number) => {
                                                return (
                                                    <SelectItem key={index} value={item.id}>
                                                        {item['name']}
                                                    </SelectItem>
                                                )

                                            })}
                                        </Select>
                                    </div>
                                </div>

                            </ModalBody>
                            <ModalFooter className={'flex flex-row justify-center items-center gap-x-5'}>
                                <Button color="secondary" isDisabled={false} onPress={() => {
                                    handleSubmit()
                                }}>
                                    ذخیره
                                </Button>
                                <Button color="danger" variant="bordered" onPress={onClose}>
                                    انصراف
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>


            <div className="px-2 py-10 lg:px-10 h-full flex flex-col justify-center items-center gap-5">
                <div className={"text-xl mb-6"}>مدیریت کاربران</div>
                <div className={'w-full justify-between flex flex-row'}>
                    <div></div>
                    <Button variant={'solid'} color={'secondary'} onClick={(e) => {
                        e.preventDefault()
                        handleOpen()
                    }}>کاربر جدید</Button>
                </div>
                <div className={"w-full h-full overflow-y-auto"}>
                    <div className={'flex flex-col w-full space-y-5'}>

                        {users.map((item: any, index: number) => {
                            return (
                                <div key={index}
                                    className={'bg-white shadow-sm rounded p-3 flex flex-col justify-center items-start'}>
                                    <div className={'flex flex-row justify-between w-full px-4'}>
                                        <div className={'flex flex-col justify-center items-start flex-[2]'}>
                                            <h4 className={'text-xs text-gray-500 mb-2'}>
                                                نام و نام خانوادگی
                                            </h4>
                                            <h3 className={'text-sm'}>
                                                {item.first_name +' '+ item.last_name}
                                            </h3>
                                        </div>

                                        <div className={'flex flex-col justify-center items-start flex-1'}>
                                            <h4 className={'text-xs text-gray-500 mb-2'}>
                                                نام کاربری
                                            </h4>
                                            <h3 className={'text-sm'}>
                                                {item.username}
                                            </h3>
                                        </div>

                                        <div className={'flex flex-col justify-center items-start flex-1'}>
                                            <h4 className={'text-xs text-gray-500 mb-2'}>
                                                شماره همراه
                                            </h4>
                                            <h3 className={'text-sm'}>
                                                {item.phone_number}
                                            </h3>
                                        </div>

                                        <div className={'flex flex-col justify-center items-start flex-1'}>
                                            <h4 className={'text-xs text-gray-500 mb-2'}>
                                                گروه
                                            </h4>
                                            <h3 className={'text-sm'}>
                                                {item.group}
                                            </h3>
                                        </div>

                                        <div className={'flex flex-col justify-center items-start flex-1'}>
                                            <h4 className={'text-xs text-gray-500 mb-2'}>

                                            </h4>
                                            <div className={'text-sm flex flex-row'}>
                                                <Link href={''} className={'mx-8'}>
                                                    <IconPencil size={18}/>
                                                </Link>

                                                <Link href={''}>
                                                    <IconTrash size={18} color={'red'}/>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </>
    )
}
