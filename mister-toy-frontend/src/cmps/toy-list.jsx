import { ToyPreview } from "./toy-preview"

export function ToyList({ toys , onRemoveToy }) {
    return (
        <section className="toy-list grid main-layout">
            {
                toys.map(toy => <ToyPreview key={toy._id} toy={toy} onRemoveToy={onRemoveToy} />)
            }
        </section>
    )

}