import { NavLink } from "react-router-dom";

export function ToyPreview({ toy , onRemoveToy }) {
    return (
        <div className="toy-preview full">
            <h3>{toy.name}</h3>
            <h4>Price:{toy.price}</h4>
            <p>created at: {toy.createdAt}</p>
            <button className="remove-btn" onClick={() => onRemoveToy(toy._id)}>X</button>
            <NavLink to={`/toy/details/${toy._id}`}><button className="details-btn">Details</button></NavLink>
            <NavLink to={`/toy/edit/${toy._id}`}><button className="edit-btn">Edit toy</button></NavLink>
        </div>
    )
}