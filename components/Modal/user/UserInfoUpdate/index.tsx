import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import React, {useState, useEffect} from "react";
import {updateUser} from "@/Json/inputs";
import CustomInput from "@/components/Input";
import {UpdateUserInfo} from "@/services/client/users/updateUser"
import {toast} from "react-toastify";

export default function UserInfoUpdate({updateUserM, setUpdateUserM, userInfo, changes, setChanges}: any) {

    const [updateUserData, setUpdateUserData] = useState<any>({
        id: 0,
        FName: "",
        LName: "",
        PhoneNumber: "",
        NCode: "",
        PostalCode: "",
        Address: "",
    });

    useEffect(() => {
        setUpdateUserData({
            id: userInfo.id,
            FName: userInfo.first_name,
            LName: userInfo.last_name,
            PhoneNumber: userInfo.phone_number,
            NCode: userInfo.melli_code,
            PostalCode: userInfo.postal_code,
            Address: userInfo.address,
        });
    }, [userInfo]);

    const UpdateUserInputs = updateUser(updateUserData)

    const submitHandler = (e: any) => {
        e.preventDefault()
        const response = UpdateUserInfo(updateUserData)
        response
            .then((res) => {
                toast.success("تغییرات با موفقیت اعمال شد.")
                setChanges(!changes)
            })
            .catch((err) => toast.error(err.message))
    }

    return (
        <Modal isOpen={updateUserM} onOpenChange={setUpdateUserM}>
            <ModalContent className={'flex items-center justify-center pt-3'}>
                {(onClose) => (
                    <form className={"w-full"} onSubmit={submitHandler}>
                        <ModalHeader className={"flex justify-center"}>به روزرسانی کاربر</ModalHeader>
                        <ModalBody className={"w-full overflow-y-scroll max-h-[61vh]"}>
                            {UpdateUserInputs.map((item: any, index: any) =>
                                <CustomInput key={index} InputValue={item} formData={updateUserData}
                                             setFormData={setUpdateUserData}/>
                            )}
                        </ModalBody>
                        <ModalFooter className={"w-full"}>
                            <Button color="secondary" type={"submit"} radius={"sm"} onPress={onClose} fullWidth
                                    isDisabled={UpdateUserInputs.some((input: any) => input.isInvalid)}>
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
