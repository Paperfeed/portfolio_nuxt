export function GeneratePoints(minimumDistance, regionSize, samplesBeforeRejection = 50) {
    // Setup
    const cellSize = minimumDistance / Math.SQRT2;
    const grid = {
        width: Math.ceil(regionSize.width / cellSize),
        height: Math.ceil(regionSize.height / cellSize),
    };

    grid.array = new Array(grid.width).fill(-1).map(x => new Array(grid.height).fill(-1));

    const activePoints = [], points = [];

    // Helper functions
    const GridCellFromPoint = (point) => {
        const gridX = Math.floor(point[0] / cellSize);
        const gridY = Math.floor(point[1] / cellSize);
        return [gridX, gridY];
    };

    const AddValidPoint = (point) => {
        const gridCell = GridCellFromPoint(point);
        activePoints.push(point);
        points.push(point);
        grid.array[gridCell[0]][gridCell[1]] = point;
    };

    const NewSampleFromPoint = (point, minimumDistance) => {
        // Get a new sample somewhere between minimum distance and minimum distance * 2
        const radius = minimumDistance * (Math.random() + 1);
        const angleInRadians = 2 * Math.PI * Math.random();

        return [
            point[0] + radius * Math.cos(angleInRadians),
            point[1] + radius * Math.sin(angleInRadians)
        ]
    };

    const IsWithinMinimumDistanceOrOutOfBound = (point) => {
        const gridCell = GridCellFromPoint(point);

        if (gridCell[0] < 0 || gridCell[0] >= grid.width ||
            gridCell[1] < 0 || gridCell[1] >= grid.height) {
            return true;
        }
        const samplingPoints = SamplesAroundGridCell(gridCell);

        // Check if there is any sample that is within minimum distance (if any)
        return samplingPoints.some(sample => sample !== null && DistanceBetweenPoints(sample, point) < minimumDistance);
    };

    const DistanceBetweenPoints = (a, b) => {
        const distanceX = a[0] - b[0];
        const distanceY = a[1] - b[1];

        return Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));
    };

    const SamplesAroundGridCell = (gridCell) => {
        const samples = [];
        const searchStartX = Math.max(0, gridCell[0] - 2);
        const searchStartY = Math.max(0, gridCell[1] - 2);
        const searchStopX = Math.min(gridCell[0] + 3, grid.width);
        const searchStopY = Math.min(gridCell[1] + 3, grid.height);

        for (let x = searchStartX; x < searchStopX; x++) {
            for (let y = searchStartY; y < searchStopY; y++) {
                if (grid.array[x][y] !== -1) {
                    samples.push(grid.array[x][y]);
                }
            }
        }

        return samples;
    };

    // Add Initial Point
    AddValidPoint([Math.random() * regionSize.width, Math.random() * regionSize.height]);

    let samplePoint,
        randomIndex,
        isValidSample;

    while (activePoints.length) {
        randomIndex = Math.floor(Math.random() * activePoints.length);
        isValidSample = false;

        for (let i = 0; i < samplesBeforeRejection; i++) {
            samplePoint = NewSampleFromPoint(activePoints[randomIndex], minimumDistance);

            if (!IsWithinMinimumDistanceOrOutOfBound(samplePoint)) {
                AddValidPoint(samplePoint);
                isValidSample = true;

                break;
            }
        }

        if (!isValidSample) {
            activePoints.splice(randomIndex, 1);
        }
    }

    return points;
}
