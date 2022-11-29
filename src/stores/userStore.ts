import {defineStore} from 'pinia'


// useStore可以是任何类似useUser、useCart的东西
// 第一个参数是应用程序中 Store 的唯一id
export const userStore = defineStore('userInfo', {
    state: () => {
        return {
            // 所有这些属性都将自动推断其数据类型
            isAuthorization: false,
            token: '',
        }
    },
    getters: {},
    actions: {}
})
