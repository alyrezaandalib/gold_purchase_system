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
    Pagination,
    SortDescriptor, Button
} from "@nextui-org/react";
import {SearchIcon} from "@/public/SearchIcon";
import Timer from "@/components/Timer";
import {getAllOpenTransactions} from "@/services/client/openTransactions/getAllOpenTransactions";
import {getProductByName} from "@/services/client/products/getProductByName";
import {transactionRegistration} from "@/services/client/openTransactions/transactionRegistration";
import {useRouter} from "next/navigation";
import {rejectTheTransaction} from "@/services/client/openTransactions/rejectTheTransaction";
import Link from "next/link";
import checkRole from "@/services/server/check-role";

interface Transaction {
    id: number;
    name: string;
    time: string;
    price: string;
    amount: string;
    owner: any;
    product: any;
}

export default function OrdersPage() {
    const router = useRouter()
    // ** get all transactions////////////
    const [openTransactions, setOpenTransactions] = useState<Transaction[]>([])
    const [ProductName, setProductName] = useState()

    useEffect(() => {
        const response = getAllOpenTransactions()
        response
            .then((response) => {
                if (response.status === 200) {
                    // console.log('RESPONSE OPENS >>>', response.data)
                    const data = response.data || [];
                    setOpenTransactions(data);
                }
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }, [openTransactions.length]);


    type User = typeof openTransactions[0];
    // ** for next ui and table
    const [filterValue, setFilterValue] = React.useState("");
    const rowsPerPage = 10
    const [sortDescriptor] = React.useState<SortDescriptor>({});

    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...openTransactions];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        return filteredUsers;
    }, [openTransactions, hasSearchFilter, filterValue]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: User, b: User) => {
            const first = a[sortDescriptor.column as keyof User] as number;
            const second = b[sortDescriptor.column as keyof User] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const convertUnit = (unit: string) => {
        const convert_list: any = {
            number: 'عدد',
            gram: 'گرم',
        }
        return convert_list[unit]
    }

    const [roles, setRoles] = useState()

    useEffect(() => {
        const getRoles = async () => {
            const res = await checkRole()
            setRoles(res['role'])
        }
        getRoles()
    }, [roles]);

    const renderCell = React.useCallback((transaction: User, columnKey: React.Key, openTR: any, setOpenTR: any) => {
        const cellValue = transaction[columnKey as keyof User];
        switch (columnKey) {
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Button radius={"sm"} color={"secondary"} variant={"flat"} onClick={() => {
                            const response = transactionRegistration(transaction.id)
                            response
                                .then((response) => {
                                    if (response.status === 200) {
                                        toast.success("سفارش تایید شد.")
                                        setOpenTransactions([])
                                    }
                                })
                                .catch((error) => toast.error(error.message))
                        }}>تایید</Button>
                        <Button radius={"sm"} color={"danger"} variant={"light"} onClick={() => {
                            const response = rejectTheTransaction(transaction.id)
                            // console.log(response)
                            response
                                .then((response) => {
                                    if (response.status === 200) {
                                        toast.success("سفارش رد شد.")
                                        setOpenTransactions([])
                                    }
                                })
                                .catch((error) => toast.error(error.message))
                        }}>رد</Button>
                    </div>
                );

            case "time":
                return (
                    <Timer transaction={transaction} openTransactions={openTR} setOpenTransactions={setOpenTR}/>
                );
            case "product":
                return (
                    <div>{transaction.product.name}</div>
                );
            case "amount":
                return (
                    <div>{transaction.amount + ' ' + convertUnit(transaction.product.unit)}</div>
                );
            case "owner":
                return (
                    <div>{`${transaction.owner.first_name}` + ' ' + `${transaction.owner.last_name}`}</div>
                );
            case "totalPrice":
                // @ts-ignore
                return (transaction.amount * Number(transaction.price) / 10).toLocaleString()

            case "price":
                return (Number(transaction.price) / 10).toLocaleString()
            default:
                return cellValue;
        }
    }, []);

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
        if (roles == 'fellow' && roles) {
            return (
                <div className="flex justify-between  gap-3 items-center">
                    <Input
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
                    <Button color={'secondary'} radius={"sm"}>
                        <Link href={'/new-transaction'}>درخواست
                            جدید
                        </Link>
                    </Button>

                </div>
            );
        } else {
            return (
                <div className="flex justify-between  gap-3 items-center">
                    <Input
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

                </div>
            );
        }

    }, [filterValue, onSearchChange, onClear, roles]);

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
                {
                    roles == 'admin' ? <TableHeader>
                            <TableColumn key="actions" className={"text-left"}>عملیات ها</TableColumn>
                            <TableColumn key="time" className={"text-right"}>زمان باقیمانده</TableColumn>
                            <TableColumn key="totalPrice" className={"text-right"}>نرخ کل</TableColumn>
                            <TableColumn key="amount" className={"text-right"}>تعداد</TableColumn>
                            <TableColumn key="price" className={"text-right"}>نرخ</TableColumn>
                            <TableColumn key="product" className={"text-right"}>نام محصول</TableColumn>
                            <TableColumn key="owner" className={"text-right"}>نام و نام خانوادگی</TableColumn>
                        </TableHeader> :
                        <TableHeader>
                            <TableColumn key="time" className={"text-right"}>زمان باقیمانده</TableColumn>
                            <TableColumn key="totalPrice" className={"text-right"}>نرخ کل</TableColumn>
                            <TableColumn key="amount" className={"text-right"}>تعداد</TableColumn>
                            <TableColumn key="price" className={"text-right"}>نرخ</TableColumn>
                            <TableColumn key="product" className={"text-right"}>نام محصول</TableColumn>
                            <TableColumn key="owner" className={"text-right"}>نام و نام خانوادگی</TableColumn>
                        </TableHeader>
                }

                <TableBody emptyContent={"کاربری یافت نشد"} dir={"rtl"} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) =>
                                <TableCell>{renderCell(item, columnKey, openTransactions, setOpenTransactions)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

        </>
    );
}
