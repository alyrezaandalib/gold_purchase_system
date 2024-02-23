import {Spinner} from "@nextui-org/react";
export default function Loading() {
    return (
        <div className={`flex justify-center items-center w-full h-full`}>
            <Spinner size={"lg"} color="secondary"/>
        </div>
    );
}
