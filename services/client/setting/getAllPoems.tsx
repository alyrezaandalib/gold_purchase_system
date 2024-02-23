import http from "@/services/http";

export const getAllPoems = async () => {

    return await http.get("")
};
