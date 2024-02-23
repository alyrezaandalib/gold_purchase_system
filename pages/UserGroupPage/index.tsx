'use client'
import {Button, Card} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {DeleteIcon} from "@/public/DeleteIcon";
import {EditIcon} from "@/public/EditIcon";
import {PlusIcon} from "@/public/plusIcon";
import Link from "next/link";
import AddGroup from "@/components/Modal/UserGroup/AddGroup";
import DeleteGroup from "@/components/Modal/UserGroup/DeleteGroup";
import UpdateGroup from "@/components/Modal/UserGroup/UpdateGroup";
import {getAllGroups} from "@/services/client/usersGroup/getAllGroups";
import {toast} from "react-toastify";

export default function GroupPage() {
    const [groups, setGroups] = useState<any>([])
    useEffect(() => {
        const response = getAllGroups()
        response
            .then((res) => {
                // @ts-ignore
                setGroups(res.data)
            })
            .catch((err) => toast.error(err.message))
    }, [groups.length]);

    // ** modals ///////////////////////////
    const [addGroup, setAddGroup] = useState(false)
    const [updateGroupM, setUpdateGroupM] = useState(false)
    const [deleteGroup, setDeleteGroup] = useState(false)

    // ** update poem date /////////////////
    const [updateGroup, setUpdateGroup] = useState({
        id: 0,
        url: "",
        name: "",
        amount: "",
        type: ""
    })

    return (
        <div className={"flex items-start justify-start h-full overflow-y-scroll"}>
            <div className="gap-2 w-full grid grid-cols-1 sm:grid-cols-3 p-5 sm:p-7 pb-1 content-start">
                <Card shadow="sm" isPressable
                      className={"p-3 h-[140px] flex justify-center items-center"}
                      onClick={() => setAddGroup(!addGroup)}>
                    <div className={"p-4 rounded-3xl border-2 border-default-300"}>
                        <PlusIcon className={"text-default-500"}/>
                    </div>
                </Card>
                {groups ? groups.map((item: any, index: any) => (
                    <Card shadow={"sm"} key={index}
                          className={"rounded-2xl relative h-[140px] cursor-pointer "}>
                        <Link href={`/groups/${item.id}`} className={"h-full p-5"}>
                            <div className={"h-full flex flex-col gap-2 items-center justify-center"}>
                                <div>{item.name}</div>
                            </div>

                        </Link>
                        <div className={"flex flex-col items-center justify-between absolute left-3 top-3"}>
                            <Button variant={"light"} color={"danger"} isIconOnly onClick={() => {
                                setDeleteGroup(!deleteGroup)
                                setUpdateGroup({
                                    id: item.id,
                                    url: item.url,
                                    name: item.name,
                                    amount: item.amount,
                                    type: item.type
                                })
                            }}><DeleteIcon width={18} height={18}/></Button>
                            <Button variant={"light"} color={"default"} isIconOnly onClick={() => {
                                setUpdateGroup({
                                    id: item.id,
                                    url: item.url,
                                    name: item.name,
                                    amount: item.amount,
                                    type: item.type
                                })
                                setUpdateGroupM(!updateGroupM)
                            }}><EditIcon width={18} height={18}/></Button>
                        </div>
                    </Card>
                )) : ""}
                {/*// ** add group modal /////////////////*/}
                <AddGroup addNewGroupM={addGroup} setAddNewGroupM={setAddGroup} setGroup={setGroups} groups={groups}/>

                {/*// ** delete group modal /////////////////////////*/}
                <DeleteGroup deleteGroupM={deleteGroup} setDeleteGroupM={setDeleteGroup} GroupInfo={updateGroup}
                             setGroup={setGroups} groups={groups}/>

                {/*// ** update group modal /////////////////////////*/}
                <UpdateGroup updateGroupM={updateGroupM} setUpdateGroupM={setUpdateGroupM} GroupInfo={updateGroup}
                             setGroup={setGroups} groups={groups}/>

            </div>
        </div>
    )
}
