import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import React from "react";
import {toast} from "react-toastify";
import {delete_history} from "@/services/delete_history";

export default function DeleteHistoryModal({deleteHistory, setDeleteHistory, setChanges, changes}: any) {

    return (
        <Modal isOpen={deleteHistory} onOpenChange={setDeleteHistory}>
            <ModalContent className={'flex items-center justify-center pt-3'}>
                {(onClose) => (
                    <>
                        <ModalHeader>حذف تاریخچه سفارشات</ModalHeader>
                        <ModalBody>
                            <p>تاریخچه سفارشات تا به امروز به طور کامل پاک خواهد شد. مطمئن هستید؟؟</p>
                        </ModalBody>
                        <ModalFooter className={"w-full"}>
                            <Button color="secondary" onPress={onClose} fullWidth onClick={() => {
                                delete_history().then((res) => {
                                    if (!res) toast.error('خطا در پاک کردن تاریخچه');
                                    else {
                                        toast.success('تاریخچه با موفقیت پاک شد')
                                        setChanges(!changes)
                                    }
                                })
                            }}>
                                تایید
                            </Button>
                            <Button variant={"flat"} color="danger" onPress={onClose} fullWidth>
                                لغو
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
