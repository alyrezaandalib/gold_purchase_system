import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import React from "react";
import {deletePooem} from "@/services/client/setting/deletePoem";
import {toast} from "react-toastify";

export default function DeletePoem({deletePoem, setDeletePoem, poem , setChanges ,changes}: any) {

    return (
        <Modal isOpen={deletePoem} onOpenChange={setDeletePoem}>
            <ModalContent className={'flex items-center justify-center pt-3'}>
                {(onClose) => (
                    <>
                        <ModalHeader>حذف شعر</ModalHeader>
                        <ModalBody>
                            <p className={"font-bold"}>از حذف شعر <span className={"text-default-600 font-normal"}>{poem.Poem}</span>  اطمینان دارید؟</p>
                        </ModalBody>
                        <ModalFooter className={"w-full"}>
                            <Button color="secondary" onPress={onClose} fullWidth onClick={() => {
                                const response = deletePooem(poem.id)
                                response
                                    .then((res) => {
                                        toast.success("شعر با موفقیت حذف شد.")
                                        setChanges(!changes)
                                    })
                                    .catch((err) => toast.error(err.message))
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
