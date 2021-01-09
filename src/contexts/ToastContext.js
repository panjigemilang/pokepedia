import { createContext, useState } from "react"

export const ToastContext = createContext()

const ToastContextProvider = (props) => {
  const [toast, setToast] = useState(false)
  const [message, setMessage] = useState("")

  return (
    <ToastContext.Provider
      value={{
        toast,
        setToast,
        message,
        setMessage,
      }}
    >
      {props.children}
    </ToastContext.Provider>
  )
}

export default ToastContextProvider
