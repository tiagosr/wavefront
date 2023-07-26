enum WaveformState {
    INIT,
    UNDEFINED,
    SET,

}

class WaveformPoint {
    state: WaveformState;
    valueTo;
    valueFrom;
    time: number;

    constructor(state:WaveformState, time:number, valueTo:unknown = undefined, valueFrom: unknown = undefined) {
        this.state = state;
        this.valueTo = valueTo;
        this.valueFrom = valueFrom;
        this.time = time;
    }
}

class WaveTimeTreeNode {
    time:number;
    index:number;
    earlier:WaveTimeTreeNode | null;
    later:WaveTimeTreeNode | null;
    constructor(time:number, index:number, earlier:WaveTimeTreeNode | null = null, later:WaveTimeTreeNode | null = null) {
        this.time = time;
        this.index = index;
        this.earlier = earlier;
        this.later = later;
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
        // eslint-disable-next-line no-constant-condition
        while (true) {
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
    }

    findIndexRightAfterEnd(timeEnd:number): number {
        if (this.points.length == 0) {
            return 0
        }
        let earliest = 0;
        let latest = this.points.length;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const midpoint = Math.floor(latest - earliest / 2)
            if (this.points[midpoint].time < timeEnd) {
                earliest = midpoint;
            } else {
                latest = midpoint;
            }
            if (earliest <= (latest - 1) || this.points[earliest].time > timeEnd) {
                return earliest;
            }
        }
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