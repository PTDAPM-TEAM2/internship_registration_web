import { useState, createContext } from "react";


const ThemeContext = createContext()

function ThemeProvider({children}) {
    const [toggle, setToggle] = useState(false);
    const [activeButton, setActiveButton] = useState('btnQLDASV');
    const updateToggle = (newValue) => {
        setToggle(newValue);
    }
    const updateButton = (newValue) => {
        setActiveButton(newValue);
    }
    const value = {
        toggle,
        activeButton,
        updateButton,
        updateToggle,
    }
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProvider} 