import { useEffect } from "react"
import { useSelector } from "react-redux"
import { NavLink, useSearchParams } from "react-router-dom"
import { ToyFilter } from "../cmps/toy-filter"
import { ToyList } from "../cmps/toy-list"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"
import { loadToys, removeToy, setFilter } from "../store/toy/toy.action"

export function ToyIndex() {
    
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const [searchParams , setSearchParams] = useSearchParams()
    const queryFilterBy = toyService.getFilterFromSearchParams(searchParams)

    useEffect(() => {
        loadToys(queryFilterBy)
    } ,[])    
    
    function onSetFilter(filterBy) {
        setSearchParams(filterBy)
        loadToys(filterBy)
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
            <ToyFilter onSetFilter={onSetFilter} filterBy={queryFilterBy} />
            <NavLink to="/toy/edit" className=" btn-link add-btn">Add toy</NavLink>
            <ToyList toys={toys} onRemoveToy={onRemoveToy}/>
        </section>
    )
}