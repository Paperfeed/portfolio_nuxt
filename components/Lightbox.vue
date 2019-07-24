<template>
    <div class="lightbox"
         v-bind:class="[isActive ? 'open' : 'closed']"
         @click="close"
    >

        <lazy-image ref="image"
                    :style="style"
                    :srcset="images[currentImage - 1].srcSet"
                    v-show="isActive"
        />

    </div>
</template>

<script>
    import { TimelineLite } from 'gsap/TimelineLite';
    import LoadingSpinner from './LoadingSpinner';
    import LazyImage from './LazyImage';

    export default {
        name: 'lightbox',
        components: { LazyImage, LoadingSpinner },
        props: {
            images: Array,
        },
        data() {
            return {
                isActive: false,
                style: '',
                toStyle: {},
                currentImage: 1,
                loading: true,
                transitioning: false,
                animationQueue: []
            }
        },
        mounted() {
            this.listeners = [];
            this.listeners.push(window.addEventListener('keyup', this.hotkeyHandler));
            this.listeners.push(window.addEventListener('wheel', this.hotkeyHandler));
            this.timeline = new TimelineLite();
        },
        beforeDestroy() {
            this.listeners.forEach(listener => window.removeEventListener(listener, this.hotkeyHandler));
        },
        watch: {
            currentImage() {
                if (this.isActive) this.updateImagePosition();
            }
        },
        computed: {
            totalImages() {
                return this.images.length + 1;
            }
        },
        methods: {
            setCurrentImage(index) {
                this.currentImage = index;
            },
            setTargetStyle(target) {
                    this.targetStyle = this.getTargetBoundingRect(target);
            },
            updateImagePosition() {
                const { image } = this.$refs;

                // Don't display loading spinner for cached images
                if (!image.complete) {
                    this.loading = true;
                }
            },
            hasNextImage() {
                return this.currentImage + 1 < this.totalImages;
            },
            hasPreviousImage() {
                return this.currentImage - 1 >= 0;
            },
            nextImage(direction) {
                if (this.hasNextImage()) {
                    this.changeImage(this.currentImage + 1, direction);
                }
            },
            previousImage(direction) {
                if (this.hasPreviousImage()) {
                    this.changeImage(this.currentImage - 1, direction);
                }
            },
            changeImage(index, direction) {
                if (this.transitioning) {
                    this.animationQueue.push([this.currentImage + 1, direction]);
                    return;
                }

                const {image} = this.$refs;
                const clone = image.cloneNode(true);
                let x, y;

                image.parentNode.appendChild(clone);

                this.setCurrentImage(index);
                this.$emit('change', this.currentImage);

                switch (direction) {
                    case 1:  // Up
                        x = '';
                        y = '-60%';
                        break;
                    case 2:  // Right
                        x = '60%';
                        y = '';
                        break;
                    case 3: // Down
                        x = '';
                        y = '60%';
                        break;
                    default: // Left
                        x = '-60%';
                        y = '';
                }

                this.transitioning = true;

                this.timeline.clear();
                this.timeline.to(clone, 0.2, {
                    position: 'absolute',
                    x: x,
                    y: y,
                    opacity: 0,
                    ease: Power1.easeIn,
                    onComplete: () => {
                        clone.remove();
                        this.transitioning = false;

                        if (this.animationQueue.length) {
                            console.log('found animation');
                            const args = this.animationQueue.shift();
                            this.changeImage(args[0], args[1])
                        }
                    }
                }).fromTo(image, 0.2, {
                    // position: 'absolute',
                    x: -x,
                    y: -y,
                    opacity: 0,
                    ease: Power1.easeOut,
                }, {
                    // position: 'relative',
                    x: '0%',
                    y: '0%',
                    opacity: 1,
                    ease: Power1.easeOut,
                });
            },
            open(index, target) {
                const { image } = this.$refs;

                if (this.timeline.active) {
                    this.timeline.eventCallback('onComplete', null);
                    this.timeline.clear();
                }

                if (!this.loading) image.style = '';

                if (index !== this.currentImage) this.setCurrentImage(index);
                if (target) this.setTargetStyle(target);

                this.isActive = true;
            },
            close() {
                const { image } = this.$refs;

                this.timeline.fromTo(image, 0.4, {
                    ...this.getTargetBoundingRect(image)
                }, {
                    ...this.targetStyle,
                    ease: Power1.easeOut,
                    onComplete: () => {
                        image.style = 'opacity: 0';
                    }
                });

                this.isActive = false;
            },
            toggle() {
                this.isActive = !this.isActive;
            },
            getTargetBoundingRect(target) {
                const boundingRect = target.getBoundingClientRect();

                if (boundingRect) {
                    return {
                        top: `${boundingRect.top}px`,
                        bottom: `${boundingRect.bottom}px`,
                        right: `${boundingRect.right}px`,
                        left: `${boundingRect.left}px`,
                        height: `${boundingRect.height}px`,
                        width: `${boundingRect.width}px`
                    }
                }
            },
            hotkeyHandler(event) {
                if (!this.isActive) return;

                if (event.type === 'keyup') {
                    switch (event.key) {
                        case 'ArrowLeft':
                            this.previousImage(4);
                            break;
                        case 'ArrowRight':
                            this.nextImage(2);
                            break;
                    }
                } else if (event.type === 'wheel') {
                    if (event.deltaY < 0) this.previousImage(1);
                    if (event.deltaY > 0) this.nextImage(3);
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .lightbox {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        display: flex;
        flex-direction: column;
        justify-content: center;
        pointer-events: none;
        transition: opacity 0.2s ease-in;

        img {
            max-height: 100%;
            max-width: 100%;
            padding: .5rem;
            user-select: none;
        }

        &.open {
            pointer-events: all;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            transition: background-color 0.4s ease-out;
        }

        &.closed {
            padding: .5rem;

            img {
                position: fixed;
                object-fit: cover;
            }
        }
    }
</style>
