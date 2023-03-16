import { useState, createContext } from "react";


const ThemeContext = createContext()

function ThemeProvider({children}) {
    const [token, setToken] = useState("");
    const [toggle, setToggle] = useState(false);
    const [activeButton, setActiveButton] = useState('trang-chu');
    
    const updateToggle = (newValue) => {
        setToggle(newValue);
    }
    const updateButton = (newValue) => {
        setActiveButton(newValue);
    }
    const updateToken = (newValue) => {
        setToken(newValue);
    }
    console.log(activeButton);
    const value = {
        activeButton,
        updateButton,
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