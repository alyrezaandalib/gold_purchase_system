'use client'
import React, {useState, useEffect} from "react";
import {toast} from "react-toastify";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    Pagination,
    SortDescriptor, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter
} from "@nextui-org/react";
import {SearchIcon} from "@/public/SearchIcon";
import {EditIcon} from "@/public/EditIcon";
import {DeleteIcon} from "@/public/DeleteIcon";
import {EyeIcon} from "@/public/EyeIcon";
import ChangPasswordIcon from "@/public/changPasswordIcon";
import UserInfoUpdate from "@/components/Modal/user/UserInfoUpdate";
import DeleteUser from "@/components/Modal/user/deleteUser";
import AddNewUserM from "@/components/Modal/user/addNewUserM";
import {getAllUsers} from "@/services/client/users/getAllUsers";
import {usePathname} from "next/navigation";
import DetailUserModal from "@/components/Modal/user/DetailUserM";
import ChangUserPassword from "@/components/Modal/user/changUserPassword";

type Users = {
    username: any;
    id: number;
    first_name: string;
    last_name: string;
    address: string;
    phone_number: string;
    melli_code: string;
    postal_code: string;
};

export default function Users() {
    const pathName = usePathname()
    let substringToRemove = "/user-group/";
    // @ts-ignore
    let modifiedString = pathName.replace(substringToRemove, '');


    // ** modals
    const [userInfo, setUserInfo] = useState({
        id: 0,
        username: "",
        first_name: "",
        last_name: "",
        address: "",
        phone_number: "",
        melli_code: "",
        postal_code: "",
    })
    const [deleteUserM, setDeleteUserM] = useState(false)
    const [updateUserM, setUpdateUserM] = useState(false)
    const [detailUserM, setDetailUserM] = useState(false)
    const [addNewUserM, setAddNewUserM] = useState(false)
    const [changPasswordM, setChangPasswordM] = useState(false)

    
    // ** get all users////////////
    const [users, setUsers] = useState<Users[]>([])
    const [changes, setChanges] = useState(false)
    useEffect(() => {
        const Users = getAllUsers(modifiedString)
        Users
            .then((response) => {
                if (response.status === 200) {
                    const data = response.data.users || [];
                    setUsers(Array.isArray(data) ? data : []);
                }
            })
            .catch((error) => toast.error(error.message))
    }, [changes]);

    // ** for next ui and table
    const [filterValue, setFilterValue] = React.useState("");
    const rowsPerPage = 10
    const [sortDescriptor] = React.useState<SortDescriptor>({});

    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...users];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.first_name.includes(filterValue.toLowerCase()),
            );
        }

        return filteredUsers;
    }, [users, hasSearchFilter, filterValue]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: Users, b: Users) => {
            const first = a[sortDescriptor.column as keyof Users] as number;
            const second = b[sortDescriptor.column as keyof Users] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((user: Users, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof Users];
        switch (columnKey) {
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Button
                            size={'sm'}
                            isIconOnly
                            variant={"light"}
                            // @ts-ignore
                            onClick={() => {
                                setChangPasswordM(!changPasswordM)
                                setUserInfo({
                                    id: user.id,
                                    username: user.username,
                                    first_name: user.first_name,
                                    last_name: user.last_name,
                                    address: user.address,
                                    phone_number: user.phone_number,
                                    melli_code: user.melli_code,
                                    postal_code: user.postal_code,
                                })
                            }}
                            color={"secondary"}
                        >
                            <ChangPasswordIcon/>
                        </Button>
                        <Button
                            size={'sm'}
                            isIconOnly
                            variant={"light"}
                            // @ts-ignore
                            onClick={() => {
                                setDetailUserM(!detailUserM);
                                setUserInfo({
                                    id: user.id,
                                    username: user.username,
                                    first_name: user.first_name,
                                    last_name: user.last_name,
                                    address: user.address,
                                    phone_number: user.phone_number,
                                    melli_code: user.melli_code,
                                    postal_code: user.postal_code,
                                })
                            }}
                            color={"secondary"}
                        >
                            <EyeIcon/>
                        </Button>
                        <Button size={'sm'} isIconOnly variant={"light"} onClick={() => {
                            setUpdateUserM(!updateUserM)
                            setUserInfo({
                                id: user.id,
                                username: user.username,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                address: user.address,
                                phone_number: user.phone_number,
                                melli_code: user.melli_code,
                                postal_code: user.postal_code,
                            })
                        }}
                                color={"secondary"}><EditIcon/></Button>
                        <Button size={'sm'} isIconOnly variant={"light"} onClick={() => {
                            setDeleteUserM(!deleteUserM)
                            setUserInfo({
                                id: user.id,
                                username: user.username,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                address: user.address,
                                phone_number: user.phone_number,
                                melli_code: user.melli_code,
                                postal_code: user.postal_code,
                            })
                        }}
                                color={"danger"}><DeleteIcon/></Button>
                    </div>
                );
            default:
                return cellValue;
        }
    }, [deleteUserM, detailUserM, updateUserM]);

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between  gap-3 items-center">
                    <Input
                        isClearable
                        size={"sm"}
                        radius={"lg"}
                        variant={"bordered"}
                        color={"secondary"}
                        className={"w-full xl:w-[30%] text-default-800"}
                        placeholder="جستجو"
                        startContent={<SearchIcon/>}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <Button color={"secondary"} radius={"sm"} onClick={() => setAddNewUserM(!addNewUserM)}>کاربر
                        جدید</Button>
                </div>
            </div>
        );
    }, [filterValue, onSearchChange, onClear, addNewUserM]);

    const bottomContent = React.useMemo(() => {
        return (
            <Pagination
                className={"mx-auto"}
                dir={"ltr"}
                isCompact
                showControls
                color="secondary"
                page={page}
                total={pages}
                onChange={setPage}
            />
        );
    }, [page, pages]);
    return (
        <>
            <Table
                isHeaderSticky
                isStriped
                dir={"ltr"}
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                classNames={{
                    wrapper: "h-full",
                }}
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="outside"
            >
                <TableHeader>
                    <TableColumn key="actions" className={"text-left"}>عملیات ها</TableColumn>
                    <TableColumn key="last_login_ip" className={"text-right"}>آخرین ورود IP</TableColumn>
                    <TableColumn key="postal_code" className={"text-right"}>کد پستی</TableColumn>
                    <TableColumn key="balance" className={"text-right"}>اعتبار</TableColumn>
                    <TableColumn key="username" className={"text-right"}>نام کاربری</TableColumn>
                    <TableColumn key="phone_number" className={"text-right"}>شماره تماس</TableColumn>
                    <TableColumn key="melli_code" className={"text-right"}>کد ملی</TableColumn>
                    <TableColumn key="last_name" className={"text-right"}>نام خانوادگی</TableColumn>
                    <TableColumn key="first_name" className={"text-right"}>نام</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"کاربری یافت نشد"} dir={"rtl"} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {/*// ** delete user /////////////////////////*/}
            <DeleteUser deleteUserM={deleteUserM} setDeleteUserM={setDeleteUserM} userInfo={userInfo}
                        title={"حذف کاربر"} changes={changes} setChanges={setChanges}/>

            {/*// ** update user /////////////////////////*/}
            <UserInfoUpdate updateUserM={updateUserM} setUpdateUserM={setUpdateUserM} userInfo={userInfo}
                            changes={changes} setChanges={setChanges}/>

            {/*// ** update user password /////////////////////////*/}
            <ChangUserPassword changPasswordM={changPasswordM} setChangPasswordM={setChangPasswordM} changes={changes}
                               setChanges={setChanges} userInfo={userInfo}/>

            {/*// ** detail user /////////////////////////*/}
            <DetailUserModal detailUserM={detailUserM} setDetailUserM={setDetailUserM} userInfo={userInfo}/>

            {/*// ** new user /////////////////////////*/}
            <AddNewUserM addNewUserM={addNewUserM} setAddNewUserM={setAddNewUserM} groupId={modifiedString}
                         changes={changes} setChanges={setChanges}/>

        </>
    );
}
