import { useEffect, useState } from "react";

export function useOtherCursor(ws: WebSocket|null) {
    const [ cursors, setCursors ] = useState([])
    if (!ws) {
        return cursors
    }

    useEffect(() => {
        ws.onmessage = msg => {
            const payload = msg.data
            console.log(JSON.parse(payload))
        }
       return () => ws.close()
    }, [ws])
    return cursors

}