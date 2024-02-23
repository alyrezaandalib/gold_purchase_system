import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, user} from "@nextui-org/react";
import React from "react";
import {deleteUser} from "@/services/client/users/deleteUser";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

export default function DeleteUser({deleteUserM, setDeleteUserM, userInfo, title ,changes ,  setChanges}: any) {
    return (
        <Modal isOpen={deleteUserM} onOpenChange={setDeleteUserM}>
            <ModalContent className={'flex items-center justify-center pt-3'}>
                {(onClose) => (
                    <>
                        <ModalHeader>{title}</ModalHeader>
                        <ModalBody>
                            <p>از حذف {userInfo.first_name + " " + userInfo.last_name} از لیست کارمندان اطمینان دارید؟</p>
                        </ModalBody>
                        <ModalFooter className={"w-full"}>
                            <Button color="secondary" onPress={onClose} fullWidth onClick={() => {
                                const response = deleteUser(userInfo.id)
                                response
                                    .then((res) => {
                                        toast.success("کاربر با موفقیت حذف شد.")
                                        setChanges(!changes)
                                    })
                                    .catch((error) => toast.error(error.message))
                            }}>
                                حذف
                            </Button>
                            <Button color="danger" variant="flat" onPress={onClose} fullWidth>
                                لغو
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
