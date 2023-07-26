import { TimelineData } from "./Timeline"

interface WaveDrawFunc {
    (
        ctx: CanvasRenderingContext2D,
        timeline:TimelineData,
        yOffset:number,
        height:number,
        indices: Int16Array
    ): void
}
interface WaveDrawData {
    draw: WaveDrawFunc,
    drawHeight: number, // height of the line
    indices: Int16Array // array of arrays of key indices into wave timeline data
}

export {
    type WaveDrawData,
    type WaveDrawFunc
}