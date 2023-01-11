import { useEffect, useState ,useRef} from "react"
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"

export function ToyFilter({ onSetFilter , filterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffectUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function handleCheckBox({target}){
        let { value, name:field} = target
        if(value === '') value = 1
        else value = ''
        setFilterByToEdit((prevFilter) => ({...prevFilter, [field]: value}))
    }

    return (
        <section className="toy-filter flex column main-layout">
            <form >
                <input type="text"
                    id="filter-name"
                    name="name"
                    placeholder="Search.."
                    value={filterByToEdit.name}
                    onChange={handleChange} />
            </form>

            <select type="select" id="filter-label" name="labels" onChange={handleChange}>
                <option value={''}>All</option>
                <option value={'doll'}>Doll</option>
                <option value={'battery powered'}>Battery powered</option>
                <option value={'baby'}>Baby</option>
            </select>

            <label htmlFor="in-stock-filter" className="toy-filter check-box">In stock:</label>
            <input className="toy-filter check-box-btn" type="checkbox" id="in-stock-filter"
                name="inStock" value={filterByToEdit.inStock}  onChange={handleCheckBox} />
        </section>
    )
}