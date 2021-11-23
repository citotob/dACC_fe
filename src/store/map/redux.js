// src/lib/redux.js

// A simple redux store/actions/reducer implementation.
// A true app would be more complex and separated into different files.
import { createStore } from "redux";

// The actions are the "names" of the changes that can happen to the store
export const actions = {
	SET_BASEMAP: "SET_BASEMAP",
};

// The action creators bundle actions with the data required to execute them
export const setBasemap = (basemapType) => ({
	type: actions.ARCHIVE_TASK,
	basemapType,
});

// All our reducers simply change the state of a single task.
function taskStateReducer(taskState) {
	return (state, action) => {
		return {
			...state,
			tasks: state.tasks.map((task) =>
				task.id === action.id ? { ...task, state: taskState } : task
			),
		};
	};
}

// The reducer describes how the contents of the store change for each action
export const reducer = (state, action) => {
	switch (action.type) {
		case actions.SET_BASEMAP:
			return taskStateReducer("TASK_ARCHIVED")(state, action);
		default:
			return state;
	}
};

// The initial state of our store when the app loads.
// Usually you would fetch this from a server
const defaultData = [{ basemap: "Street" }];

// We export the constructed redux store
export default createStore(reducer, { data: defaultData });
