<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import Bbob from '../Bbob';
import Menu from './Menu.vue';
let router = useRouter();
let drawer = ref(false)

</script>

<template>
    <div class="container">
        <el-drawer size="100%" v-model="drawer" direction="ltr">
            <Menu mode="vertical"></Menu>
            <slot :offIt="()=>drawer = false"></slot>
        </el-drawer>
        <div class="menu-container" @click="drawer = true">
            <div class="menu"></div>
            <div class="menu"></div>
            <div class="menu"></div>
        </div>
        <h1 class="oneLine" @click="router.push('/')">{{ Bbob.meta.blogName }}</h1>
    </div>
</template>

<style>

div.menu {
    width: 35px;
    height: 5px;
    background-color: black;
    margin: 6px 0;
}
.menu-container {
    margin: auto 0px;
}
.container {
    display: flex;
    justify-content: space-between;
}
</style>
