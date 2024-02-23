import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader , Checkbox} from "@nextui-org/react";
import CustomInput from "@/components/Input";
import {useEffect, useState} from "react";
import {updateNotifications} from "@/services/client/setting/notification/updateNotification";
import {toast} from "react-toastify";

export default function EditNotification({updateNotificationM, setUpdateNotificationM, updateNotification, setChanges, changes}: any) {
    const [updateNotificationData, setUpdateNotificationData] = useState({
        id: 0,
        Notification: "",
        enable:true
    })

    useEffect(() => {
        setUpdateNotificationData({
            id: updateNotification.id,
            Notification: updateNotification.Notification,
            enable: updateNotification.enable
        });
    }, [updateNotification]);

    // console.log(updateNotificationData , 'log')

    const updateNotificationInputs = [
        {
            placeholder: "محل نوشتن اطلاعیه ...",
            isRequired: true,
            value: "Notification",
            isTextarea: true,
            isInvalid: updateNotificationData.Notification.trim() === "",
            validationRegex: /^.+$/,
            message: "لطفا متنی را وارد کنید"
        },
    ]

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const response = updateNotifications(updateNotificationData)
        response
            .then((res) => {
                toast.success("تغییرات با موفقیت اعمال شد.")
                setChanges(!changes)
            })
            .catch((err) => toast.error(err.message));
    }

    return (
        <Modal isOpen={updateNotificationM} onOpenChange={setUpdateNotificationM}>
            <ModalContent className={'flex items-center justify-center pt-3'}>
                {(onClose) => (
                    <form onSubmit={handleSubmit}>
                        <ModalHeader>به روزرسانی شعر</ModalHeader>
                        <ModalBody className={"w-full overflow-y-scroll max-h-[61vh]"}>
                            <div className={"text-sm"}>توجه !!</div>
                            <div className={"text-sm"}>اطلاعیه شما باید حداکثر 150 حرف باشد، اگر از این مقدار بیشتر شود به
                                طور کامل نشان داده نمیشود.
                            </div>
                            {updateNotificationInputs.map((item: any, index: any) =>
                                <CustomInput key={index} InputValue={item} formData={updateNotificationData}
                                             setFormData={setUpdateNotificationData}/>
                            )}
                            <Checkbox  isSelected={updateNotificationData.enable} color={"secondary"} onClick={() => {
                                updateNotificationData.enable = !updateNotificationData.enable
                                setUpdateNotificationData({...updateNotificationData})
                            }}> فعال </Checkbox>
                        </ModalBody>
                        <ModalFooter className={"w-full"}>
                            <Button color="secondary" type={"submit"} radius={"sm"} onPress={onClose} fullWidth
                                    isDisabled={updateNotificationInputs.some((input: any) => input.isInvalid)}>
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
