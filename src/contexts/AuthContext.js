import { createContext } from "react"

export const AuthContext = createContext({ user: null, login: (user)=>{}, logout: ()=>{} })
const AuthProvider = AuthContext.Provider
export default AuthProvider