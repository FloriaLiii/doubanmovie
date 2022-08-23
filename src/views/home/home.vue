<template>
    <div class="home-container">
        <!-- 左边 -->
        <main class="left-content">

            <!-- 正在热映 -->
            <div class="now-play play-section">
                <h2 class="title">正在热映</h2>
                <div class="section-bottom" v-if="nowplayList && nowplayList.length">
                    <slider>
                        <mitem v-for="item in nowplayList" :itemData="item" :key="item.id"></mitem>
                    </slider>
                </div>
            </div>

            <!-- 最近热门电影 -->
            <div class="recent-play play-section">
                <h2 class="title">最近热门电影</h2>
                <div class="section-bottom" v-if="recentplayList && recentplayList.length">
                    <slider>
                        <div v-for="(item, index) in recentplayList" :key="index" class="recent-item">
                            <mitem v-for="(_item,_index) in item" :itemData="_item" :key="_item.id"></mitem>
                        </div>
                    </slider>
                </div>
            </div>
        </main>

        <!-- 右边 -->
        <aside class="right-content">

            <!-- 口碑榜 -->
            <div class="top-rank">
                <h2 class="title">一周口碑榜</h2>
                <div v-for="(item, index) in rankList" :key="index" class="rank-item">
                    {{ index+1 }}<router-link :to="'/detail'" class="rank-link">{{item.title}}</router-link>
                </div>
            </div>

            <!-- 合作 -->
            <div class="coopt">
                <h2 class="title">合作联系</h2>
                <ul>
                    <li>电影合作：douban@lvming.com</li>
                    <li>电视剧合作邮箱：douban@lvming.com</li>
                </ul>
            </div>

            <!-- 关于作者 -->
            <div class="fans">
                <h2 class="title">关于作者</h2>
                <div class="fans-list">
                    <div class="fans-item">
                        <div class="fans-img weibo"></div>
                        <div>
                            <a href="#">微博</a>
                        </div>
                    </div>
                    <div class="fans-item">
                        <div class="fans-img weixin">
                            <div class="hover">
                                <img src="./imgs/QRcode.jpg" width="130px" height="130px">
                            </div>
                        </div>
                        <div>
                            <a href="#">微信</a>
                        </div>
                    </div>
                    <div class="fans-item">
                        <div class="fans-img zhihu"></div>
                        <div>
                            <a href="#">知乎</a>
                        </div>
                    </div>    
                </div>
            </div>
        </aside>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import service from '@/utils/service'
import configapi from '@/utils/configapi';
import mitem from '@/components/mitem/mitem.vue'
import slider from '@/components/slider/slider.vue'

export default ({
    name: 'home',
    components: {
        mitem,
        slider
    },
    setup() {
        let nowplayList = ref([])
        let recentplayList = ref([])
        let rankList = ref([])

        let toArray = (data) => {
            let n = 10 //10个一组
            let len = data.length
            let num = len % n == 0 ? len/n : Math.floor(len/n)+1
            let res = []

            for(let i = 0; i < num ; i++){
                res.push(data.slice(i*n, i*n+n))
            }
            return res
        }

        onMounted(async () => {
            let data = await service.get(configapi.nowmovie, {
                start: 0,
                count: 50
            })
            nowplayList.value = data.subject_collection_items || []

            let recentData = await service.get(configapi.recentmovie, {
                start: 0,
                count: 50
            })
            recentplayList.value = toArray(recentData.subject_collection_items || [])

            let rankData = await service.get(configapi.toprank, {
                start: 0,
                count: 50
            })
            rankList.value = rankData.subject_collection_items || []
        })
      
        return {
            nowplayList,
            recentplayList,
            rankList
        }
    },
})
</script>

<style lang="less" scoped>
.home-container {
    display: flex;
    width: 1040px;
}

.left-content {
    width: 705px;
}

.right-content {
    width: 300px;
    margin-left: 20px;
}

.title {
    font-size: 19px;
    color: #111;
    padding-bottom: 10px;
    border-bottom: 1px solid #eaeaea;
    margin-bottom: 18px;
}

.now-play {
    min-height: 344px;
}

.recent-play {
    min-height: 565px;
}

.play-section {
    padding: 15px;
}

.top-rank {
    margin-top: 68px;
}

.recent-item {
    display: inline-block;
    width: 675px;
    white-space: normal;
}

.rank-item {
    padding: 7px 0;
    border-bottom: 1px solid #eaeaea;
    font-size: 13px;
    margin-bottom: 5px;
}

.rank-link {
    margin-left: 7px;
}

.coopt, .fans {
    margin-top: 50px;
}

.fans-list {
    display: flex;
}

.fans-item {
    text-align: center;
    margin-right: 20px;
}

.fans-img {
    width: 40px;
    height: 40px;
    background-size:cover;
    margin-bottom: 10px;
    &.weibo {
        background-image: url('./imgs/home_weibo@2x.jpg');
        cursor: pointer;
    }
    &.weixin {
        background-image: url('./imgs/home_weixin@2x.jpg');
        cursor: pointer;
        .hover {
            display: none;
            padding-top: 70px;
            margin-left: -35px;
        }
    }

    &.weixin:hover {
        background-image: url('./imgs/home_weixin@2x.jpg');
        .hover {
            display: block;

        }
    }    
    &.zhihu {
        background-image: url('./imgs/home_zhihu@2x.jpg');
        cursor: pointer;
    }
}

</style>
