import {Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Tabs} from "@nextui-org/react";
import CustomInput from "@/components/Input";
import React, {useState} from "react";
import {toast} from "react-toastify";
import {addNewGroup, addNewStaticGroup} from "@/Json/inputs";
import {useRouter} from "next/navigation";
import {addGroup} from "@/services/client/usersGroup/addGroup";
import {group} from "d3-array";
import {addStaticGroup} from "@/services/client/usersGroup/addStaticGroup";

export default function AddGroup({addNewGroupM, setAddNewGroupM, setGroup, groups}: any) {
    const router = useRouter()
    const [selected, setSelected]: any = useState("percent");

    const [isDirtyFrom, setIsDirtyFrom] = useState(true)

    const [nameError, setNameError] = useState(false)
    const [nameErrorMsg, setNameErrorMsg]: any = useState(null)


    const [newGroup, setNewGroup] = useState({
        name: "",
    })


    const newGroupInputs = addNewGroup(newGroup)

    const handleSubmit = (e: any) => {
        if (!nameError) {
            e.preventDefault()
            setNewGroup({...newGroup})
            const response = addGroup(newGroup)
            response
                .then((res) => {
                    if (res.status === 201) {
                        toast.success("گروه با موفقیت اضافه شد.")
                        setTimeout(() => {
                            window.location.reload()

                        }, 1000)
                    }
                })
                .catch((err) => toast.error("نام گروه تکراری است."))
        }
    }

    const validateInput = (data: any, inputName: string) => {
        if (inputName == 'name') {
            if (data != "" && data != undefined) {
                setNameError(false)
                setIsDirtyFrom(false)
                setNameErrorMsg(null)

            } else {
                setNameError(true)
                setIsDirtyFrom(true)
                setNameErrorMsg('لطفا نام گروه را وارد کنید')
            }
        }
    }

    return (
        <Modal isOpen={addNewGroupM} onOpenChange={setAddNewGroupM}>
            <ModalContent className={'flex items-center justify-center pt-8'}>
                {(onClose) => (
                    <>
                        <ModalHeader>گروه جدید</ModalHeader>

                        <form className={"w-full"} onSubmit={handleSubmit}>
                            <ModalBody className={"w-full overflow-y-scroll max-h-[61vh]"}>
                                <Input
                                    isRequired={true}
                                    variant="bordered"
                                    label={'نام'}
                                    type={"text"}
                                    size={'sm'}
                                    isInvalid={nameError}
                                    color={
                                        nameError ? 'danger' : 'secondary'
                                    }
                                    errorMessage={nameError && nameErrorMsg}
                                    value={newGroup.name}
                                    onChange={(event: any) => {
                                        newGroup.name = event.target.value;
                                        validateInput(newGroup.name, 'name');
                                        setNewGroup({...newGroup});
                                    }}
                                    onBlur={() => {
                                        validateInput(newGroup.name, 'name');
                                    }}
                                    className="w-full"
                                />

                            </ModalBody>
                            <ModalFooter className={"w-full"}>
                                <Button type={"submit"} color="secondary" radius={"sm"} fullWidth
                                        isDisabled={nameError || isDirtyFrom}>
                                    ثبت گروه
                                </Button>
                                <Button color="danger" radius={"sm"} variant="flat" onPress={onClose} fullWidth>
                                    لغو
                                </Button>
                            </ModalFooter>
                        </form>


                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
