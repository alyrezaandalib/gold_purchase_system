export function CoinInputs(formData: any, items: any) {
    return [
        {
            isAutoSelect: true,
            placeholder: "انتخاب سکه",
            value: "CoinOptions",
            // isInvalid: formData.CoinOptions === null || formData.CoinOptions.trim() === "",
            validationRegex: /^.+$/,
            Items: items
        },
        {
            label: "نرخ",
            value: "UnitPrice",
            type: "text",
            isAmount: true,
            isRequired: true,
            // isInvalid: formData.UnitPrice === 0 || formData.UnitPrice === undefined || formData.UnitPrice === null,
            validationRegex: /^.+$/,
            message: "لطفا نرخ را وارد کنید."
        }, {
            isAmount: true,
            label: "تعداد",
            isRequired: true,
            value: "Amount",
            type: "text",
            // isInvalid: formData.Amount === 0 || formData.Amount === undefined || formData.Amount === null || formData.Amount > 150,
            validationRegex: /^.+$/,
            message: "لطفا تعداد را وارد کنید حداکثر 150 عدد."
        }, {
            label: "نرخ کل",
            value: "TotalPrice",
            type: "text",
            readOnly: true,
            isAmount: true,

        }
    ]
}

export function GoldInputs(formData: any, items: any) {
    return [
        {
            isAutoSelect: true,
            placeholder: "انتخاب طلای آبشده",
            value: "GoldOptions",
            // isInvalid: formData.GoldOptions === null || formData.GoldOptions.trim() === "",
            validationRegex: /^.+$/,
            Items: items
        },
        {
            label: "نرخ",
            value: "UnitPrice",
            type: "text",
            isAmount: true,
            isRequired: true,
            // isInvalid: formData.UnitPrice === 0 || formData.UnitPrice === undefined || formData.UnitPrice === null,
            validationRegex: /^.+$/,
            message: "لطفا نرخ را وارد کنید."
        }, {
            isAmount: true,
            label: "مثقال",
            isRequired: true,
            value: "Amount",
            type: "text",
            // isInvalid: formData.Amount === 0 || formData.Amount === undefined || formData.Amount === null || formData.Amount > 150,
            validationRegex: /^.+$/,
            message: "لطفا تعداد را وارد کنید حداکثر 150 عدد."
        }, {
            label: "نرخ کل",
            value: "TotalPrice",
            type: "text",
            readOnly: true,
            isAmount: true,
        },
    ]
}


export function ProfileInputs(formData: any) {
    return [
        {
            label: "نام",
            isRequired: true,
            value: "FirstName",
            type: "text",
            // isInvalid: formData.FirstName === "",
            validationRegex: /^.+$/,
            message: "لطفا نام خود را وارد کنید"
        },
        {
            label: "نام خانوادگی",
            isRequired: true,
            value: "LastName",
            type: "text",
            // isInvalid: formData.LastName === "",
            validationRegex: /^.+$/,
            message: "لطفا نام خانوادگی حود را وارد کنید"
        },
        {
            label: "شماره تماس",
            isRequired: true,
            value: "PhoneNumber",
            type: "text",
            // isInvalid: formData.PhoneNumber.trim() === "" || !formData.PhoneNumber.match(/^(\+98|0)?9\d{9}$/),
            validationRegex: /^(\+98|0)?9\d{9}$/,
            message: "لطفا شماره تماس خود را به درستی وارد کنید"
        },
    ]
}


export function SignUpInputs(formData: any) {
    return [
        {
            label: "نام",
            isRequired: true,
            value: "FName",
            type: "text",
            // isInvalid: formData.FName.trim() === "",
            validationRegex: /^.+$/,
            message: "لطفا نام خود را وارد کنید"
        }, {
            label: "نام خانوادگی",
            isRequired: true,
            value: "LName",
            type: "text",
            // isInvalid: formData.LName.trim() === "",
            validationRegex: /^.+$/,
            message: "لطفا نام خانوادگی خود را وارد کنید"
        }, {
            label: "نام کاربری",
            isRequired: true,
            value: "username",
            type: "text",
            // isInvalid: formData.username.trim() === "",
            validationRegex: /^.+$/,
            message: "لطفا نام کاربری را وارد کنید"
        },
        {
            label: "شماره تماس",
            isRequired: true,
            value: "PhoneNumber",
            type: "text",
            // isInvalid: formData.PhoneNumber.trim() === "" || !formData.PhoneNumber.match(/^(\+98|0)?9\d{9}$/),
            validationRegex: /^(\+98|0)?9\d{9}$/,
            message: "لطفا شماره تماس خود را به درستی وارد کنید"
        },
        {
            label: "کد ملی",
            isRequired: true,
            value: "NCode",
            type: "text",
            onClearDisable: false,
            // isInvalid: formData.NCode.trim() === "" || !formData.NCode.match(/^\d{10}$/),
            validationRegex: /^\d{10}$/,
            message: "لطفا یک کدملی معتبر وارد کنید"
        },
        {
            label: "کد پستی",
            isRequired: true,
            value: "PostalCode",
            type: "text",
            // isInvalid: formData.PostalCode.trim() === "" || !formData.PostalCode.match(/^\d{10}$/),
            validationRegex: /^\d{10}$/,
            message: "لطفا یک کدپستی معتبر وارد کنید"
        },
        {
            label: "آدرس",
            isRequired: true,
            value: "Address",
            isTextarea: true,
            // isInvalid: formData.Address.trim() === "",
            validationRegex: /^.+$/,
            message: "لطفا آدرس را وارد کنید"
        },
        {
            label: "رمز عبور",
            isRequired: true,
            value: "Password",
            type: "text",
            // isInvalid: !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.Password.trim()),
            validationRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message: "رمز عبور باید شامل حداقل 8 کاراکتر،یک حرف بزرگ، یک عدد و یک کاراکتر خاص باشد"
        },
    ]
}

