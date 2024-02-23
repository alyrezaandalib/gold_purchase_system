'use client'
import {Button, Card} from "@nextui-org/react";
import {TypeAnimation} from "react-type-animation";
import CustomInput from "@/components/Input";
import {useState} from "react";
import { SignUpInputs} from "@/Json/inputs";

export default function Signup(){

    const [signupData, setSignupData] = useState<any>({
   FName:"",
   LName:"",
   PhoneNumber:"",
   NCode:"",
   PostalCode:"",
   Address:"",
   Password:"",
    })
    const signupInputs = SignUpInputs(signupData)

    return(
        <div className="p-10 h-full flex flex-col justify-center items-center">
            <Card className="max-w-full w-[350px] h-fit p-5 pl-4 pt-7 overflow-y-scroll">
                <div className={"mb-5"}>
                    <TypeAnimation
                        preRenderFirstString={true}
                        sequence={[
                            500,
                            'سلام',
                            1000,
                            'به سامانه موسوی گلد خوش آمدید.',
                        ]}
                        speed={50}
                        style={{fontSize: '1em'}}
                        repeat={Infinity}
                    />
                </div>
                <form className="flex flex-col gap-3">
                    {signupInputs.map((item: any, index: any) =>
                        <CustomInput key={index} InputValue={item} formData={signupData}
                                     setFormData={setSignupData}/>
                    )}
                    <div className="flex gap-2 justify-end">
                        <Button radius={"sm"} fullWidth color="secondary" isDisabled={signupInputs.some((input:any) => input.isInvalid)}>
                            ورود
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}