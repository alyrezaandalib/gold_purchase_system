import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import CustomInput from "@/components/Input";
import {updatePoems} from "@/services/client/setting/updatePoems";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

export default function EditPoem({updatePoemM, setUpdatePoemM, updatePoem, setChanges, changes}: any) {
    const [updatePoemData, setUpdatePoemData] = useState({
        id: 0,
        Poem: ""
    })

    useEffect(() => {
        setUpdatePoemData({
            id: updatePoem.id,
            Poem: updatePoem.Poem,
        });
    }, [updatePoem]);

    const updatePoemInputs = [
        {
            placeholder: "محل نوشتن شعر شما...",
            isRequired: true,
            value: "Poem",
            isTextarea: true,
            isInvalid: updatePoemData.Poem.trim() === "",
            validationRegex: /^.+$/,
            message: "لطفا متنی را وارد کنید"
        },
    ]

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const response = updatePoems(updatePoemData)
        response
            .then((res) => {
                toast.success("تغییرات با موفقیت اعمال شد.")
                setChanges(!changes)
            })
            .catch((err) => toast.error(err.message))
    }

    return (
        <Modal isOpen={updatePoemM} onOpenChange={setUpdatePoemM}>
            <ModalContent className={'flex items-center justify-center pt-3'}>
                {(onClose) => (
                    <form onSubmit={handleSubmit}>
                        <ModalHeader>به روزرسانی شعر</ModalHeader>
                        <ModalBody className={"w-full overflow-y-scroll max-h-[61vh]"}>
                            <div className={"text-sm"}>توجه !!</div>
                            <div className={"text-sm"}>شعر شما باید حداکثر 150 حرف باشد، اگر از این مقدار بیشتر شود به
                                طور کامل نشان داده نمیشود.
                            </div>
                            {updatePoemInputs.map((item: any, index: any) =>
                                <CustomInput key={index} InputValue={item} formData={updatePoemData}
                                             setFormData={setUpdatePoemData}/>
                            )}
                        </ModalBody>
                        <ModalFooter className={"w-full"}>
                            <Button color="secondary" type={"submit"} radius={"sm"} onPress={onClose} fullWidth
                                    isDisabled={updatePoemInputs.some((input: any) => input.isInvalid)}>
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
