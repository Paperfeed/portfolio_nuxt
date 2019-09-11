<template>
    <section class="hero is-primary is-fullheight-with-navbar">
        <div class="hero-body">
            <div class="container has-text-centered">
                <h1 class="title">
                    Aldert Vaandering
                </h1>
                <h2 class="subtitle">
                    Web development
                </h2>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'HomePage',
    }

    // eslint-disable-next-line no-console
    if (process.env.production) {
        console.log(`%cHi there!👋

I see you're taking a look backstage, hope you don't break anything!

I'm for hire, by the way😉`, 'font-family: monospace; font-weight: bold; font-size: 2em; color: #5631c5');
    } else {
        console.log(`%cRunning in Development mode`, 'font-family: monospace; font-weight: bold; font-size: 1.5em; color: #453445');
    }
</script>

<style>
</style>
