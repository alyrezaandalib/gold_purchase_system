import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import CustomInput from "@/components/Input";
import {toast} from "react-toastify";
import {addNewPooem} from "@/services/client/setting/addNewPooem";

export default function AddPoem({addPoemM, setAddPoemM, setChanges, changes}: any) {

    const [addNewPoemData, setAddNewPoemData] = useState<any>({
        Poem: ""
    })

    const newPoemInputs = [
        {
            placeholder: "محل نوشتن شعر شما...",
            isRequired: true,
            value: "Poem",
            isTextarea: true,
            isInvalid: addNewPoemData.Poem.trim() === "",
            validationRegex: /^.+$/,
            message: "لطفا متنی را وارد کنید"
        },
    ]

    const submitHandler = (e: any) => {
        e.preventDefault()
        const response = addNewPooem(addNewPoemData)
        response
            .then((res) => {
                toast.success("شعر جدید با موفقیت اضافه شد.")
                setAddNewPoemData({Poem:""})
                setAddPoemM(!addPoemM)
                setChanges(!changes)
            })
            .catch((err) => toast.error(err.message))
    }

    return (
        <Modal isOpen={addPoemM} onOpenChange={setAddPoemM}>
            <ModalContent className={'flex items-center justify-center pt-3'}>
                {(onClose) => (
                    <form className={""} onSubmit={submitHandler}>
                        <ModalHeader>اضافه کردن شعر جدید</ModalHeader>
                        <ModalBody className={"w-full overflow-y-scroll max-h-[61vh]"}>
                            <div className={"text-sm"}>توجه !!</div>
                            <div className={"text-sm"}>شعر شما باید حداکثر 150 حرف باشد، اگر از این مقدار بیشتر شود به
                                طور کامل نشان داده نمیشود.
                            </div>
                            {newPoemInputs.map((item: any, index: any) =>
                                <CustomInput key={index} InputValue={item} formData={addNewPoemData}
                                             setFormData={setAddNewPoemData}/>
                            )}
                        </ModalBody>
                        <ModalFooter className={"w-full"}>
                            <Button color="secondary" type={"submit"} radius={"sm"} onPress={onClose} fullWidth
                                    isDisabled={newPoemInputs.some((input: any) => input.isInvalid)}>
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
