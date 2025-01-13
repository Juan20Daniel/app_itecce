import { expretions } from "./expretions";
export const check = (camp, value) => {
    if(expretions[camp].test(value)) return true;
    return false;
}
