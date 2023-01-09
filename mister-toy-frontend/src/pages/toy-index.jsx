import { useEffect } from "react"
import { useSelector } from "react-redux"
import { ToyFilter } from "../cmps/toy-filter"
import { ToyList } from "../cmps/toy-list"
import { loadToys, setFilter } from "../store/toy/toy.action"

export function ToyIndex() {
    
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)

    useEffect(() => {
        loadToys()
    } , [filterBy])    
    
    function onSetFilter(filter) {
        console.log(filter)
        setFilter(filter)
    }
        
    return (
        <section className="toy-index">
            <ToyFilter onSetFilter={onSetFilter} />
            <ToyList toys={toys}/>
        </section>
    )
}