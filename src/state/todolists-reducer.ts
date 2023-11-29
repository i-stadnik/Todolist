import { FilterValuesType, TodoListType } from '../App'
import { v1 } from 'uuid'

export type RemoveTodolistActionType = {
	type: 'REMOVE-TODOLIST'
	id: string
}

export type AddTodoListActionType = {
	type: 'ADD-TODOLIST'
	title: string
	todolistId: string
}

export type ChangeTodoListTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE'
	id: string
	title: string
}

export type ChangeTodoListFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER'
	id: string
	filter: FilterValuesType
}

type ActionsType =
	| RemoveTodolistActionType
	| AddTodoListActionType
	| ChangeTodoListTitleActionType
	| ChangeTodoListFilterActionType

export const todoListsReducer = (
	state: Array<TodoListType>,
	action: ActionsType
): Array<TodoListType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return state.filter(tl => tl.id !== action.id)
		case 'ADD-TODOLIST':
			return [
				...state,
				{
					id: action.todolistId,
					title: action.title,
					filter: 'all'
				}
			]
		case 'CHANGE-TODOLIST-TITLE':
			let todolistTitle = state.find(tl => tl.id === action.id)
			if (todolistTitle) {
				todolistTitle.title = action.title
			}
			return [...state]
		case 'CHANGE-TODOLIST-FILTER':
			let todolist = state.find(tl => tl.id === action.id)
			if (todolist) {
				todolist.filter = action.filter
			}
			return [...state]
		default:
			throw new Error("I don't  understand this action.")
	}
}

export const removeTodoListAC = (
	todoListId: string
): RemoveTodolistActionType => {
	return { type: 'REMOVE-TODOLIST', id: todoListId }
}

export const addTodoListAC = (title: string): AddTodoListActionType => {
	return {
		type: 'ADD-TODOLIST',
		title,
		todolistId: v1()
	}
}
export const changeTodoListTitleAC = (
	id: string,
	title: string
): ChangeTodoListTitleActionType => {
	return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title }
}
export const changeTodoListFilterAC = (
	id: string,
	filter: FilterValuesType
): ChangeTodoListFilterActionType => {
	return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter }
}
