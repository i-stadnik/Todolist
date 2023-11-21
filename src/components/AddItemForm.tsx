import { ChangeEvent, useState } from 'react'

type AddItemFormPropsType = {
	addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
	const [newTaskTitle, setNewTaskTitle] = useState('')
	const [error, setError] = useState(false)

	const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value)
	}

	const addTask = () => {
		if (newTaskTitle.trim() !== '') {
			props.addItem(newTaskTitle.trim())
			setNewTaskTitle('')
			setError(false)
		} else {
			setError(true)
		}
	}

	return (
		<div>
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
		</div>
	)
}
