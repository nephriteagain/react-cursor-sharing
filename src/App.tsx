
import './App.css'
import { useWs } from './useWs'
import { useEffect, useState,  MouseEvent } from 'react'
import Cursors from './Cursors'


function handleMouseMove() {
    let run = true
    return function (e:MouseEvent, ws:WebSocket) {
        if (run) {
            run = false

            const el = e.currentTarget.getBoundingClientRect()
            const x = Math.round(e.clientX - el.left)
            const y = Math.round(e.clientY - el.top)
            const coordinates = {
                x, y
            }
            if (ws) {
                ws.send(JSON.stringify(coordinates))
            }
            const timeout = setTimeout(() => {
                run = true
                clearTimeout(timeout)
            }, 20)
        }
    }
}
const mouseMove = handleMouseMove()

const socketURL = import.meta.env.DEV ? import.meta.env.VITE_WEBSOCKET_DEV : import.meta.env.VITE_WEBSOCKET_PROD
export default function App() {
    const [ cursors, setCursors ] = useState<{coordinates: {x:number,y:number}; clientId:string; color: string}[]>([])

    const { ws, loading } = useWs(socketURL)


  useEffect(() => {
    if (!ws) return
    ws.onmessage = msg => {
        const data = JSON.parse(msg.data)
        setCursors(data)
    }    

    return () => ws.close()
}, [ws])

useEffect(() => {
}, [cursors])

  return (
    <div className="box" 
        onMouseMove={(e) => {
            if (loading) {
                return
            }
            if (ws) {
                mouseMove(e, ws)
            }
        }}
        onMouseLeave={() => {
            if (loading) {
                return
            }
            const  coordinates = {x: -200, y: -200}
            if (ws) {
                ws.send(JSON.stringify(coordinates))
            }
        }}
    >
      <Cursors cursors={cursors} />
    </div>
  )
}