import { NavLink } from "react-router-dom";

export function ToyPreview({ toy , onRemoveToy }) {

    function calculateTime(time) {
        const currentTime = new Date().getTime()
        const timeDiff = Math.floor((currentTime - time) / 60000)
        if (timeDiff >= 60) {
            const hours = Math.floor(timeDiff / 60)
            const minutes = timeDiff % 60
            return `${hours} hours and ${minutes} minutes ago`
        }
        else if (timeDiff < 2) return 'Now'
        return `${timeDiff} minutes ago`
    }

    return (
        <div className="toy-preview flex">
            <h3>{toy.name}</h3>
            <h4>Price:{toy.price}</h4>
            <p><span>Created at: </span>{calculateTime(toy.createdAt)}</p>
            <button className="btn-icon remove-btn" onClick={() => onRemoveToy(toy._id)}>X</button>
            <NavLink to={`/toy/details/${toy._id}`}><button className="btn-link details-btn">Details</button></NavLink>
            <NavLink to={`/toy/edit/${toy._id}`}><button className="btn-link edit-btn">Edit toy</button></NavLink>
        </div>
    )
}