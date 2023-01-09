import { Link } from "react-router-dom"
import { ToyPreview } from "./toy-preview"

export function ToyList({ toys }) {
    return (
        <section className="toy-list grid">
            {
                toys.map(toy => 
                    <div className="toy-preview full" key={toy._id}>
                        <ToyPreview toy={toy} />
                        <Link to={`/toy/details/${toy._id}`}>Details</Link>
                    </div>
                )
            }
        </section>
    )

}