import { arrayUnion, collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirestoreDB } from "../../firebase/config";
import { loadUserSections } from "../../helpers/loadUserSections";
import { addNewtask, completeTasksSection, createNewSection, deleteSectionById, setSections } from "./tasksSlice";

export const startLoadingUserSections = ()=>{
    return async (dispatch,getState)=>{
        const {uid} = getState().auth; 
        if(!uid) throw new Error('Usuario no encontrado.'); 
        const userSections = await loadUserSections(uid);
        dispatch(setSections(userSections)) 
    }
}

export const startCreatingNewSection = ({sectionTitle,sectionDescription,sectionColor='#f1f1f1',sectionFav})=>{
    return async(dispatch,getState)=>{
        try{
            const {uid} = getState().auth; 
            const section = {
                sectionTitle,
                sectionDescription,
                sectionColor,
                sectionFav,
                tasks:[],
            }
            const newDoc = doc(collection(FirestoreDB,`${uid}/tasks/userSections`));
            await setDoc(newDoc,section); 
            //Section id. 
            section.id = newDoc.id; 
            dispatch( createNewSection(section) ) 
            return {ok:true}; 
        }
        catch(error){
            return {ok:false}; 
        }
    }
}
//Función que se encarga de la funcionalidad del módulo de tareas: Crear, completar, eliminar y actualizar. También se encarga de actualizar la configuración de los espacios
export const updateSection = ()=>{
    return async(dispatch,getState)=>{
        try {
            const {uid} = getState().auth;
            const {activeSection,userSections} = getState().tasks
            const url = `${uid}/tasks/userSections/${activeSection.id}/`; 
            const docRef = doc(FirestoreDB,url);
            await setDoc(docRef,activeSection,{merge:true});

            const newUserSections = [...userSections];
            const sectionIndex = newUserSections.findIndex(obj=>obj.id === activeSection.id); 
            newUserSections.splice(sectionIndex,1);
            newUserSections.push(activeSection)

            dispatch(completeTasksSection({newUserSections}));
            
            return {ok:true}; 
        } catch (error) {
            console.error(error);
            return {ok:false}; 
        }
    }
} 
export const startDeletingSection = ()=>{
    return async (dispatch,getState)=>{
        const {uid} = getState().auth;
        const {activeSection} = getState().tasks;

        const docRef = doc(FirestoreDB,`${uid}/tasks/userSections/${activeSection.id}`); 
        await deleteDoc(docRef);
        
        dispatch(deleteSectionById(activeSection.id)); 
    }
}


