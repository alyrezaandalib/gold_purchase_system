import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Tabs} from "@nextui-org/react";
import CustomInput from "@/components/Input";
import React, {useState} from "react";
import {createUserByPhoneNumber} from "@/services/client/users/createUserByPhoneNumber";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import {toast} from "react-toastify";
import {SignUpInputs} from "@/Json/inputs";
import {addNewUser} from "@/services/client/users/addNewUser";
import {router} from "next/client";
import {useRouter} from "next/navigation";

export default function AddNewUserM({addNewUserM, setAddNewUserM, groupId, changes, setChanges}: any) {
    const router = useRouter()
    const [selected, setSelected]: any = useState("byPhoneNumber");
    const [addNewUserData, setAddNewUserData] = useState<any>({
        PhoneNumber: "",
        group_id: groupId
    })
    const [signupNewUser, setSignupNewUser] = useState({
        FName: "",
        LName: "",
        PhoneNumber: "",
        NCode: "",
        PostalCode: "",
        Address: "",
        Password: "",
        username: "",
        group_id: groupId
    })
    const newUserSignup = SignUpInputs(signupNewUser)
    const newUserInputs = [
        {
            label: "شماره تماس",
            isRequired: true,
            value: "PhoneNumber",
            type: "text",
            isInvalid: addNewUserData.PhoneNumber.trim() === "" || !addNewUserData.PhoneNumber.match(/^(\+98|0)?9\d{9}$/),
            validationRegex: /^(\+98|0)?9\d{9}$/,
            message: "لطفا شماره تماس خود را به درستی وارد کنید"
        }
    ]

    const submitHandler = async (e: any) => {
        e.preventDefault()
        try {
            const response = await createUserByPhoneNumber(addNewUserData)
            toast.success("لینک ثبت نام با موفقیت ارسال شد.(مدت اعتبار: 1 ساعت)")
            setAddNewUserM(!addNewUserM)
            setChanges(!changes)
        } catch (err: any) {
            toast.error(err.message)
        }
    }

    const SubmitNewUser = (e: any) => {
        e.preventDefault()
        const response = addNewUser(signupNewUser)
        response.then((res) => {
            toast.success("کاربر با موفقیت ثبت شد.")
            setAddNewUserM(!addNewUserM)
            setChanges(!changes)
        }).catch((err) => {
            toast.error(err.message)
        })
    }

    return (
        <Modal isOpen={addNewUserM} onOpenChange={setAddNewUserM}>
            <ModalContent className={'flex items-center justify-center pt-8'}>
                {(onClose) => (
                    <>
                        <ModalHeader>افزودن کاربر</ModalHeader>
                        <Tabs
                            fullWidth
                            className={"px-2"}
                            size="md"
                            aria-label="Tabs form"
                            selectedKey={selected}
                            onSelectionChange={setSelected}
                        >
                            <Tab key="byPhoneNumber" title="ارسال لینک ثبت نام" className={"w-full"}>
                                <form className={"w-full"} onSubmit={submitHandler}>
                                    <ModalBody className={"w-full overflow-y-scroll max-h-[61vh]"}>
                                        <div className={"text-sm"}>توجه!!</div>
                                        <div className={"text-sm"}>برای افزودن کاربر جدید فقط شماره تماس شخص مورد نظر
                                            کافیست
                                        </div>
                                        {newUserInputs.map((item: any, index: any) =>
                                            <CustomInput key={index} InputValue={item} formData={addNewUserData}
                                                         setFormData={setAddNewUserData}/>
                                        )}
                                    </ModalBody>
                                    <ModalFooter className={"w-full"}>
                                        <Button color="danger" radius={"sm"} variant="flat" onPress={onClose} fullWidth>
                                            لغو
                                        </Button>
                                        <Button type={"submit"} color="secondary" radius={"sm"} fullWidth
                                                isDisabled={newUserInputs.some((input: any) => input.isInvalid)}>
                                            ارسال پیامک
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </Tab>
                            <Tab key="getAllData" title="ثبت نام" className={"w-full"}>
                                <form className={"w-full"} onSubmit={SubmitNewUser}>
                                    <ModalBody className={"w-full overflow-y-scroll max-h-[50vh]"}>
                                        {newUserSignup.map((item: any, index: any) =>
                                            <CustomInput key={index} InputValue={item} formData={signupNewUser}
                                                         setFormData={setSignupNewUser}/>
                                        )}
                                    </ModalBody>
                                    <ModalFooter className={"w-full"}>
                                        <Button type={"submit"} radius={"sm"} fullWidth color="secondary"
                                                isDisabled={newUserSignup.some((input: any) => input.isInvalid)}>
                                            ثبت کاربر
                                        </Button>
                                        <Button color="danger" radius={"sm"} variant="flat" onPress={onClose} fullWidth>
                                            لغو
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </Tab>
                        </Tabs>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
