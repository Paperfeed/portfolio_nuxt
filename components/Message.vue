<template>
    <div class="message" :class="className">
        <div class="message-body">
            {{message}}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Message',
        props: {
            message: {
                type: String,
                default() {
                    return 'info'
                },
            },
            type: {
                type: String,
                default() {
                    return 'info';
                }
            }
        },
        computed: {
            classNameType() {
                switch (this.type) {
                    case 'info':
                        return 'is-info';
                    case 'white':
                        return 'is-white';
                    case 'black':
                        return 'is-black';
                    case 'light':
                        return 'is-light';
                    case 'dark':
                        return 'is-dark';
                    case 'primary':
                        return 'is-primary';
                    case 'link':
                        return 'is-link';
                    case 'error':
                        return 'is-danger';
                    case 'warning':
                        return 'is-warning';
                    case 'success':
                        return 'is-success';
                }
            },
            className() {
                return `${this.classNameType}${this.size ? ' is-' + this.size : ''}`;
            },
        }
    }
</script>

<style scoped>

</style>
