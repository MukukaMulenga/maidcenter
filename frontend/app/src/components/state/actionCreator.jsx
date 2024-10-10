import { GETDATA,SET_PROFILE,ADD_NOTIFICATIONS,GET_MESSAGES } from "./actionType";



export const get_data = (data)=>({
    type:GETDATA,
    payload:data
})

export const set_profile = (profile)=>({
    type:SET_PROFILE,
    payload:profile
})

export const add_notifications = (notification)=>({
    type:ADD_NOTIFICATIONS,
    payload:notification
})

export const get_messages = (message)=>({
    type:GET_MESSAGES,
    payload:message
})