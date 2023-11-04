import { TaskType, Todolist } from './components/Todolist.tsx'
import { useState } from 'react'

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {
	const [tasks, setTasks] = useState<Array<TaskType>>([
		{ id: 1, title: 'Css', isDone: true },
		{ id: 2, title: 'Js', isDone: true },
		{ id: 3, title: 'React Js', isDone: false }
	])

	const [filter, setFilter] = useState<FilterValuesType>('all')

	const removeTask = (id: number) => {
		setTasks([...tasks.filter(t => t.id !== id)])
	}

	const changeFilter = (value: FilterValuesType) => {
		setFilter(value)
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
					/>
				</div>
			</div>
		</main>
	)
}

export default App
