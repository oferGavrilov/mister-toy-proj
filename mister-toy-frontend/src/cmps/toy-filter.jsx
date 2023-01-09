import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service"

export function ToyFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())

    useEffect(() => {
        onSetFilter(filterByToEdit)
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
        <section className="toy-filter main-layout flex column align-center">
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
                <option value={'Doll'}>Doll</option>
                <option value={'Battery powered'}>Battery powered</option>
                <option value={'Baby'}>Baby</option>
            </select>

            <label htmlFor="in-stock-filter">In stock:</label>
            <input className="check-box" type="checkbox" id="in-stock-filter"
                name="inStock" value={filterByToEdit.inStock}  onChange={handleCheckBox} />
        </section>
    )
}