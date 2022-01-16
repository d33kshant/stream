import { createContext } from "react"

export const ThemeContext = createContext({ theme: 'light', toggleTheme: ()=>{} })
const ThemeProvider =  ThemeContext.Provider
export default ThemeProvider