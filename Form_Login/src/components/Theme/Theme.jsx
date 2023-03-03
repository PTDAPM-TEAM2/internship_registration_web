import { useState, createContext } from "react";


const ThemeContext = createContext()

function ThemeProvider({children}) {
    const [toggle, setToggle] = useState(false);
    const updateToggle = (newValue) => {
        setToggle(newValue);
    }
    const value = {
        toggle,
        updateToggle,
    }
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProvider} 