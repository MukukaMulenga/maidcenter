import { initialState } from "./initialState";
import { ADD_NOTIFICATIONS, GETDATA, SET_PROFILE,GET_MESSAGES } from "./actionType";

export const reducer = (state=initialState,action)=>{
    switch(action.type){
        case GETDATA:return{
            ...state,data:action.payload
        }
        case SET_PROFILE:return{
            ...state,profile:action.payload
        }
        case ADD_NOTIFICATIONS:return{
            ...state,notification:action.payload
        }
        case GET_MESSAGES:return{
            ...state,messages:action.payload
        }
        default:
            return state
    }
}