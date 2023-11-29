import {
	addTodoListAC,
	changeTodoListFilterAC,
	changeTodoListTitleAC,
	removeTodoListAC,
	todoListsReducer
} from './todolists-reducer'
import { v1 } from 'uuid'
import { FilterValuesType, TodoListType } from '../App'

const todolistId1 = v1()
const todolistId2 = v1()

test('correct todolist should be removed', () => {
	const startState: Array<TodoListType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' }
	]

	const endState = todoListsReducer(startState, removeTodoListAC(todolistId1))

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todolistId2)
})

test('correct todolists should be added', () => {
	let newTodoListTitle = 'New TodoList'

	const startState: Array<TodoListType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' }
	]

	const endState = todoListsReducer(startState, addTodoListAC(newTodoListTitle))

	expect(endState.length).toBe(3)
	expect(endState[2].title).toBe(newTodoListTitle)
	expect(endState[2].filter).toBe('all')
})

test('correct todolists should change its name', () => {
	let newTodoListTitle = 'New TodoList'

	const startState: Array<TodoListType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' }
	]

	const endState = todoListsReducer(
		startState,
		changeTodoListTitleAC(todolistId2, newTodoListTitle)
	)

	expect(endState[0].title).toBe('What to learn')
	expect(endState[1].title).toBe(newTodoListTitle)
})

test('correct filter of todolist should be changed', () => {
	let newFilter: FilterValuesType = 'completed'

	const startState: Array<TodoListType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' }
	]

	const endState = todoListsReducer(
		startState,
		changeTodoListFilterAC(todolistId2, newFilter)
	)

	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe(newFilter)
})
