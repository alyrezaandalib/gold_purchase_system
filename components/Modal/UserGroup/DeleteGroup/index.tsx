import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, user} from "@nextui-org/react";
import React from "react";
import {deleteUser} from "@/services/client/users/deleteUser";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {deleteGroup} from "@/services/client/usersGroup/deleteGroup";

export default function DeleteGroup({deleteGroupM, setDeleteGroupM, GroupInfo, setGroup, groups}: any) {
    const router = useRouter()
    return (
        <Modal isOpen={deleteGroupM} onOpenChange={setDeleteGroupM}>
            <ModalContent className={'flex items-center justify-center pt-3'}>
                {(onClose) => (
                    <>
                        <ModalHeader>حذف گروه {GroupInfo.name}</ModalHeader>
                        <ModalBody>
                            <p>از حذف {GroupInfo.name} از لیست گروه ها اطمینان دارید؟</p>
                        </ModalBody>
                        <ModalFooter className={"w-full"}>
                            <Button color="secondary" onPress={onClose} fullWidth onClick={() => {
                                const response = deleteGroup(GroupInfo.id)
                                response
                                    .then((res) => {
                                        if (res.status === 204) {
                                            const filteredGroup = groups.filter((item: any) => item.id !== GroupInfo.id)
                                            setGroup([...filteredGroup])
                                            toast.success("گروه با موفقیت حذف شد.")
                                            router.refresh()
                                        }
                                    })
                                    .catch((error) => toast.error('گروه حاوی کاربر می باشد'))
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
