<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Bbob, { LinkInfo } from '../Bbob'

let props = defineProps<{
    nothingDescription: string,
    pageKey: string,
}>();

function draw(html: string): boolean {
    let htmlContent = document.getElementById('htmlContent')
    if (htmlContent) {
        htmlContent.innerHTML = html;
        Bbob.api.executeScriptElements(htmlContent);
        return true;
    }

    return false;
}

let loading = ref(true);
async function init() {
    for (let index = 0; index < Bbob.blog.categories.length; index++) {
        const category = Bbob.blog.categories[index];
        if (category.text == "DocumentSite") {
            let linksInfo: LinkInfo[] = await Bbob.api.getLinkInfosWithAddressAsync(category.address);
            for (let index = 0; index < linksInfo.length; index++) {
                const info = linksInfo[index];
                let otherInfo = info as any;
                if (otherInfo[props.pageKey]) {
                    let html = (await Bbob.api.getArticleFromAddressAsync(info.address)).contentParsed;
                    if (html) draw(html);
                    loading.value = false;
                    return;
                }
            }
        }
    }
    draw(`<h1>${props.nothingDescription}</h1>`);
    loading.value = false;
}

onMounted(init);
</script>

<template>
    <el-card id="pageParent">
        <span v-loading="loading" id="htmlContent">
        </span>
    </el-card>
</template>

<style>
#pageParent {
    margin-left: auto;
    margin-right: auto;
}
</style>
