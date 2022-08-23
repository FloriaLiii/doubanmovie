<template>
     <div class="search-container">
        <h1 class="page-title">搜索：{{$route.query.searchText}}</h1>
        <div class="serach-result">
            <div v-if="searchList.list.length == 0">暂无搜索数据</div>
            
            <div class="item-content" v-for="item in searchList.list" :key="item.target.id">
                <img :src="item.target.cover_url" class="item-img">
                <div class="left-content">
                    <router-link :to="'/detail?id='+item.target.id">{{item.target.title}}（{{item.target.year}}）</router-link>
                    <div class="rank-content">
                        <rankstar :score="item.target.rating.value" class="rank-star"></rankstar>
                        <div class="score-text">{{item.target.rating.value}}</div>
                        <div>（{{item.target.rating.count}}人评价）</div>
                    </div>
                    <div class="place">{{item.target.card_subtitle}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref, reactive, watch, computed } from 'vue'
    import { useRoute } from 'vue-router'
    import service from '@/utils/service'
    import configapi from '@/utils/configapi'
    import rankstar from '@/components/rankstar/rankstar.vue'

    export default {
        name: 'search',
        components: {
            rankstar
        },
        setup() {

            let searchList = reactive({
                list: []
            })

            const route = useRoute()

            // let searchText = computed(() => route.query.searchText)

            watch(() => route.query.searchText, async (v) => {
                let data = await service.get(configapi.search, {
                    start: 0,
                    count: 20,
                    q:v
                })
                console.log(data.items);
                searchList.list = data.items.filter( item => {
                    return item.target_type == 'movie'
                })
            }, {
                deep: false,
                immediate: true
            })

            return{
                searchList,
            }
        }
    }
</script>

<style lang="less" scoped>

.search-container {
    margin-top: 0 auto;
}

.page-title {
    margin-top: 25px;
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 30px;
    padding: 0;
    color: #494949;
}

.item-content {
    display: flex;
    padding: 10px;;
    .item-img {
      width: 48px;
      height: 69px;
      margin-right: 15px;
    }
    .title {
      font-size: 14px;
    }
    .rank-content {
      display: flex;
    }
    .rank-star {
      margin-top: 3px;
      margin-right: 3px;
    }
    .score-text {
      color: #e09015;
    }
    .place {
        color: #999;
    }
}
  
</style>