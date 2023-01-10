import { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"
import { saveToy } from "../store/toy/toy.action"



export function ToyEdit() {

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        if (!toyId) return
        toyService.getById(toyId)
            .then((toy) => setToyToEdit(toy))
    }, [])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg("Toy saved successfully")
                navigate('/toy')
            })
            .catch(err => {
                console.error(err)
                showErrorMsg('Cannot save toy')
            })

    }

    if (!toyToEdit) return <div>...Loading</div>
    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="name"></label>
            <input type="text"
                id="name"
                name="name"
                placeholder="Name..."
                value={toyToEdit.name}
                onChange={handleChange} />

            <label htmlFor="price"></label>
            <input type="number"
                id="price"
                name="price"
                value={toyToEdit.price}
                placeholder="Price..."
                onChange={handleChange} />

            <label htmlFor="type"></label>
            <input type="text"
                id="type"
                name="type"
                placeholder="Type.."
                value={toyToEdit.type}
                onChange={handleChange} />

            <button>Save</button>
        </form>
    )
}