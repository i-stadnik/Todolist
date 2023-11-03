import { TaskType, Todolist } from './components/Todolist.tsx'

function App() {
	const tasks1: Array<TaskType> = [
		{ id: 1, title: 'Css', isDone: true },
		{ id: 2, title: 'Js', isDone: true },
		{ id: 3, title: 'React Js', isDone: false }
	]

	const tasks2: Array<TaskType> = [
		{ id: 1, title: 'Terminator', isDone: true },
		{ id: 2, title: 'Xxx', isDone: true },
		{ id: 3, title: 'Jentlments of fortune', isDone: false }
	]

	return (
		<main className='container mx-auto px-4 pt-12'>
			<div>
				<h1>Todolist React JS</h1>
				<div className='gap-8 columns-2 pt-10'>
					<Todolist title='What to learn' tasks={tasks1} />
					<Todolist title='Movies' tasks={tasks2} />
				</div>
			</div>
		</main>
	)
}

export default App
