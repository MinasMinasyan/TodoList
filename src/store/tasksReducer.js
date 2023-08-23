import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toDoList: [],
    taskEditObj: null,
    checkedTasks: [],
    successMessage: null,
    errorMessage: null,
}
const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        getAllTasks(state, action) {
            state.toDoList = [...action.payload]
        },

        removeSingleTask(state, action) {
            state.toDoList = state.toDoList.filter(item => action.payload !== item.id)
        },

        addNewTask(state, action) {
            state.toDoList = [
                ...state.toDoList,
                action.payload
            ]
        },

        editTask(state, action) {
            state.taskEditObj = action.payload;
        },
        putEditedTaskOnList(state, action) {
            let index = state.toDoList.findIndex((item) => item.id === action.payload.data.id);
            state.toDoList[index] = action.payload.data;
        },

        saveCheckedTasks(state, action) {

            const id = action.payload;
            const index = state.checkedTasks.indexOf(id);
            if (index === -1) {
                state.checkedTasks.push(id);
            } else {
                state.checkedTasks.splice(index, 1);
            }
        },

        cleanCheckedTassk(state) {
            state.checkedTasks = [];
        },

        setSuccessMessage(state, action) {
            state.successMessage = action.payload;

        },
        setErrorMessage(state, action) {
            state.errorMessage = action.payload
        }
    }


})


export const {
    getAllTasks,
    removeSingleTask,
    addNewTask,
    editTask,
    putEditedTaskOnList,
    saveCheckedTasks,
    cleanCheckedTassk,
    setSuccessMessage,
    setErrorMessage
} = taskSlice.actions;
export default taskSlice.reducer;