import { useState, createContext } from "react";


const ThemeContext = createContext()

function ThemeProvider({children}) {
    const [token, setToken] = useState("");
    const [toggle, setToggle] = useState(false);
    const updateToggle = (newValue) => {
        setToggle(newValue);
    }

    const updateToken = (newValue) => {
        setToken(newValue);
    }


    const value = {
        toggle,
        updateToggle,
        token,
        updateToken
    }
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProvider} 