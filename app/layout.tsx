import type {Metadata} from 'next'
import './globals.css'
import Header from "@/components/Commons/Header";
import FooterMenuMobile from "../components/Commons/FooterMenuMobile";
import {headers} from "next/headers";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
    title: 'سامانه خرید و فروش سکه و طلا آبشده',
    description: '',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    const pathname = headers().get('x-pathname')
    return (
        <html lang="fa" dir={"rtl"}>
        <body className={`w-full h-[100vh] flex items-start bg-primary `}>
        <ToastContainer
            className={"text-sm"}
            position="bottom-left"
            autoClose={1600}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            rtl={true}
            closeButton={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="light"
        />
        {/*// ** mobileTabs*/}
        {(pathname != "/login" && pathname != `/signup/}`) ? <Header/> : ""}
        <div className={"w-full mt-[3.875rem]"} style={{height: "calc(100vh - 8.2rem)"}}>{children}</div>
        {/*// ** mobileTabs*/}
        <div className={"flex justify-center items-center w-full fixed bottom-0"} dir={"ltr"}>
            {(pathname != "/login" && pathname != `/signup`) ? <FooterMenuMobile/> : ''}
        </div>
        </body>
        </html>
    )
}
