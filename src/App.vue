<template>
    <div class="container">
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
        </ul>
        <router-view />
    </div>
</template>

<style lang="scss">
.container{
    width: 100%;
    height: 100%;
    background-color: #F8F8F8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ul{
        display: flex;
    }
    li{
        margin: 0 1rem;
        background: #01a9b4;
        border-radius: 3px;
        a{
            text-decoration: none;
            color: #fff;
            line-height: 2rem;
            padding: 0 1rem;
        }
    }
}
</style>