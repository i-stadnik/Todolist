import { ChangeEvent, useState } from 'react'

type EditableTextPropsType = {
	text: string
	onChangeText: (text: string) => void
}

export function EditableText(props: EditableTextPropsType) {
	let [editMode, setEditMode] = useState(false)
	let [text, setText] = useState('')

	const activeEditMode = () => {
		setEditMode(true)
		setText(props.text)
	}
	const activateViewMode = () => {
		setEditMode(false)
		props.onChangeText(text)
	}
	const onChangeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setText(e.currentTarget.value)
	}

	return editMode ? (
		<input
			value={text}
			onChange={onChangeTextHandler}
			onBlur={activateViewMode}
			autoFocus
		/>
	) : (
		<span onDoubleClick={activeEditMode}>{props.text}</span>
	)
}
