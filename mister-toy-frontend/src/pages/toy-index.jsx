import { useEffect } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { ToyFilter } from "../cmps/toy-filter"
import { ToyList } from "../cmps/toy-list"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { loadToys, removeToy, setFilter } from "../store/toy/toy.action"

export function ToyIndex() {
    
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)

    useEffect(() => {
        loadToys()
    } , [filterBy])    
    
    function onSetFilter(filter) {
        setFilter(filter)
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => showSuccessMsg('Toy removed successfully'))
            .catch(err => {
                console.error(err)
                showErrorMsg('Can not remove toy')
            })
    }
        
    return (
        <section className="toy-index">
            <ToyFilter onSetFilter={onSetFilter} />
            <NavLink to="/toy/edit" className="add-btn">Add toy</NavLink>
            <ToyList toys={toys} onRemoveToy={onRemoveToy}/>
        </section>
    )
}