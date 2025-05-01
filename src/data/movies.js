import page1 from './page1'
import page2 from './page2'
import page3 from './page3'
import page4 from './page4'
import page5 from './page5'

function* circularIterator(items) {
    let index = 0
    while (true) {
        yield items[index]
        index = (index + 1) % items.length
    }
}

const pages = [page1, page2, page3, page4, page5]
const pagesIterator = circularIterator(pages)

export default function nextPage() {
    return pagesIterator.next().value
}
