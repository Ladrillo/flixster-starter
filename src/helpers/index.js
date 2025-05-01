export function sorter(movies, criteria) {
    const sorted = [...movies]
    switch (criteria) {
        case 'title':
            return sorted.sort((a, b) =>
                a.original_title.localeCompare(b.original_title, undefined, { sensitivity: 'base' })
            )
        case 'date':
            return sorted.sort((a, b) =>
                new Date(b.release_date) - new Date(a.release_date)
            )
        case 'rating':
            return sorted.sort((a, b) =>
                b.popularity - a.popularity
            )
        default:
            return movies
    }
}
