
interface TimelineData {
    timescale: number,
    offsetTime: number,
    clip: {
        minX:number,
        minY:number,
        maxX:number,
        maxY:number,
        minT:number,
        maxT:number
    },
}

export {
    type TimelineData
}
