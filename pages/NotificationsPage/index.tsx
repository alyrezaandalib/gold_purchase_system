'use client'
import {Button, Card} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {DeleteIcon} from "@/public/DeleteIcon";
import {EditIcon} from "@/public/EditIcon";
import {truncateTextStart} from "@/components/TurncateText";
import {PlusIcon} from "@/public/plusIcon";
import {toast} from "react-toastify";
import AddNotification from "@/components/Modal/setting/addNotification";
import DeleteNotification from "@/components/Modal/setting/deleteNotification";
import EditNotification from "@/components/Modal/setting/editNotification";
import {getAllNotification} from "@/services/client/setting/notification/getAllNotification";

export default function NotificationsPage() {
    const [Notifications, setNotifications] = useState<any[]>([])
    const [changes, setChanges] = useState<any>(false)
    useEffect(() => {
        const response = getAllNotification()
        response
            .then((res) => {
                setNotifications(res.data)
            })
            .catch((err) => {
                toast.error(err.message)
            })
    }, [changes]);

    // ** modals ///////////////////////////
    const [deleteNotification, setDeleteNotification] = useState(false)
    const [editNotification, setEditNotification] = useState(false)
    const [addNotification, setAddNotification] = useState(false)

    // ** update Notification date /////////////////
    const [updateNotification, setUpdateNotification] = useState({
        id: 0,
        Notification: "",
        enable: true
    })

    return (
        <div className={"flex items-start justify-start h-full overflow-y-scroll"}>
            <div className="gap-2 w-full grid grid-cols-1 sm:grid-cols-3 p-5 sm:p-7 pb-1 content-start">
                <Card shadow="sm" isPressable className={"p-3 h-[140px] flex justify-center items-center "}
                      onClick={() => setAddNotification(!addNotification)}>
                    <div className={"p-4 rounded-3xl border-2 border-default-200"}>
                        <PlusIcon className={"text-default-400"}/>
                    </div>
                </Card>
                {Notifications.map((item, index) => (
                    <Card shadow={"sm"} key={index} className={"p-5 rounded-2xl relative h-[140px] bg-white"}>
                        <div
                            className={"text-right pl-10 text-sm xl:text-medium lg:leading-8"}>{truncateTextStart(175, item.text)}</div>
                        <div className={"flex flex-col items-center justify-between absolute left-3 top-3"}>
                            <Button variant={"light"} color={"danger"} isIconOnly onClick={() => {
                                setDeleteNotification(!addNotification)
                                setUpdateNotification({
                                    id: item.id,
                                    Notification: item.text,
                                    enable: item.enable
                                })
                            }}><DeleteIcon/></Button>
                            <Button variant={"light"} color={"default"} isIconOnly onClick={() => {
                                setUpdateNotification({
                                    id: item.id,
                                    Notification: item.text,
                                    enable: item.enable
                                })
                                setEditNotification(!editNotification)
                            }}><EditIcon/></Button>
                        </div>
                    </Card>
                ))}
                {/*// ** add Notification modal /////////////////*/}
                <AddNotification addNotificationM={addNotification} setAddNotificationM={setAddNotification}
                                 setChanges={setChanges} changes={changes}/>


                {/*// ** delete Notification modal /////////////////////////*/}
                <DeleteNotification deleteNotification={deleteNotification}
                                    setDeleteNotification={setDeleteNotification} Notification={updateNotification}
                                    setChanges={setChanges} changes={changes}/>

                {/*// ** delete Notification modal /////////////////////////*/}
                <EditNotification updateNotificationM={editNotification} setUpdateNotificationM={setEditNotification}
                                  updateNotification={updateNotification}
                                  setUpdateNotification={setUpdateNotification} setChanges={setChanges}
                                  changes={changes}/>
            </div>
        </div>
    );
}