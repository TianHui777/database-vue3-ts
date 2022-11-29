import service from '../index'

// 登录接口所需要的数据
interface loginData {
    username: string
    password: string
}

//登录接口
export function login(auth: loginData) {
    return service({
        url: "/login",
        method: "GET",
        auth
    })
}
