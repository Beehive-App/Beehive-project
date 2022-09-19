import { useState } from "react";

export const useTemporalDrawer = ()=>{


const [open, setOpen] = useState(false)
const toggleDrawer = (value)=> (e)=> {
    if (e.type === 'keydown' && e.key != 'Esc') return;
  
      setOpen(value);
}

    return ({
            open,
            toggleDrawer
        }); 

}