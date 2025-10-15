import {toast} from 'react-toastify'

export const toastSucces = (message : string) =>{
    return(
        toast.success(message, {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
              })
    )
}

export const toastError = (message : string) =>{
    return(
        toast.error(message, {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
              })
    )
}

export const toastWarn = (message : string) =>{
    return(
        toast.warn(message, {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
              })
    )
}