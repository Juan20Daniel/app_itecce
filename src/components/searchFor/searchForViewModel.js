import { useState } from "react";
import { select } from "../../functions";
var count = 1;
export const SearchFormViewModel = (searchBy, setSearchBy, clearSearchInputs) => {
    const [ fullname, setFullname ] = useState([
        { id:1, active:true },
        { id:2, active:false },
        { id:3, active:false }
    ]);
    const [ btnLeft, setBtnLeft ] = useState(false);
    const [ btnRigth, setBtnRigth ] = useState(true);
    const searchOption = (option) => {
        if(option === '') return ;
        setSearchBy(option);
        if(searchBy === option) return;
        clearSearchInputs();
    }
    const increment = () => {
        if(count === 2) setBtnRigth(false);
        if(count === 3) return;
        count++;
        setFullname(select(fullname, count));
        if(count > 1) setBtnLeft(true);
    }
    const decrement = () => {
        if(count === 2) setBtnLeft(false);
        if(count === 1) return; 
        count--;
        setFullname(select(fullname, count));
        if(count < 3) setBtnRigth(true);
    }
    return {btnLeft, btnRigth, fullname, searchOption, increment, decrement}
}