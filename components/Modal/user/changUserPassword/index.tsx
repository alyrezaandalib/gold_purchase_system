import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import React, {useState} from "react";
import CustomInput from "@/components/Input";
import {userPasswordUpdate} from "@/services/client/users/userPasswordUpdate";
import {toast} from "react-toastify";

export default function ChangUserPassword({changPasswordM, setChangPasswordM, changes, setChanges , userInfo}: any) {
    const [updateUserPassword, setUpdateUserPassword] = useState({
        password: "",
        repeatPassword: ""
    })

    function validatePasswordsMatch(password: any, repeatPassword: any) {
        return new RegExp(`^${password}$`, 'i')
    }

    const forgetPassword = [
        {
            label: "رمز عبور",
            isRequired: true,
            value: "password",
            type: "text",
            isInvalid: !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(updateUserPassword.password.trim()),
            validationRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message: "رمز عبور باید شامل حداقل 8 کاراکتر،یک حرف بزرگ، یک عدد و یک کاراکتر خاص باشد"
        }, {
            label: "تکرار رمز عبور",
            isRequired: true,
            value: "repeatPassword",
            type: "text",
            isInvalid: updateUserPassword.password !== updateUserPassword.repeatPassword,
            validationRegex: validatePasswordsMatch(updateUserPassword.password, updateUserPassword.repeatPassword),
            message: "رمز وارد شده مطابقت ندارد"
        },
    ]

    const submitHandle = (e: any) => {
        e.preventDefault()
        const response = userPasswordUpdate(updateUserPassword.password , userInfo.id)
        response
            .then(() => {
                toast.success("رمز با موفقیت تغییر کرد.")
                setUpdateUserPassword({
                    password: "",
                    repeatPassword: ""
                })
                setChanges(!changes)
            })
            .catch((err) => {
                toast.error(err.message)
            })
        setChanges(!changes)
    }
    return (
        <Modal isOpen={changPasswordM} onOpenChange={setChangPasswordM}>
            <ModalContent className={'flex items-center justify-center pt-3'}>
                {(onClose) => (
                    <form className={"w-full"} onSubmit={submitHandle}>
                        <ModalHeader className={"flex justify-center"}>به روزرسانی رمز کاربر</ModalHeader>
                        <ModalBody className={"w-full overflow-y-scroll max-h-[61vh]"}>
                            {forgetPassword.map((item: any, index: any) =>
                                <CustomInput key={index} InputValue={item} formData={updateUserPassword}
                                             setFormData={setUpdateUserPassword}/>
                            )}
                        </ModalBody>
                        <ModalFooter className={"w-full"}>
                            <Button color="secondary" type={"submit"} radius={"sm"} onPress={onClose} fullWidth
                                    isDisabled={forgetPassword.some((input: any) => input.isInvalid)}>
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
    )
}