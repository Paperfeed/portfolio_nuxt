<template>
    <div class="lds-ripple">
        <div></div>
        <div></div>
    </div>
</template>

<script>
    export default {
        name: "loading-spinner"
    }
</script>

<style scoped lang="scss">
    .lds-ripple {
        position: relative;
        margin: 0 auto;

        width: 100%;
        height: 100%;
        max-height: 64px;
        max-width: 64px;

        div {
            position: absolute;
            width: 100%;
            height: 100%;
            /*transform-origin: center;*/

            border: 4px solid #fff;
            opacity: 1;
            border-radius: 50%;
            animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;


            &:nth-child(2) {
                animation-delay: -0.5s;
            }
        }

        &.black div {
            border: 4px solid #000;
        }
    }

    @keyframes lds-ripple {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
</style>
