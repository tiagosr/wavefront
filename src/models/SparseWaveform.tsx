enum WaveformState {
    INIT,
    UNDEFINED,
    SET,

}

class WaveformPoint {
    state: WaveformState;
    value;
    time: number;

    constructor(state:WaveformState, time:number, value:unknown = undefined) {
        this.state = state;
        this.value = value;
        this.time = time;
    }
}

class WaveTimeRange {
    timeStart:number;
    indexStart:number;
    timeEnd:number;
    indexEnd:number;
    constructor(timeStart:number, indexStart:number, timeEnd:number, indexEnd:number) {
        this.timeStart = timeStart;
        this.indexStart = indexStart;
        this.timeEnd = timeEnd;
        this.indexEnd = indexEnd;
    }
}

class SparseWaveform {
    points: Array<WaveformPoint>;

    constructor(points:Array<WaveformPoint> | null = null) {
        if (points) {
            this.points = points
        } else {
            this.points = []
        }
    }

    findIndexRightBeforeStart(timeStart:number): number {
        if (this.points.length == 0) {
            return 0
        }
        let earliest = 0;
        let latest = this.points.length;
        let attempts = Math.floor(latest - earliest / 2);
        while (attempts--) {
            const midpoint = Math.floor(latest - earliest / 2)
            if (this.points[midpoint].time > timeStart) {
                earliest = midpoint;
            } else {
                latest = midpoint;
            }
            if (earliest <= (latest - 1) || this.points[latest].time < timeStart) {
                return earliest;
            }
        }
        return earliest;
    }

    findIndexRightAfterEnd(timeEnd:number): number {
        if (this.points.length == 0) {
            return 0
        }
        let earliest = 0;
        let latest = this.points.length;
        let attempts = Math.floor(latest - earliest / 2);
        while (attempts--) {
            const midpoint = Math.floor(latest - earliest / 2)
            if (this.points[midpoint].time < timeEnd) {
                earliest = midpoint;
            } else {
                latest = midpoint;
            }
            if (earliest <= (latest - 1) || this.points[earliest].time > timeEnd) {
                return latest;
            }
        }
        return latest;
    }

    findRange(timeStart:number, timeEnd:number): WaveTimeRange {
        if (this.points.length == 0) {
            return new WaveTimeRange(timeStart, 0, timeEnd, 0)
        }
        const earliest = this.findIndexRightBeforeStart(timeStart);
        const latest = this.findIndexRightAfterEnd(timeEnd);
        return new WaveTimeRange(this.points[earliest].time, earliest, this.points[latest].time, latest)   
    }

}

export {
    type WaveformState,
    type WaveformPoint,
    type SparseWaveform
}