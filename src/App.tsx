import { TaskType, Todolist } from './components/Todolist.tsx'
import { useState } from 'react'
import { v1 } from 'uuid'

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {
	const [tasks, setTasks] = useState<Array<TaskType>>([
		{ id: v1(), title: 'Css', isDone: true },
		{ id: v1(), title: 'Js', isDone: true },
		{ id: v1(), title: 'React Js', isDone: false }
	])

	const [filter, setFilter] = useState<FilterValuesType>('all')

	const removeTask = (id: string) => {
		setTasks([...tasks.filter(t => t.id !== id)])
	}

	const changeFilter = (value: FilterValuesType) => {
		setFilter(value)
	}

	const addTask = (title: string) => {
		const newTask = { id: v1(), title, isDone: false }
		setTasks([newTask, ...tasks])
	}

	let tasksForTodoList = tasks
	if (filter === 'completed') {
		tasksForTodoList = tasks.filter(task => task.isDone === true)
	}

	if (filter === 'active') {
		tasksForTodoList = tasks.filter(task => task.isDone === false)
	}

	return (
		<main className='container mx-auto px-4 pt-12'>
			<div>
				<h1>Todolist React JS</h1>
				<div className='gap-8 columns-1 pt-10'>
					<Todolist
						title='What to learn'
						tasks={tasksForTodoList}
						removeTask={removeTask}
						changeFilter={changeFilter}
						addTask={addTask}
					/>
				</div>
			</div>
		</main>
	)
}

export default App
