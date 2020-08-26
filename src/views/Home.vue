<template>
    <div class="home">
        <h1>This is Home Page!</h1>
        <h3 class="time">{{time}}</h3>
    </div>   
</template>

<script>
import { onMounted, onBeforeUnmount, reactive } from "vue";
export default {
    setup() {
        const getTime = () => {
            let date = new Date();
            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        }
        const data = reactive({
            time: getTime()
        })
        let timer;
        onMounted(() => {
            timer = setInterval(() => {
                data.time = getTime();
            }, 1000)
        });
        onBeforeUnmount(() => {
            timer && clearInterval(timer)
        })
        return data
    }
}
</script>
<style lang="scss">
@import "@/assets/styles/Home.scss";
</style>