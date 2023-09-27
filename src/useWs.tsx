import { useState, useEffect } from "react";

export function useWs(url:string) {
    const [ loading, setLoading ] = useState(true)
    const [ ws, setWs ] = useState<null|WebSocket>(null)


    useEffect(() => {
        const ws = new WebSocket(url)
        ws.addEventListener('open', () => {
            console.log('connected')
            setLoading(false)
            setWs(ws)
        })
        return () => {
            ws.close()
            console.log('closed')
        }
    }, [])

    return { loading , ws}
}
