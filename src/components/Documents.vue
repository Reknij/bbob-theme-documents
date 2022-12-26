<script setup lang="ts">
import { normal } from '../composition/changeSize'
import DocumentCategories from './DocumentCategories.vue'
import { clearCache, getArticle, articleSelected } from '../composition/documentData';
import { onMounted, onUpdated, watch } from 'vue';
import Bbob from '../Bbob';
import { onBeforeRouteLeave, useRouter } from 'vue-router';

let router = useRouter();

onBeforeRouteLeave(() => {
    clearCache();
})

onMounted(() => {
    clearCache();
    let address = router.currentRoute.value.params.address as string;
    if (address && address != 'loading') {
        getArticle(address);
    }
    else {
        drawHtml(articleSelected.value?.contentParsed ?? 'No found content parsed.')
    }
})
function drawHtml(value: string) {
    let htmlContent = document.getElementById('htmlContent')
    if (htmlContent) {
        htmlContent.innerHTML = value;
        Bbob.api.executeScriptElements(htmlContent);
    }
}
watch(articleSelected, () => drawHtml(articleSelected.value?.contentParsed ?? 'No found content parsed.'));
watch(router.currentRoute, (value, oldValue) => {
    if (value.params.address == oldValue.params.address) return;
    getArticle(value.params.address as string);
})
</script>

<template>
    <el-row>
        <el-col v-if="normal" :span="4">
            <DocumentCategories v-if="normal"></DocumentCategories>
        </el-col>
        <el-col v-if="normal" :span="1"></el-col>
        <el-col :span="normal ? 19 : 24">
            <el-card id="articleContent">
                <span id="htmlContent">
                </span>
            </el-card>
        </el-col>
    </el-row>
</template>

<style>
.articlesTitle {
    margin-left: 15px;
}

#articleContent {
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;
}
</style>
