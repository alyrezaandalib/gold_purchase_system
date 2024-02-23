'use client'
import {Button, Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {DeleteIcon} from "@/public/DeleteIcon";
import {EditIcon} from "@/public/EditIcon";
import {truncateTextStart} from "@/components/TurncateText";
import {PlusIcon} from "@/public/plusIcon";
import AddPoem from "@/components/Modal/setting/addPoem";
import DeletePoem from "@/components/Modal/setting/deletePoem";
import EditPoem from "@/components/Modal/setting/editPoem";
import {getAllPoems} from "@/services/client/setting/getAllPoems";
import {toast} from "react-toastify";

export default function PoemPage() {
    const [poems, setPoems] = useState<any[]>([])
    const [changes, setChanges] = useState<any>(false)
    useEffect(() => {
        const response = getAllPoems()
        response
            .then((res) => {
                setPoems(res.data)
            })
            .catch((err) => {
                toast.error(err.message)
            })
    }, [changes]);

    // ** modals ///////////////////////////
    const [deletePoem, setDeletePoem] = useState(false)
    const [editPoem, setEditPoem] = useState(false)
    const [addPoem, setAddPoem] = useState(false)

    // ** update poem date /////////////////
    const [updatePoem, setUpdatePoem] = useState({
        id: 0,
        Poem: ""
    })

    return (
        <div className={"flex items-start justify-start h-full overflow-y-scroll"}>
            <div className="gap-2 w-full grid grid-cols-1 sm:grid-cols-3 p-5 sm:p-7 pb-1 content-start">
                <Card shadow="sm" isPressable className={"p-3 h-[140px] flex justify-center items-center "}
                      onClick={() => setAddPoem(!addPoem)}>
                    <div className={"p-4 rounded-3xl border-2 border-default-200"}>
                        <PlusIcon className={"text-default-400"}/>
                    </div>
                </Card>
                {poems.map((item, index) => (
                    <Card shadow={"sm"} key={index} className={"p-5 rounded-2xl relative h-[140px] bg-white"}>
                        <div
                            className={"text-right pl-10 text-sm xl:text-medium lg:leading-8"}>{truncateTextStart(175, item.text)}</div>
                        <div className={"flex flex-col items-center justify-between absolute left-3 top-3"}>
                            <Button variant={"light"} color={"danger"} isIconOnly onClick={() => {
                                setDeletePoem(!addPoem)
                                setUpdatePoem({
                                    id: item.id,
                                    Poem: item.text
                                })
                            }}><DeleteIcon/></Button>
                            <Button variant={"light"} color={"default"} isIconOnly onClick={() => {
                                setUpdatePoem({
                                    id: item.id,
                                    Poem: item.text
                                })
                                setEditPoem(!editPoem)
                            }}><EditIcon/></Button>
                        </div>
                    </Card>
                ))}
                {/*// ** add poem modal /////////////////*/}
                <AddPoem addPoemM={addPoem} setAddPoemM={setAddPoem} setChanges={setChanges} changes={changes}/>

                {/*// ** delete poem modal /////////////////////////*/}
                <DeletePoem deletePoem={deletePoem} setDeletePoem={setDeletePoem} poem={updatePoem}
                            setChanges={setChanges} changes={changes}/>

                {/*// ** delete poem modal /////////////////////////*/}
                <EditPoem updatePoemM={editPoem} setUpdatePoemM={setEditPoem} updatePoem={updatePoem}
                          setUpdatePoem={setUpdatePoem} setChanges={setChanges} changes={changes}/>
            </div>
        </div>
    )
}