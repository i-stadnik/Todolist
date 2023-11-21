import { FilterValuesType } from '../App.tsx'
import { ChangeEvent } from 'react'
import { AddItemForm } from './AddItemForm.tsx'
import { EditableText } from './EditableText.tsx'

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
	changeTaskTitle: (taskId: string, text: string, todolistId: string) => void
	filter: FilterValuesType
	removeTodolist: (todolistId: string) => void
	changeTaskListTitle: (todolistId: string, title: string) => void
}
export function Todolist(props: PropsType) {
	const onAllClickHandler = () => props.changeFilter('all', props.id)
	const onActiveClickHandler = () => props.changeFilter('active', props.id)
	const onCompletedClickHandler = () =>
		props.changeFilter('completed', props.id)

	const removeTodolist = () => {
		props.removeTodolist(props.id)
	}

	const addTask = (title: string) => {
		props.addTask(title, props.id)
	}

	const changeTaskListTitle = (title: string) => {
		props.changeTaskListTitle(props.id, title)
	}

	return (
		<div className='mb-4 mt-4'>
			<h5 className='flex justify-between text-xl font-bold dark:text-white mb-3'>
				<EditableText text={props.title} onChangeText={changeTaskListTitle} />
				<button
					title='Remove'
					className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 mr-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
					onClick={removeTodolist}
				>
					-
				</button>
			</h5>
			<AddItemForm addItem={addTask} />
			<ul className='mt-7'>
				{props.tasks.map((task: TaskType, i: number) => {
					const onRemoveHandler = () => {
						props.removeTask(task.id, props.id)
					}

					const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
						props.changeStatus(task.id, e.currentTarget.checked, props.id)
					}

					const onChangeStatusHandler = (text: string) => {
						props.changeTaskTitle(task.id, text, props.id)
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
								<EditableText
									text={task.title}
									onChangeText={onChangeStatusHandler}
								/>
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
