import { useState, createContext } from "react";


const ThemeContext = createContext()

function ThemeProvider({children}) {
    const [token, setToken] = useState("");
    const [toggle, setToggle] = useState(false);
    const [activeButton, setActiveButton] = useState('btnQLDASV');
    const updateToggle = (newValue) => {
        setToggle(newValue);
    }
    const updateButton = (newValue) => {
        setActiveButton(newValue);
    }
    const updateToken = (newValue) => {
        setToken(newValue);
    }
    const value = {
        toggle,
        activeButton,
        updateButton,
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