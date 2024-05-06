import { useState } from 'react';
import { useInfoNavigator } from '../../hooks/useInfoNavigator';
export const InputGroupViewModel = () => {
    
    const [ showPass, setShowPass ] = useState(false);
    const { isEdge } = useInfoNavigator();
    
    return {isEdge, showPass, setShowPass}
}