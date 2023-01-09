
export function ToyPreview({toy}) {
    return (
        <>
            <h3>{toy.name}</h3>
            <h4>Price:{toy.price}</h4>
            <p>created at: {toy.createdAt}</p>
        </>
    )
}