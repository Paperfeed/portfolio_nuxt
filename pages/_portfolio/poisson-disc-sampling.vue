<template>
    <div class="section">
        <label>
            Current Algorithm
            <select v-model="selectedAlgorithm">
                <option>Randomized</option>
                <option>Poisson Disc Sampling</option>
            </select>
        </label>
        <button @click="rerunAlgorithm">Rerun</button>

        <label>
            Point size
            <input @input="rerunAlgorithm" type="range" v-model="pointSize" min="0.1" max="50" step="0.1"/>
            {{pointSize}}
        </label>

        <div v-show="selectedAlgorithm === 'Poisson Disc Sampling'">
            <label>
                <input @change="rerunAlgorithm" type="checkbox" v-model="showGrid"/>
                Show Grid
            </label>
            <label>
                <input @change="rerunAlgorithm" type="checkbox" v-model="showSamples"/>
                Show Samples
            </label>
            <label>
                Minimum Distance
                <input @input="rerunAlgorithm" type="range" v-model="minimumDistance" min="1" max="100"/>
                {{minimumDistance}}
            </label>
            <label>
                Tries Before Rejection
                <input @input="rerunAlgorithm" type="range" v-model="triesBeforeRejection" min="1" max="500"/>
                {{triesBeforeRejection}}
            </label>
        </div>
        <div class="stage" ref="stage">
        </div>
    </div>
</template>

<script>
    import * as PIXI from 'pixi.js';
    import { throttle } from 'lodash-es';

    // https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph07-poissondisk.pdf

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    function GenerateRandomizedPoints(amountOfPoints, regionSize) {
        const points = [];

        for (let i = 0; i < amountOfPoints; i++) {
            points.push([Math.random() * regionSize.width, Math.random() * regionSize.height]);
        }

        return points;
    }


    function GenerateSampledPoints(minimumDistance, regionSize, samplesBeforeRejection = 50, pixi, showGrid, showSamples) {
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

                    if (showSamples) {
                        const activePoint = activePoints[randomIndex];
                        const graphics = new PIXI.Graphics();
                        graphics.endFill();
                        graphics.lineStyle(1, 0xFFFFFF, 1);
                        graphics.moveTo(activePoint[0], activePoint[1]);
                        graphics.lineTo(samplePoint[0], samplePoint[1]);
                        graphics.lineStyle(0);
                        pixi.stage.addChild(graphics);

                        /*
                        // Outer radius (testing area)
                        graphics.beginFill(0xFFFFFF, 0.1);
                        graphics.drawCircle(samplePoint[0], samplePoint[1], minimumDistance * 2);
                        graphics.beginHole();
                        graphics.drawCircle(samplePoint[0], samplePoint[1], minimumDistance);
                        graphics.endHole();
                        graphics.endFill();
                        */
                    }

                    break;
                } else if (showSamples) {
                    const activePoint = activePoints[randomIndex];
                    const graphics = new PIXI.Graphics();
                    graphics.endFill();
                    graphics.lineStyle(1, 0xFF0000, 0.5);
                    graphics.moveTo(activePoint[0], activePoint[1]);
                    graphics.lineTo(samplePoint[0], samplePoint[1]);

                    graphics.lineStyle(0);
                    graphics.beginFill(0xFF0000);
                    graphics.drawCircle(samplePoint[0], samplePoint[1], 1);
                    graphics.endFill();

                    pixi.stage.addChild(graphics);
                }
            }

            if (!isValidSample) {
                activePoints.splice(randomIndex, 1);
            }
        }

        // Draw grid
        if (showGrid) {
            const graphics = new PIXI.Graphics();
            for (let x = 0; x < grid.width; x++) {
                graphics.lineStyle(1, 0xABABAB, 0.5);
                graphics.moveTo(x * cellSize, 0);
                graphics.lineTo(x * cellSize, grid.height * cellSize);
            }

            for (let y = 0; y < grid.height; y++) {
                graphics.moveTo(0, y * cellSize);
                graphics.lineTo(grid.width * cellSize, y * cellSize);
            }

            graphics.lineStyle(0);
            pixi.stage.addChildAt(graphics, 0);
        }

        return points;
    }


    export default {
        name: 'poisson-disc-sampling',
        layout: 'portfolio',
        logoClass: 'black',
        info: {
            order: 90,
            name: 'Poisson Disc Sampling',
            description: 'The poisson disc sampling algorithm implemented in Pixi, with options that update in realtime',
            thumbnail: 'poissondiscsampling.png',
        },
        data() {
            return {
                selectedAlgorithm: 'Poisson Disc Sampling',
                pointSize: 2,
                minimumDistance: 20,
                triesBeforeRejection: 30,
                showGrid: false,
                showSamples: false
            }
        },
        watch: {
            selectedAlgorithm(algorithm) {
                this.switchAlgorithm(algorithm);
            }
        },
        methods: {
            rerunAlgorithm() {
                this.switchAlgorithm(this.selectedAlgorithm);
            },
            switchAlgorithm(algorithm) {
                this.graphics.clear();
                this.pixi.stage.removeChildren();
                this.pixi.stage.addChild(this.graphics);

                const { width, height } = this.pixi.renderer;
                let points;

                switch (algorithm) {
                    case 'Randomized':
                        points = GenerateRandomizedPoints(width * height / 100, { width, height });
                        break;
                    case 'Poisson Disc Sampling':
                        points = GenerateSampledPoints(this.minimumDistance, { width, height }, this.triesBeforeRejection, this.pixi, this.showGrid, this.showSamples);
                        break;
                }

                this.drawPoints(points, this.pointSize, this.pixi);
            },
            drawPoints(points, size, pixi) {
                // Not rendering in several Graphics objects creates glitchy rendering
                const graphics = new PIXI.Graphics();
                const chunkSize = 500;
                const chunks = new Array(Math.ceil(points.length / chunkSize)).fill(0).map(el => new PIXI.Graphics());

                for (let i = 0, len = points.length; i < len; i++) {
                    let graphics = chunks[Math.floor(i / chunkSize)];
                    graphics.lineStyle(0, 0, 0);
                    graphics.beginFill(0xFFFFFF);
                    graphics.drawCircle(points[i][0], points[i][1], size);
                    graphics.endFill();
                }

                chunks.map(graphics => pixi.stage.addChild(graphics));
            }
        },
        mounted() {
            const { stage } = this.$refs;
            this.pixi = new PIXI.Application({
                resizeTo: stage,
                antialias: true
            });

            this.graphics = new PIXI.Graphics();
            this.pixi.renderer.backgroundColor = 0x555566;
            this.pixi.stage.addChild(this.graphics);
            stage.appendChild(this.pixi.view);

            window.onresize = throttle(this.rerunAlgorithm, 100);
            this.switchAlgorithm(this.selectedAlgorithm);
        }
    }
</script>

<style scoped lang="scss">
    .stage {
        width: 100%;
        height: 60vh;
        background: lightblue;
    }
</style>
