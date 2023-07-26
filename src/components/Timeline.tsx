import { useEffect, useRef, useState } from "react"
import { TimelineData } from "../interfaces/Timeline"
import { WaveDrawData } from "../interfaces/WaveData"

const Timeline: React.FC<{
    waves: Array<WaveDrawData>,
    timeline: TimelineData
}> = ({waves, timeline}) => {
    const canvasRef = useRef(null)
    const [offset, setOffset] = useState({x: 0, y:0})

    useEffect(()=> {
        const canvas = canvasRef.current as unknown as HTMLCanvasElement
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        
        let {y} = offset;

        for (const wave of waves) {
            wave.draw(ctx, timeline, y, wave.drawHeight, wave.indices)
            y += wave.drawHeight
        }
    }, [waves, timeline, offset])
    return <>
        <canvas ref={canvasRef} />
    </>
}

export default Timeline