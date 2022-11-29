// 登录接口所需要的数据
import service from "@/request";

interface getRoleData {
    username: string
    password: string
}

//登录接口
export function getUserAndRole(auth: getRoleData, data: getRoleData) {
    return service({
        url: "/login",
        method: "POST",
        auth,
        data

    })
}
