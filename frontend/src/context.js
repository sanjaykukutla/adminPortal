import { useState,useContext,createContext } from "react";
//usecontext and provider

const TokenContext = createContext();

const Context = () => {
    const [user, setUser] = useState(null);
    const [employee, setEmployee] = useState([]);
    return { user, setUser, employee, setEmployee };
}

export default Context;