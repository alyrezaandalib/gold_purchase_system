'use client'
import React, {useState, useEffect} from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Input,
    Chip, Button,
} from "@nextui-org/react";
import {toast} from "react-toastify";
import {getAllOpenTransactions} from "@/services/client/openTransactions/getAllOpenTransactions";
import Link from "next/link";
import {SearchIcon} from "@/public/SearchIcon";
import moment from 'moment';
import 'moment/locale/fa';
import DeleteHistoryModal from "@/components/Modal/DeleteHistory";
import {getAllTransactions} from "@/services/client/Transactions/getAllTransactions";
import {delete_history} from "@/services/delete_history";

export default function App() {
    const [users, setUsers] = useState<any[]>([])
    const [deleteHistoryModal, setDeleteHistoryModal] = useState(false)
    const [change, setChange] = useState(false)
    useEffect(() => {
        const response = getAllTransactions()
        response
            .then((response) => {
                if (response.status === 200) {
                    const data = response.data || [];
                    // console.log(data)
                    const filteredData = data.filter((item: any) => item.status !== 0)
                    setUsers(Array.isArray(filteredData) ? filteredData : []);
                    // console.log(filteredData, 'filter')
                }
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }, [change]);
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 10;

    /////////////////////////////////////////

    const renderCell = React.useCallback((user: any, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof any];
        switch (columnKey) {
            case "time" :
                const jalaliTime = new Date(user.accepted_at).toLocaleDateString('fa-IR')

                return (
                    <div>{jalaliTime}</div>
                )

            case "price":
                const located_price = user.price.toLocaleString()
                return (
                    <div>{located_price}</div>
                )

            case "total_price":
                const located_total_price = user.total_price.toLocaleString()
                return (
                    <div>{located_total_price}</div>
                )

            case "created_by":
                const owner = user.created_by.last_name
                return (
                    <div>{owner}</div>
                )

            case "product":
                const product = user.product.name
                return (
                    <div>{product}</div>
                )
            case "action":
                const action = user.action
                return (
                    <div>{action == 'buy' ? 'خرید' : 'فروش'}</div>
                )
            case "owner":
                return (<div>{user.created_by.first_name + ' ' + user.created_by.last_name}</div>)

            default:
                return cellValue;
        }
    }, []);

    /////////////////////////////////////////

    const topContent = React.useMemo(() => {
        return (
            <div className={"flex justify-between items-center gap-1"}>
                <Input
                    size={"sm"}
                    radius={"lg"}
                    variant={"bordered"}
                    color={"secondary"}
                    className={"w-full sm:w-[30%] text-default-800"}
                    placeholder="جستجو"
                    startContent={<SearchIcon/>}
                    // value={filterValue}
                    // onValueChange={onSearchChange}
                />
                <div className={"flex gap-1"}>
                    <Button color={'danger'} variant={"flat"} radius={"sm"} onClick={() => {
                        setDeleteHistoryModal(!deleteHistoryModal)
                    }}>پاک کردن تاریخچه</Button>
                </div>
            </div>
        );
    }, []);

    /////////////////////////////////////////


    const pages = Math.ceil(users.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return users.slice(start, end);
    }, [page, users]);

    return (
        <>
            <Table
                aria-label="Example table with client side pagination"
                topContent={topContent}
                isStriped
                dir={"ltr"}
                isHeaderSticky
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            dir={"ltr"}
                            showShadow
                            color="secondary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
                bottomContentPlacement="outside"
                topContentPlacement="outside"
                classNames={{
                    wrapper: "h-full",
                }}
            >
                <TableHeader>
                    <TableColumn key="time" className={'text-right'}>تاریخ</TableColumn>
                    <TableColumn key="action" className={"text-right"}>فعالیت</TableColumn>
                    <TableColumn key="total_price" className={"text-right"}>جمع سفارش</TableColumn>
                    <TableColumn key="amount" className={"text-right"}>تعداد</TableColumn>
                    <TableColumn key="price" className={"text-right"}>نرخ</TableColumn>
                    <TableColumn key="product" className={"text-right"}>نام محصول</TableColumn>
                    <TableColumn key="owner" className={"text-right"}>نام و نام خانوادگی</TableColumn>
                </TableHeader>
                <TableBody dir={"rtl"} items={items}>
                    {(item) => (
                        <TableRow key={item.name}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <DeleteHistoryModal deleteHistory={deleteHistoryModal} setDeleteHistory={setDeleteHistoryModal}
                                setChanges={setChange} changes={change}/>
        </>
    );
}
