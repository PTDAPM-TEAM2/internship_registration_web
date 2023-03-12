import { useState, createContext } from "react";


const ThemeContext = createContext()

function ThemeProvider({children}) {
    const [token, setToken] = useState("");
    const [toggle, setToggle] = useState(false);
    const [activeButton, setActiveButton] = useState("trangchu"); 
    const updateToggle = (newValue) => {
        setToggle(newValue);
    }

    const updateToken = (newValue) => {
        setToken(newValue);
    }

    const updateButton = (newValue) => {
        setActiveButton(newValue);
    }

    const value = {
        toggle,
        updateToggle,
        token,
        updateToken,
        activeButton,
        updateButton
    }
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProvider} 