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
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={value}
                    placeholder='Search'
                    onChange={onChange}
                />
                <button type="submit">
                    Search
                </button>
            </form>
            <button onClick={onClear}>Clear</button>
        </div>
    )
}
