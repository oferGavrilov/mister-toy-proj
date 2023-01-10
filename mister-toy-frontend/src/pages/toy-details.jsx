import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"


export function ToyDetails() {

    const [toy , setToy] = useState(null)
    const {toyId} = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    })

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log(err)
                navigate('/toy')
            })
    }

    if(!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>{toy.name}</h1>
            <h3>Price: {toy.price}</h3>
            {/* <img src={require(`../assets/style/img/${toy.img}`)} alt="" /> */}
            <p>{toy.msg}</p>
            <h5 style={toy.inStock ? {color:'green'} : {color: 'red'}}>{toy.inStock ? 'Available' : 'Out of stock'}</h5>
            <Link to={'/toy'}>Back</Link>
        </section>
    )
}