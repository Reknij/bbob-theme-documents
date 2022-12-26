import { ref } from "vue";
import Bbob, { Article } from '../Bbob';

let articleSelected = ref<Article>()
let activeName = ref('0')

function getArticle(address: string) {
    Bbob.api.getArticleFromAddress(address, (article) => {
        if (article.contentParsed) {
            articleSelected.value = article;
        }
        activeName.value = address;
    })
}

function clearCache(){
    articleSelected.value = undefined;
    activeName.value = '0'
}

export {
    articleSelected, getArticle, activeName, clearCache
}