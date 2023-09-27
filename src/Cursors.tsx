export default function Cursors({cursors}: {
    cursors: {coordinates: {x: number; y: number}; clientId: string; color: string}[]
}) {
    

    if (cursors.length === 0) {
        return null
    }
    return (
        <>
        {cursors.map(c => {
            return (<div className="cursor" key={c.clientId}
                style={{
                    backgroundColor: c.color,
                    left: c?.coordinates.x,
                    top: c?.coordinates.y
                }}
                >
                    <p className="client"
                        style={{
                            border: `2px solid ${c.color}`,
                            color: c.color
                        }}
                    >
                        {c.clientId}
                    </p>
                </div>)
        })}
        
        </>
    )
}