import { useState, useEffect } from "react";

export const useInfoNavigator = () => {
    const [ isEdge, setIsEdge ] = useState(false);
    useEffect(() => {
        const userAgent = window.navigator.userAgent;
        if(userAgent.includes('Edg')) {
            setIsEdge(true);
        }
    },[]);
    return { isEdge }
}