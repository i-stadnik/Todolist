import { FilterValuesType, TasksStateType, TodoListType } from '../App'
import { v1 } from 'uuid'
import {
	AddTodoListActionType,
	RemoveTodolistActionType
} from './todolists-reducer'

export type removeTaskActionType = {
	type: 'REMOVE-TASK'
	taskId: string
	todolistId: string
}

export type addTaskActionType = {
	type: 'ADD-TASK'
	title: string
	todolistId: string
}

export type changeTaskStatusActionType = {
	type: 'CHANGE-TASK-STATUS'
	taskId: string
	isDone: boolean
	todolistId: string
}

export type changeTaskTitleActionType = {
	type: 'CHANGE-TASK-TITLE'
	taskId: string
	title: string
	todolistId: string
}

type ActionsType =
	| removeTaskActionType
	| addTaskActionType
	| changeTaskStatusActionType
	| changeTaskTitleActionType
	| AddTodoListActionType
	| RemoveTodolistActionType

export const tasksReducer = (
	state: TasksStateType,
	action: ActionsType
): TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			const stateCopy = { ...state }
			const tasks = stateCopy[action.todolistId]
			const filteredTasks = tasks.filter(t => t.id !== action.taskId)
			stateCopy[action.todolistId] = filteredTasks
			return stateCopy
		}
		case 'ADD-TASK':
			const stateCopy = { ...state }
			const tasks = stateCopy[action.todolistId]
			const newTasks = [
				{
					id: v1(),
					title: action.title,
					isDone: false
				},
				...tasks
			]
			stateCopy[action.todolistId] = newTasks
			return stateCopy
		case 'CHANGE-TASK-STATUS': {
			const stateCopy = { ...state }
			const tasks = stateCopy[action.todolistId]
			const filteredTasks = tasks.find(t => t.id === action.taskId)

			if (filteredTasks) {
				filteredTasks.isDone = action.isDone
			}

			return stateCopy
		}
		case 'CHANGE-TASK-TITLE': {
			const stateCopy = { ...state }
			const tasks = stateCopy[action.todolistId]
			const filteredTasks = tasks.find(t => t.id === action.taskId)

			if (filteredTasks) {
				filteredTasks.title = action.title
			}

			return stateCopy
		}
		case 'ADD-TODOLIST': {
			const stateCopy = { ...state }

			stateCopy[action.todolistId] = []

			return stateCopy
		}
		case 'REMOVE-TODOLIST': {
			const stateCopy = { ...state }
			delete stateCopy[action.id]
			return stateCopy
		}
		default:
			throw new Error("I don't  understand this action.")
	}
}

export const removeTaskActionTypeAC = (
	todolistId: string,
	taskId: string
): removeTaskActionType => {
	return {
		type: 'REMOVE-TASK',
		todolistId,
		taskId
	}
}

export const addTaskActionTypeAC = (
	title: string,
	todolistId: string
): addTaskActionType => {
	return {
		type: 'ADD-TASK',
		title,
		todolistId
	}
}

export const changeTaskStatusActionTypeAC = (
	taskId: string,
	isDone: boolean,
	todolistId: string
): changeTaskStatusActionType => {
	return {
		type: 'CHANGE-TASK-STATUS',
		taskId,
		todolistId,
		isDone
	}
}

export const changeTaskTitleActionTypeAC = (
	taskId: string,
	title: string,
	todolistId: string
): changeTaskTitleActionType => {
	return {
		type: 'CHANGE-TASK-TITLE',
		todolistId,
		taskId,
		title
	}
}
