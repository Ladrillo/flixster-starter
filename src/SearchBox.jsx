import { useState } from 'react'

export default function SearchBox({ search, setSearch }) {
	const [value, setValue] = useState(search)
	const onChange = evt => {
		const { value } = evt.target
		setValue(value)
	}
	const onSubmit = evt => {
		evt.preventDefault()
		setSearch(value)
	}
	const onClear = evt => {
		setSearch('')
		setValue('')
	}
	return (
		<div className='search-box'>
			<form onSubmit={onSubmit} role="search">
				<label htmlFor="movieSearch" className="visually-hidden">Search for a movie</label>
				<input
					id="movieSearch"
					type="text"
					value={value}
					placeholder='Search'
					onChange={onChange}
				/>
				<button type="submit" aria-label="Submit movie search input field">
					Search
				</button>
			</form>
			<button onClick={onClear} aria-label="Clear movie search">Clear</button>
		</div>
	)
}
