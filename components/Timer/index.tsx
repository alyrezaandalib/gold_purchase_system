import React, {useState, useEffect, useRef} from "react";

export const Timer = ({transaction, openTransactions, setOpenTransactions}: any) => {
    const providedDate: any = new Date(transaction.expire_time);
    const currentTime: any = new Date();
    const timeDifferenceInMillis: number = providedDate - currentTime;
    const timeDifferenceInSeconds: number = timeDifferenceInMillis / 1000;

    /////////////////////////////////////////////

    const [delay, setDelay] = useState(+timeDifferenceInSeconds);
    const minutes = Math.floor(delay / 60);
    const seconds = Math.floor(delay % 60);
    const delayRef = useRef<number>(delay);

    useEffect(() => {
        const timer = setInterval(() => {
            delayRef.current = delayRef.current > 0 ? delayRef.current - 1 : delayRef.current;
            setDelay(delayRef.current);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (delayRef.current <= 0) {
            const filteredID = transaction.id
            const filteredItems = openTransactions.filter((item: any) => item.id !== filteredID)
            setOpenTransactions(filteredItems)
        }
    }, [delay, openTransactions, setOpenTransactions, transaction.id]);

    return (
        <>
            <span>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
        </>
    );
};

export default Timer;
