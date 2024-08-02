import { Category } from "@/interfaces";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface ContextState {
    currentCategory: Category, setCurrentCategory: Dispatch<SetStateAction<Category>>
}

const StateContext = createContext<ContextState | undefined>(undefined);


export const ContextProvider = ({ children }: { children: ReactNode }) => {

    const [currentCategory, setCurrentCategory] = useState<Category>({} as Category)

    return (
        <StateContext.Provider value={{
            currentCategory, setCurrentCategory,
        }} >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => {
    const context = useContext(StateContext)
    if (!context) {
        throw new Error("useStateContext must be used within a Provider")
    }
    return context;
}