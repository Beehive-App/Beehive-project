import { createSlice } from '@reduxjs/toolkit';
    export const tasksSlice = createSlice({
        name: 'tasks',
        initialState: {
            userSections:[],
            labels:[],
            favSections:[],
            isSaving:false,
            messageSaved:'',
            activeSection:null,
            activeDay:new Date().getTime(),
            activeTab:0
        },
    reducers: {
        setSections: (state,action) => {
            state.userSections = action.payload
        },
        createNewSection: (state,action)=>{
            state.userSections.push(action.payload)
            state.isSaving = false;
            state.messageSaved=`${action.payload.sectionTitle} guardado con éxito.`
        },
        resetUserSections: (state)=>{
            state.userSections = [];
            state.labels = [];
            state.favSections = [];
            state.isSaving = false;
            state.messageSaved = '';
            state.activeSection = null; 
        },
        setActiveSection: (state,{payload})=>{
            state.activeSection = {
                id:payload.id,
                sectionTitle:payload.sectionTitle,
                sectionDescription:payload.sectionDescription,
                sectionColor:payload.sectionColor,
                sectionFav:payload.sectionFav,
                tasks:payload.tasks,
                isConfiguring:false,
            }
        },
        setIsConfigSection:(state,{payload})=>{
            state.activeSection.isConfiguring = !state.activeSection.isConfiguring;
        },
        unsetActiveSection:(state)=>{
            state.activeSection = null;
        },
        setActiveDay:(state,{payload})=>{
            state.activeDay = payload; 
        },
        addNewtask:(state,{payload})=>{
            state.activeSection = payload.sectionToUpdate;
            state.userSections  = payload.newUserSections;
        },
        setTasks:(state,{payload})=>{
            state.activeSection.tasks = payload;
        },
        completeTasksSection:(state,{payload})=>{
            state.userSections = payload.newUserSections;
        },
        setActiveTab:(state,{payload})=>{
            state.activeTab = payload;
        }
    }
});
export const { setIsConfigSection,setTasks,setActiveTab,completeTasksSection,addNewtask,setActiveDay,setSections,createNewSection,resetUserSections,setActiveSection,unsetActiveSection } = tasksSlice.actions;