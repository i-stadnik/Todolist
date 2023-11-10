import { Todolist } from './components/Todolist.tsx'
import { useState } from 'react'
import { v1 } from 'uuid'

export type FilterValuesType = 'all' | 'completed' | 'active'
type TodoListType = {
	id: string
	title: string
	filter: FilterValuesType
}

function App() {
	const todolistId1 = v1()
	const todolistId2 = v1()

	const [todolists, setTodolists] = useState<Array<TodoListType>>([
		{ id: todolistId1, title: 'What to learn', filter: 'active' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' }
	])

	const [tasksObj, setTasksObj] = useState({
		[todolistId1]: [
			{ id: v1(), title: 'Css', isDone: true },
			{ id: v1(), title: 'Js', isDone: true },
			{ id: v1(), title: 'React Js', isDone: false }
		],
		[todolistId2]: [
			{ id: v1(), title: 'Css', isDone: true },
			{ id: v1(), title: 'Js', isDone: true },
			{ id: v1(), title: 'React Js', isDone: false }
		]
	})

	const removeTask = (id: string, todolistId: string) => {
		const tasks = tasksObj[todolistId]
		tasksObj[todolistId] = tasks.filter(t => t.id != id)

		setTasksObj({ ...tasksObj })
	}

	const removeTodolist = (todolistId: string) => {
		setTodolists([...todolists.filter(tl => tl.id !== todolistId)])
		delete tasksObj[todolistId]
		setTasksObj({ ...tasksObj })
	}

	const addTask = (title: string, todolistId: string) => {
		const task = { id: v1(), title, isDone: false }
		const tasks = tasksObj[todolistId]
		tasksObj[todolistId] = [task, ...tasks]

		setTasksObj({ ...tasksObj })
	}

	const changeStatus = (
		taskId: string,
		isDone: boolean,
		todolistId: string
	) => {
		const tasks = tasksObj[todolistId]
		const task = tasks.find(t => t.id === taskId)
		if (task) {
			task.isDone = isDone
			setTasksObj({ ...tasksObj })
		}
	}

	const changeFilter = (value: FilterValuesType, todoListId: string) => {
		const todolist = todolists.find(t => t.id === todoListId)
		if (todolist) {
			todolist.filter = value

			setTodolists([...todolists])
		}
	}

	return (
		<main className='container mx-auto px-4 pt-12'>
			<div>
				<h1>Todolist React JS</h1>
				<div className='gap-8 columns-1 pt-10'>
					{todolists.map(t => {
						let tasksForTodoList = tasksObj[t.id]

						console.log(tasksObj[t.id])

						if (t.filter === 'completed') {
							tasksForTodoList = tasksForTodoList.filter(
								task => task.isDone === true
							)
						}

						if (t.filter === 'active') {
							tasksForTodoList = tasksForTodoList.filter(
								task => task.isDone === false
							)
						}

						return (
							<Todolist
								key={t.id}
								id={t.id}
								title={t.title}
								filter={t.filter}
								tasks={tasksForTodoList}
								removeTask={removeTask}
								changeFilter={changeFilter}
								addTask={addTask}
								changeStatus={changeStatus}
								removeTodolist={removeTodolist}
							/>
						)
					})}
				</div>
			</div>
		</main>
	)
}

export default App
