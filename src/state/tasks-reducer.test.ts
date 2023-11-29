import {
	addTaskActionTypeAC,
	changeTaskStatusActionTypeAC,
	changeTaskTitleActionTypeAC,
	removeTaskActionTypeAC,
	tasksReducer
} from './tasks-reducer'
import { TasksStateType } from '../App'
import { v1 } from 'uuid'
import { addTodoListAC, removeTodoListAC } from './todolists-reducer'

const todolistId1 = v1()
const todolistId2 = v1()

test('correct task should be detected from correct array', () => {
	const startState: TasksStateType = {
		[todolistId1]: [
			{ id: '1', title: 'Css', isDone: true },
			{ id: '2', title: 'Js', isDone: true },
			{ id: '3', title: 'React Js', isDone: false }
		],
		[todolistId2]: [
			{ id: '1', title: 'React Js', isDone: false },
			{ id: '2', title: 'Css', isDone: true },
			{ id: '3', title: 'Js', isDone: true }
		]
	}

	const action = removeTaskActionTypeAC(todolistId2, '2')
	const endState = tasksReducer(startState, action)

	expect(endState[todolistId1].length).toBe(3)
	expect(endState[todolistId2].length).toBe(2)
	expect(endState[todolistId2].every(t => t.id != '2')).toBeTruthy()
})

test('correct task should be added to correct array', () => {
	const startState: TasksStateType = {
		[todolistId1]: [
			{ id: '1', title: 'Css', isDone: true },
			{ id: '2', title: 'Js', isDone: true },
			{ id: '3', title: 'React Js', isDone: false }
		],
		[todolistId2]: [
			{ id: '1', title: 'React Js', isDone: false },
			{ id: '2', title: 'Css', isDone: true },
			{ id: '3', title: 'Js', isDone: true }
		]
	}

	const action = addTaskActionTypeAC('juce', todolistId2)
	const endState = tasksReducer(startState, action)

	expect(endState[todolistId1].length).toBe(3)
	expect(endState[todolistId2].length).toBe(4)
	expect(endState[todolistId2][0].id).toBeDefined()
	expect(endState[todolistId2][0].title).toBe('juce')
	expect(endState[todolistId2][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
	const startState: TasksStateType = {
		[todolistId1]: [
			{ id: '1', title: 'Css', isDone: true },
			{ id: '2', title: 'Js', isDone: true },
			{ id: '3', title: 'React Js', isDone: false }
		],
		[todolistId2]: [
			{ id: '1', title: 'React Js', isDone: false },
			{ id: '2', title: 'Css', isDone: true },
			{ id: '3', title: 'Js', isDone: true }
		]
	}

	const action = changeTaskStatusActionTypeAC('2', false, todolistId2)
	const endState = tasksReducer(startState, action)

	expect(endState[todolistId2][1].isDone).toBeFalsy()
	expect(endState[todolistId1][1].isDone).toBeTruthy()
})

test('title of specified task should be changed', () => {
	const startState: TasksStateType = {
		[todolistId1]: [
			{ id: '1', title: 'Css', isDone: true },
			{ id: '2', title: 'Js', isDone: true },
			{ id: '3', title: 'React Js', isDone: false }
		],
		[todolistId2]: [
			{ id: '1', title: 'React Js', isDone: false },
			{ id: '2', title: 'Milk', isDone: true },
			{ id: '3', title: 'Js', isDone: true }
		]
	}

	const action = changeTaskTitleActionTypeAC(
		'2',
		'Sed dolores sem',
		todolistId2
	)
	const endState = tasksReducer(startState, action)

	expect(endState[todolistId2][1].title).toBe('Sed dolores sem')
	expect(endState[todolistId1][1].title).toBe('Js')
})

test('new array should be added when new todolist is added', () => {
	const startState: TasksStateType = {
		[todolistId1]: [
			{ id: '1', title: 'Css', isDone: true },
			{ id: '2', title: 'Js', isDone: true },
			{ id: '3', title: 'React Js', isDone: false }
		],
		[todolistId2]: [
			{ id: '1', title: 'React Js', isDone: false },
			{ id: '2', title: 'Milk', isDone: true },
			{ id: '3', title: 'Js', isDone: true }
		]
	}

	const action = addTodoListAC('Consequuntur quisque mollit')
	const endState = tasksReducer(startState, action)

	const keys = Object.keys(endState)
	const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2)

	if (!newKey) throw Error('new key should be added')

	expect(keys.length).toBe(3)
})

test('property with todolistId should be deleted', () => {
	const startState: TasksStateType = {
		[todolistId1]: [
			{ id: '1', title: 'Css', isDone: true },
			{ id: '2', title: 'Js', isDone: true },
			{ id: '3', title: 'React Js', isDone: false }
		],
		[todolistId2]: [
			{ id: '1', title: 'React Js', isDone: false },
			{ id: '2', title: 'Milk', isDone: true },
			{ id: '3', title: 'Js', isDone: true }
		]
	}

	const action = removeTodoListAC(todolistId2)
	const endState = tasksReducer(startState, action)

	const keys = Object.keys(endState)

	expect(keys.length).toBe(1)
	expect(endState[todolistId2]).toBeUndefined()
})
