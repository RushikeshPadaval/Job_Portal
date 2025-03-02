import { createContext } from "react";

const AppContext = createContext() 

export const AppContextProvider=()=>{

    const value={

    }
    return (<AppContextProvider value={value} >
        {props.children}

    </AppContextProvider>)
}