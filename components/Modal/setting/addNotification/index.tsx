import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import React, { useState} from "react";
import CustomInput from "@/components/Input";
import {toast} from "react-toastify";
import {addNewNotification} from "@/services/client/setting/notification/addNewNotification";

export default function AddNotification({addNotificationM, setAddNotificationM, setChanges, changes}: any) {

    const [addNewNotificationData, setAddNewNotificationData] = useState<any>({
        Notification: ""
    })

    const newNotificationInputs = [
        {
            placeholder: "محل نوشتن اطلاعیه ...",
            isRequired: true,
            value: "Notification",
            isTextarea: true,
            isInvalid: addNewNotificationData.Notification.trim() === "",
            validationRegex: /^.+$/,
            message: "لطفا متنی را وارد کنید"
        },
    ]

    const submitHandler = (e: any) => {
        e.preventDefault()
        const response = addNewNotification(addNewNotificationData)
        response
            .then((res) => {
                // console.log(res.data)
                toast.success("شعر جدید با موفقیت اضافه شد.")
                setAddNewNotificationData({Notification:""})
                setAddNotificationM(!addNotificationM)
                setChanges(!changes)
            })
            .catch((err) => toast.error(err.message))
    }

    return (
        <Modal isOpen={addNotificationM} onOpenChange={setAddNotificationM}>
            <ModalContent className={'flex items-center justify-center pt-3'}>
                {(onClose) => (
                    <form className={""} onSubmit={submitHandler}>
                        <ModalHeader>اضافه کردن اطلاعیه جدید</ModalHeader>
                        <ModalBody className={"w-full overflow-y-scroll max-h-[61vh]"}>
                            <div className={"text-sm"}>توجه !!</div>
                            <div className={"text-sm"}>اطلاعیه شما باید حداکثر 150 حرف باشد، اگر از این مقدار بیشتر شود به
                                طور کامل نشان داده نمیشود.
                            </div>
                            {newNotificationInputs.map((item: any, index: any) =>
                                <CustomInput key={index} InputValue={item} formData={addNewNotificationData}
                                             setFormData={setAddNewNotificationData}/>
                            )}
                        </ModalBody>
                        <ModalFooter className={"w-full"}>
                            <Button color="secondary" type={"submit"} radius={"sm"} onPress={onClose} fullWidth
                                    isDisabled={newNotificationInputs.some((input: any) => input.isInvalid)}>
                                اضافه کردن
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
