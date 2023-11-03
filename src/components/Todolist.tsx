export type TaskType = {
	id: number
	title: string
	isDone: boolean
}

type PropsType = {
	title: string
	tasks: Array<TaskType>
}
export function Todolist(props: PropsType) {
	return (
		<div>
			<h5 className='text-xl font-bold dark:text-white mb-3'>{props.title}</h5>
			<div className='mb-2.5 flex items-center'>
				<input
					placeholder='Add task...'
					type='text'
					className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
				/>
				<button
					className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 mr-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
					type='button'
				>
					+
				</button>
			</div>
			<ul className='mt-7'>
				{props.tasks.map((task: TaskType, i: number) => (
					<li className='flex items-center mb-4' key={i}>
						<input
							id='default-checkbox'
							type='checkbox'
							value=''
							checked={task.isDone}
							className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
						/>
						<label
							htmlFor='default-checkbox'
							className='ml-2 text-sm font-medium dark:text-gray-300'
						>
							{task.title}
						</label>
					</li>
				))}
			</ul>
			<div className='mt-3'>
				<button
					className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
					type='button'
				>
					All
				</button>
				<button
					className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
					type='button'
				>
					Active
				</button>
				<button
					className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
					type='button'
				>
					Completed
				</button>
			</div>
		</div>
	)
}
