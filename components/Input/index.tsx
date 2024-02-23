import {useState} from "react";
import {Input, AutocompleteItem, Textarea, Select} from "@nextui-org/react";

export default function CustomInput({InputValue, formData, setFormData}: any) {

    const [inputError, setInputError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (value: string) => {
        formData[InputValue.value] = value;
        setFormData({...formData});
        validateInput(value);
    };

    const validateInput = (value: string) => {
        if (InputValue.validationRegex) {
            const regex = new RegExp(InputValue.validationRegex);
            if (!regex.test(value)) {
                setInputError(true);
                setErrorMessage(InputValue.message);
                return;
            }
        }

        setInputError(false);
        setErrorMessage('');
    };

    return (
        InputValue.isTextarea ? (
                <Textarea
                    placeholder={InputValue.placeholder}
                    isRequired={InputValue.isRequired}
                    label={InputValue.label}
                    variant={"bordered"}
                    color={"secondary"}
                    size={"sm"}
                    errorMessage={inputError && errorMessage}
                    isInvalid={inputError}
                    value={formData[InputValue.value]}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const {value} = event.target;
                        handleInputChange(value)
                    }}
                    onBlur={() => {
                        validateInput(formData[InputValue.value]);
                    }}
                />
            ) :
            InputValue.isAmount ?
                <Input
                    isRequired={InputValue.isRequired}
                    variant="bordered"
                    label={InputValue.label}
                    type={InputValue.type}
                    size={'sm'}
                    isInvalid={inputError}
                    color={
                        inputError ? 'danger' : 'secondary'
                    }
                    errorMessage={inputError && errorMessage}
                    value={formData[InputValue.value]}
                    onChange={(event: any) => {
                        const {value} = event.target;
                        const NewValue = event.target.value = value.replace(/\D/g, '');
                        formData[InputValue.value] = Number(NewValue);
                        setFormData({...formData});
                        validateInput(NewValue);
                    }}
                    onBlur={() => {
                        validateInput(formData[InputValue.value]);
                    }}
                    className="w-full"
                /> :
                InputValue.isAutoSelect ? (
                        <Select
                            dir={"ltr"}
                            classNames={{
                                innerWrapper: "w-full",
                                value: "text-right",
                                selectorIcon: "left-3"
                            }}
                            variant={"bordered"}
                            color={"secondary"}
                            size={"sm"}
                            placeholder={InputValue.placeholder}
                            onChange={(e) => {
                                formData[InputValue.value] = e.target.value
                                setFormData({...formData})
                            }}
                            errorMessage={inputError && errorMessage}
                            isInvalid={inputError}
                        >
                            {InputValue.Items.map((item: any) =>
                                <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
                            )}
                        </Select>
                    )
                    :
                    <Input
                        isRequired={InputValue.isRequired}
                        readOnly={InputValue.readOnly}
                        variant="bordered"
                        label={InputValue.label}
                        type={InputValue.type}
                        size={'sm'}
                        isInvalid={inputError}
                        color={
                            inputError ? 'danger' : 'secondary'
                        }
                        errorMessage={inputError && errorMessage}
                        value={formData[InputValue.value]}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const {value} = event.target;
                            if (InputValue.value === 'NCode' || InputValue.value === 'PhoneNumber' || InputValue.value === 'PostalCode') {
                                const NewValue = event.target.value = value.replace(/\D/g, '');
                                handleInputChange(NewValue);
                            } else {
                                handleInputChange(value);
                            }
                        }}
                        onBlur={() => {
                            validateInput(formData[InputValue.value]);
                        }}
                        className="w-full"
                    />
    )
}
