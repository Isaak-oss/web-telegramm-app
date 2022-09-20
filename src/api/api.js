import axios from "axios";
import {useDispatch} from "react-redux";

//let accessToken = JSON.parse(localStorage.getItem('access_token'))
// if (!accessToken) {
//     axios.post(`https://4143-217-29-24-186.ngrok.io/api-bot/userbot/auth`, {id: 74123})
//         .then(res => {
//                 localStorage.setItem('access_token', JSON.stringify(res.data.access))
//             }
//         )
// }
//
// let instance = axios.create({
//     baseURL: 'https://4143-217-29-24-186.ngrok.io/',
//     headers: {
//         Authorization: `Bearer ${accessToken}`
//     }
// })
//
//
// export const MainApi = {
//     getUsersList() {
//         return axios.get(`https://4143-217-29-24-186.ngrok.io/api-bot/userbot`, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`
//             }
//         })
//     },
// }
//
// export const ProfileApi = {
//     getProfileData() {
//         return instance.get(`api-bot/userbot/me`)
//     },
//     putProfileData(id, data) {
//         return instance.put(`api-bot/userbot/${id}`, data)
//     },
//     getStrengthsList() {
//         return instance.get(`api-bot/userbot/list_strengths`)
//     },
//     putNewStrengths(id) {
//         return instance.put(`api-bot/userbot/add_strengths_me`, id)
//     }
// }
//
// export const AuthApi = {
//     getAccessToken() {
//         return instance.post(`api-bot/userbot/auth`, {id: 74123})
//     },
// }

