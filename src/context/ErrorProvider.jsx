import React,{useState} from 'react'

export const ErrorContext = React.createContext(null)


function ErrorProvider({children}) {

    let [errorMessage,setErrorMessage] = useState("")

  return (
    <ErrorContext.Provider value ={{errorMessage,setErrorMessage}}>
       {children}
    </ErrorContext.Provider>
  )
}

export  default ErrorProvider 