import { arrayUnion, collection, doc, setDoc } from "firebase/firestore/lite";
import { FirestoreDB } from "../../firebase/config";
import { loadUserSections } from "../../helpers/loadUserSections";
import { addNewtask, completeTasksSection, createNewSection, setSections } from "./tasksSlice";

export const startLoadingUserSections = ()=>{
    return async (dispatch,getState)=>{
        const {uid} = getState().auth; 
        if(!uid) throw new Error('Usuario no encontrado.'); 
        const userSections = await loadUserSections(uid);
        dispatch(setSections(userSections)) 
    }
}


export const startCreatingNewSection = ({sectionTitle,sectionDescription,sectionColor='',sectionFav})=>{
    return async(dispatch,getState)=>{
        try{
            if(sectionColor === ''){
                
            }

            const {uid} = getState().auth; 
            const section = {
                sectionTitle,
                sectionDescription,
                sectionColor,
                sectionFav,
                tasks:[],
            }
            const newDoc = await doc(collection(FirestoreDB,`${uid}/tasks/userSections`));
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
export const startCreatingNewtask = ({description,endDate,taskPriority})=>{
    return async(dispatch,getState)=>{
        try{
            const {uid} = getState().auth;
            const {activeSection,userSections} = getState().tasks; 

            const task = {
                tid:"id" + Math.random().toString(16).slice(2),
                description,
                completed:false,
                endDate,
                priority:taskPriority,
            }
            let sectionToUpdate = {...activeSection}
            sectionToUpdate.tasks = [...sectionToUpdate.tasks,task];

            delete sectionToUpdate.id; 
            const url = `${uid}/tasks/userSections/${activeSection.id}/`; 
            const docRef = doc(FirestoreDB,url);
            await setDoc(docRef,sectionToUpdate,{merge:true});
            const newUserSections = [...userSections];
            const sectionIndex = newUserSections.findIndex(obj=>obj.id === activeSection.id); 
            newUserSections.splice(sectionIndex,1);
            newUserSections.push(sectionToUpdate)

            dispatch( addNewtask({sectionToUpdate,newUserSections}) ) 
            return {ok:true}; 
        }
        catch(error){
            console.error(error)
            return {ok:false}; 
        }
    }
}

export const updateSection = ()=>{
    return async(dispatch,getState)=>{
        try {
            //TODO: DISPATCH COMPLETING NOTE
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


