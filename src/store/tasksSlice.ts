import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState: [] as TaskItem[],
  reducers: {
    addTask: {
      reducer(state, action: PayloadAction<TaskItem>) {
        state.push(action.payload);
      },
      prepare(title: string) {
        return { payload: { id: nanoid(), title, completed: false } as TaskItem };
      },
    },
    toggleTask(state, action: PayloadAction<string>) {
      const taskId = action.payload;
      const task = state.find(t => t.id === taskId);
      if (task) task.completed = !task.completed;
    },
    removeTask(state, action: PayloadAction<string>) {
      const taskId = action.payload;
      return state.filter(t => t.id !== taskId);
    },
    setTasks(_state, action: PayloadAction<TaskItem[]>) {
      return action.payload || [];
    },
  },
});

export const { addTask, toggleTask, removeTask, setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;



