<script setup lang="ts">
import { Ref, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import Bbob, { LinkInfo } from '../Bbob';
import { activeName, getArticle, articleSelected } from '../composition/documentData';
import { routes } from '../router';

const router = useRouter();

let clickDoc = (address: string) => {
    if (address == '' || address == undefined || address == router.currentRoute.value.params.address) {
        return;
    }
    router.replace({ params: { address } });
}

let categoriesName: string[] = [];
let blogs: any = {}
for (let index = 0; index < Bbob.blog.categories.length; index++) {
    const category = Bbob.blog.categories[index];
    if (category.text == "DocumentSite") continue;
    categoriesName.push(category.text);
    blogs[category.text] = ref<LinkInfo[]>();
    Bbob.api.getLinkInfosWithAddress(category.address, (linkArray) => {
        blogs[category.text].value = linkArray
        if (router.currentRoute.value.params.address == "loading" && index == 0 && linkArray[0]) {
            clickDoc(linkArray[0].address);
        }
    })
}

</script>

<template>
    <div>
        <div v-for="(category, indexCategory) in categoriesName" :key="indexCategory">
            <h1>{{ category }}</h1>
            <div class="articlesTitle">
                <el-collapse accordion v-model="activeName" @change="(a: any) => clickDoc(a as string)">
                    <el-collapse-item v-for="(link, index) in blogs[category].value" :key="index"
                        :name="link.address">
                        <template #title style="word-wrap: break-all;">
                            <h4 v-if="activeName == link.address">{{ link.title }}</h4>
                            <span v-else>{{ link.title }}</span>
                        </template>
                        <span v-html="articleSelected?.toc"></span>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
    </div>
</template>

<style>
.articlesTitle {
    margin-left: 15px;
}

.toc-item a {
    color: #303133;
    text-decoration: none;
}

.toc-item a:hover {
    color: #409eff;
    text-decoration: underline;
}

.toc-number {
    display: none;
}

.el-collapse-item__header {
    line-height: normal;
    padding: 5px 0px;
}
</style>
