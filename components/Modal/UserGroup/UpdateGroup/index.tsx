import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import React, {useState, useEffect} from "react";
import {updateGroup} from "@/Json/inputs";
import CustomInput from "@/components/Input";
import {UpdateUserInfo} from "@/services/client/users/updateUser"
import {toast} from "react-toastify";
import {updateGroupInfo} from "@/services/client/usersGroup/updateGroupInfo";

export default function UpdateGroup({updateGroupM, setUpdateGroupM, GroupInfo, setGroup, groups}: any) {

    const [updatedGroupData, setUpdatedGroupData] = useState<any>({
        id: 0,
        name: "",
        type: undefined,
        amount: undefined
    });

    useEffect(() => {
        setUpdatedGroupData({
            id: GroupInfo.id,
            name: GroupInfo.name,
            type: GroupInfo.type,
            amount: GroupInfo.amount
        });
    }, [GroupInfo]);

    const updateGroupInputs = updateGroup(updatedGroupData)

    const submitHandler = (e: any) => {
        e.preventDefault()
        const response = updateGroupInfo(updatedGroupData)
        response
            .then((res) => {
                if (res.status === 200) {
                    setGroup([])
                    toast.success("اطلاعات جدید با موفقیت ثبت شد.")
                }
            })
            .catch((err) => toast.error(err.message))
    }

    return (
        <Modal isOpen={updateGroupM} onOpenChange={setUpdateGroupM}>
            <ModalContent className={'flex items-center justify-center pt-3'}>
                {(onClose) => (
                    <form className={"w-full"} onSubmit={submitHandler}>
                        <ModalHeader className={"flex justify-center"}>به روز رسانی گروه {GroupInfo.name}</ModalHeader>
                        <ModalBody className={"w-full overflow-y-scroll max-h-[61vh]"}>
                            {updateGroupInputs.map((item: any, index: any) =>
                                <CustomInput key={index} InputValue={item} formData={updatedGroupData}
                                             setFormData={setUpdatedGroupData}/>
                            )}
                        </ModalBody>
                        <ModalFooter className={"w-full"}>
                            <Button color="secondary" type={"submit"} radius={"sm"} onPress={onClose} fullWidth
                                    isDisabled={updateGroupInputs.some((input: any) => input.isInvalid)}>
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
