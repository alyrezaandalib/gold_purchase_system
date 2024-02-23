import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import React from "react";

export default function DetailUserModal({detailUserM , setDetailUserM , userInfo} : any){
    return(
        <Modal isOpen={detailUserM} onOpenChange={setDetailUserM}>
            <ModalContent className={'flex items-center justify-center pt-3'}>
                {(onClose) => (
                    <>
                        <ModalHeader>{userInfo.first_name + " " + userInfo.last_name}</ModalHeader>
                        <ModalBody>
                            <div className={"flex flex-col gap-2"}>
                                <div className={"flex gap-2 items-center"}>
                                    <span>شماره تماس:</span>
                                    <span>{userInfo.phone_number}</span>
                                </div>  <div className={"flex gap-2 items-center"}>
                                    <span>کد ملی:</span>
                                    <span>{userInfo.melli_code}</span>
                                </div>
                                <div className={"flex gap-2 items-center"}>
                                    <span>نام کاربری:</span>
                                    <span>{userInfo.username}</span>
                                </div>
                                <div className={"flex gap-2 items-center"}>
                                    <span>اعتبار:</span>
                                    <span>{userInfo.username}</span>
                                </div>
                                <div className={"flex gap-2 items-center"}>
                                    <span>کد پستی:</span>
                                    <span>{userInfo.postal_code}</span>
                                </div>
                                <div className={"flex gap-2 items-center"}>
                                    <span>آدرس:</span>
                                    <span>{userInfo.address}</span>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter className={"w-full"}>
                            <Button color="secondary" onPress={onClose} fullWidth>
                                بازگشت
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}