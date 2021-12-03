import axios from 'axios';
import URLs from './URLs';

const appkey = 'q6869336_1590735460309';
const ajax = axios.create({
    baseURL: URLs.baseURL,
    params: {
        appkey,
    },
})

ajax.interceptors.response.use((data) => {
    const newData = data.data
    if (newData.status === 'success') {
        return newData
    } else {
        return Promise.reject(newData.msg);
    }
})

const login = (data) => ajax.post(URLs.login, `appkey=${appkey}&${data}`)
const logon = (data) => ajax.post(URLs.logon, `appkey=${appkey}&${data}`)
const findByPage = (page, size) => ajax.get(URLs.findByPage, {
    params: {
        page,
        size,
    },
})

const updateStu = (options) => ajax.get(URLs.updateStu, {
    params: {
        ...options,
    },
});

const addStu = (options) => ajax.get(URLs.addStu, {
    params: {
        ...options,
    },
});

const delStu = (sNo) => ajax.get(URLs.delSno, {
    params: {
        sNo,
    },
});

const checkStu = (options) => ajax.get(URLs.checkStu, {
    params: {
        ...options,
    },
});


export default {
    login,
    logon,
    findByPage,
    updateStu,
    addStu,
    delStu,
    checkStu
}