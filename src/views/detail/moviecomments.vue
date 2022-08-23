<template>
    <div class="movie-comments" v-if="detailData.list.length">
        <h2 class="intro-title">{{title}}的影评· · · · · ·</h2>
        <div class="scroll-wrap">
            <div class="comment-item" v-for="item in detailData.list || []" :key="item.id">
                <div class="top-content">
                    <img :src="item.user.avatar" alt="" class="avatar">
                    <span class="nickname">{{item.user.name}}</span>
                    <div class="rankstar" v-if="item.rating && item.rating.value"><span class="rank-text">看过</span><rankstar :score="item.rating.value"></rankstar></div>
                    <div class="time">{{item.create_time}}</div>
                </div>
                <div class="content three line">{{item.abstract}}</div>
            </div>
        </div>

    </div>
</template>

<script>
    import service from '@/utils/service'
    import configapi from '@/utils/configapi'
    import { useStore } from 'vuex'
    import { useRoute } from 'vue-router'
    import { onMounted, reactive, computed } from 'vue'
    import rankstar from '@/components/rankstar/rankstar.vue'
    
    export default {
        name: 'moviecomments',
        components: {
            rankstar
        },
        setup() {
            let store = useStore()
            let route = useRoute()

            let detailData = reactive({
                list: []
            })

            let id = computed(() => route.query.id)
            const title = computed(() => store.state.detailTitle)

            const incommentList = computed(() => store.state.commentList)

            onMounted(async () => {
                let data = await service.get(configapi.comments(id.value), {
                    start: 0,
                    count: 20
                })

                detailData.list = incommentList.value.reverse().concat(data.reviews || [])
                // console.log('detailData.list')
            })

            
            return {
                title,
                detailData

            }
        }
    }
</script>

<style lang="less" scoped>
.movie-comments {
    width: 950px;
}

.intro-title {
    margin: 24px 0 12px 0;
    font-size: 16px;
    color: #007722;
}

.top-content {
    display: flex;
    align-items: center;
    .avatar {
      width: 24px;
      height: 24px;
    }
    .nickname {
      font-size: 13px;
      margin-left: 10px;
      color: #37a;
      margin-right: 10px;;
    }
    .time {
      font-size: 13px;
      margin-left: 10px;
      color: #999;
    }
  }

.comment-item {
    padding: 20px 0px;
    position: relative;
    border-top: 0.5px solid #ddd;
    margin-bottom: 5px;
}

.rankstar {
    display: flex;
    align-items: center;
  }

.rank-text {
    margin-right: 3px;
}
.content {
    margin-top: 10px;
    color: #666;
    font-size: 13px;
    line-height: 1.5;
}
</style>