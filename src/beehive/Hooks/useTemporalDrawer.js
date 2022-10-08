import { useState } from "react";

export const useTemporalDrawer = (isMobileView=false)=>{

const [open, setOpen] = useState(false)
const toggleDrawer = (value)=> (e)=> {

    if (e.type === 'keydown' && e.key != 'Esc') return;
    if(isMobileView) return;
      setOpen(value);
}

    return ({
            open,
            toggleDrawer
        }); 

}