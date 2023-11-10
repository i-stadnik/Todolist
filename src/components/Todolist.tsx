import { FilterValuesType } from '../App.tsx'
import { ChangeEvent, useState } from 'react'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	removeTask: (id: string, todolistId: string) => void
	changeFilter: (value: FilterValuesType, todoListId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
	filter: FilterValuesType
	removeTodolist: (todolistId: string) => void
}
export function Todolist(props: PropsType) {
	const [newTaskTitle, setNewTaskTitle] = useState('')
	const [error, setError] = useState(false)
	const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value)
	}

	const addTask = () => {
		if (newTaskTitle.trim() !== '') {
			props.addTask(newTaskTitle.trim(), props.id)
			setNewTaskTitle('')
			setError(false)
		} else {
			setError(true)
		}
	}

	const onAllClickHandler = () => props.changeFilter('all', props.id)
	const onActiveClickHandler = () => props.changeFilter('active', props.id)
	const onCompletedClickHandler = () =>
		props.changeFilter('completed', props.id)

	const removeTodolist = () => {
		props.removeTodolist(props.id)
	}

	return (
		<div>
			<h5 className='flex justify-between text-xl font-bold dark:text-white mb-3'>
				{props.title}
				<button onClick={removeTodolist}>+</button>
			</h5>
			<div className='mb-2.5 flex items-center'>
				<input
					name='add-task'
					onChange={onNewTitleChangeHandler}
					value={newTaskTitle}
					placeholder='Add task...'
					type='text'
					className={
						error
							? 'block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 appearance-none dark:text-white dark:border-red-500 focus:outline-none focus:ring-0 border-red-600 focus:border-red-600 dark:focus-border-red-500 peer'
							: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					}
				/>
				<button
					className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 mr-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
					type='button'
					onClick={addTask}
				>
					+
				</button>
			</div>
			{error && (
				<p
					id='filled_error_help'
					className='mt-2 text-xs text-red-600 dark:text-red-400'
				>
					Field is required.
				</p>
			)}
			<ul className='mt-7'>
				{props.tasks.map((task: TaskType, i: number) => {
					const onRemoveHandler = () => {
						props.removeTask(task.id, props.id)
					}

					const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
						props.changeStatus(task.id, e.currentTarget.checked, props.id)
					}

					return (
						<li
							className={
								task.isDone
									? 'flex items-center mb-4 text-blue-600/25 dark:text-blue-500/25'
									: 'flex items-center mb-4 text-blue-600/100 dark:text-blue-500/100'
							}
							key={i}
						>
							<input
								id={task.id}
								type='checkbox'
								value=''
								checked={task.isDone}
								onChange={onChangeHandler}
								className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
							/>
							<label htmlFor={task.id} className='ml-2 text-sm font-medium'>
								{task.title}
							</label>
							<button
								className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 mr-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
								type='button'
								onClick={onRemoveHandler}
							>
								+
							</button>
						</li>
					)
				})}
			</ul>
			<div className='mt-3'>
				<button
					className={
						props.filter === 'all'
							? 'text-white bg-purple-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
							: 'text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
					}
					type='button'
					onClick={onAllClickHandler}
				>
					All
				</button>
				<button
					className={
						props.filter === 'active'
							? 'text-white bg-purple-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
							: 'text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
					}
					type='button'
					onClick={onActiveClickHandler}
				>
					Active
				</button>
				<button
					className={
						props.filter === 'completed'
							? 'text-white bg-purple-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
							: 'text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
					}
					type='button'
					onClick={onCompletedClickHandler}
				>
					Completed
				</button>
			</div>
		</div>
	)
}
