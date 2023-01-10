import { NavLink } from "react-router-dom"
import { ToyPreview } from "./toy-preview"

export function ToyList({ toys , onRemoveToy }) {
    return (
        <section className="toy-list grid">
            {
                toys.map(toy => <ToyPreview key={toy._id} toy={toy} onRemoveToy={onRemoveToy} />)
            }
        </section>
    )

}