export function updateUser(formData: any) {
    return [
        {
            label: "نام",
            isRequired: true,
            value: "FName",
            type: "text",
            // isInvalid: formData.FName.trim() === "",
            validationRegex: /^.+$/,
            message: "لطفا نام خود را وارد کنید"
        }, {
            label: "نام خانوادگی",
            isRequired: true,
            value: "LName",
            type: "text",
            // isInvalid: formData.LName.trim() === "",
            validationRegex: /^.+$/,
            message: "لطفا نام خانوادگی خود را وارد کنید"
        },
        {
            label: "شماره تماس",
            isRequired: true,
            value: "PhoneNumber",
            type: "text",
            // isInvalid: formData.PhoneNumber.trim() === "" || !formData.PhoneNumber.match(/^(\+98|0)?9\d{9}$/),
            validationRegex: /^(\+98|0)?9\d{9}$/,
            message: "لطفا شماره تماس خود را به درستی وارد کنید"
        },
        {
            label: "کد ملی",
            isRequired: true,
            value: "NCode",
            type: "text",
            onClearDisable: false,
            // isInvalid: formData.NCode.trim() === "" || !formData.PostalCode.match(/^\d{10}$/),
            validationRegex: /^\d{10}$/,
            message: "لطفا یک کدملی معتبر وارد کنید"
        },
        {
            label: "کد پستی",
            isRequired: true,
            value: "PostalCode",
            type: "text",
            // isInvalid: formData.PostalCode.trim() === "" || !formData.PostalCode.match(/^\d{10}$/),
            validationRegex: /^\d{10}$/,
            message: "لطفا یک کدپستی معتبر وارد کنید"
        },
        {
            label: "آدرس",
            isRequired: true,
            value: "Address",
            isTextarea: true,
            // isInvalid: formData.Address.trim() === "",
            validationRegex: /^.+$/,
            message: "لطفا آدرس را وارد کنید"
        },
    ]
}

export function addNewGroup(formData: any) {
    return [
        {
            label: "نام",
            isRequired: true,
            value: "name",
            type: "text",
            // isInvalid: formData.name.trim() === "",
            validationRegex: /^.+$/,
            message: "لطفا نام گروه را وارد کنید"
        }, {
            isAmount: true,
            label: "درصد مشارکت",
            isRequired: true,
            value: "amount",
            type: "text",
            // isInvalid: formData.amount === 0 || formData.amount === undefined || formData.amount === null,
            validationRegex: /^[-+]?(\d*\.\d+|\d+)$/,
            message: "لطفا درصد مشارکت را وارد کنید."
        },
    ]
}

export function addNewStaticGroup(formData: any) {
    return [
        {
            label: "نام",
            isRequired: true,
            value: "name",
            type: "text",
            // isInvalid: formData.name.trim() === "",
            validationRegex: /^.+$/,
            message: "لطفا نام گروه را وارد کنید"
        }, {
            isAmount: true,
            label: "مقدار مشارکت",
            isRequired: true,
            value: "amount",
            type: "text",
            // isInvalid: formData.amount === 0 || formData.amount === undefined || formData.amount === null,
            validationRegex: /^.+$/,
            message: "لطفا مقدار مشارکت را وارد کنید."
        },
    ]
}

export function updateGroup(formData: any) {
    return [
        {
            label: "نام",
            isRequired: true,
            value: "name",
            type: "text",
            // isInvalid: formData.name.trim() === "",
            validationRegex: /^.+$/,
            message: "لطفا نام گروه را وارد کنید"
        }, {
            isAutoSelect: true,
            placeholder: "نوع مشارکت",
            value: "type",
            // isInvalid: formData.type === null || formData.type == undefined,
            validationRegex: /^.+$/,
            message: "لطفا یکی از موارد را انتخاب کنید",
            Items: [
                {label: "درصد", value: "percent", key: 1},
                {label: "مقدار ثابت", value: "static", key: 2},
            ]
        }, {
            isAmount: true,
            label: "مقدار مشارکت",
            isRequired: true,
            value: "amount",
            type: "text",
            // isInvalid: formData.amount === 0 || formData.amount === undefined || formData.amount === null,
            validationRegex: /^.+$/,
            message: "لطفا مقدار مشارکت را وارد کنید."
        },
    ]
}
