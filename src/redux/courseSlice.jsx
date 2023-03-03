import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filter:[],
    Id:[],
    video:[],
    lessonId: [],
    pausedModalDetails: [],
} 

const courseSlice = createSlice({
    name: 'Course',
    initialState,
    reducers:{
        AddFilter: (state, action)=>{
            state.filter = action.payload;
            console.log("store filter data", state.filter);
        },
        AddId: (state, action)=>{
            state.Id=action.payload;
            console.log("store id got hit",state.Id);
            localStorage.setItem("courseId", JSON.stringify(state.Id));
        },
        AddVideo:(state, action)=>{
            state.video = action.payload;
            console.log("store video", state.video);
        },
        AddLessonId:(state, action)=>{
            state.lessonId = action.payload;
            console.log("store lesson id", state.lessonId);
        },
        AddPausedModalDetails: (state, action)=>{
            state.pausedModalDetails = action.payload;
            console.log("store modal details", state.pausedModalDetails);
        }
    }
})


export const {AddFilter,AddId,AddVideo, AddLessonId, AddPausedModalDetails} = courseSlice.actions;
export default courseSlice.reducer;