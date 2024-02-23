import http from "@/services/http";

export const checkLogin = async (loginForm: any) => {

    const body = {
        username: loginForm.userName,
        password: loginForm.passWord
    };

    return http.post("", body);
};
