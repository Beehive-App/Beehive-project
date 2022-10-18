import { collection, getDocs } from "firebase/firestore/lite";
import { FirestoreDB } from "../firebase/config";

export const loadUserSections = async(uid='')=> {
    if (uid == '') throw new Error('El id del usuario no existe.');

    const collectionRef = collection(FirestoreDB,`${uid}/tasks/userSections`);
    const docs = await getDocs(collectionRef);  
    const sections = []; 
    
    docs.forEach(doc=>{
        sections.push({id:doc.id,...doc.data()})
    })
    return sections;
}
