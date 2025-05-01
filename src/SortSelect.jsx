export default function SortSelect({ sort, setSort }) {
    const onChange = evt => {
        const { value } = evt.target
        setSort(value)
    }
    return (
        <select value={sort} onChange={onChange}>
            <option value=''>---Sort by---</option>
            <option value='title'>Title</option>
            <option value='date'>Release date</option>
            <option value='rating'>Rating</option>
        </select>
    )
}
