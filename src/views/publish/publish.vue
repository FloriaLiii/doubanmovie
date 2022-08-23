<template>
    <div class="publish-container">
        <h1 class="page-title">写评论</h1>
        <div class="movie-info" v-if="movieData.title">
            <img :src="movieData.cover_url" alt="" class="info-img">
            <div class="right-info">
                <div class="title">{{movieData.title}}</div>
                 <div class="desc">
                     导演 {{movieData.directors[0].name}} 主演 {{movieData.actors[0].name+' / '+movieData.actors[1].name}} {{movieData.countries.join(' / ')}}  / {{movieData.rating.value}}分 ({{movieData.comment_count}}人评价)
                </div>
            </div>
        </div>

        <div class="score-add">
            <div>给个评价吧：</div>
            <div class="rankstar">
                <div :class="['star-item', item.state]" v-for="(item, index) in starlist.list || []" :key="index" @mouseenter="changeScore(index)"></div>
            </div>
        </div>

        <div class="text-input">
            <textarea name="" id="commentInput" placeholder="写评论" v-model.trim="content"></textarea>
        </div>

        <div id="submitBtn" @click="submit">提交</div>
    </div>
</template>

<script>
    import { ref, reactive, computed, onMounted } from 'vue'
    import Vuex from 'vuex' 
    import { useRoute } from 'vue-router'
    import service from '@/utils/service'
    import configapi from '@/utils/configapi'
    import moment from 'moment'

    export default {
       name: 'publish',
       
       setup() {
           let movieData = ref({})
           let content = ref('')

           let starlist = reactive({
               list: new Array(5).fill({state:'normal'})
           })

            const route = useRoute()
            
            let id = computed(() => route.query.id)

            onMounted(async () => {
                let data = await service.get(configapi.detail(id.value), {})
                movieData.value = data
                console.log(data);
            })

            const changeScore = (index) => {
                let list = []

                starlist.list.forEach((item, _index) => {
                    if(_index <= index) {
                        item.state = 'full'
                    } else {
                        item.state = 'normal'
                    }

                    list.push({...item})
                })

                starlist.list = list
            }


           return {
               starlist,
               movieData,
               changeScore
           }
       },
       computed: {
           userInfo() {
               return this.$store.state.userInfo
           }
       },
       methods: {
           submit() {
               let count = 0
               this.starlist.list.forEach((item) => {
                   if(item.state == 'full') {
                       count++
                   }
               })
                debugger
               this.$store.commit('setCommentList', {
               rating: {
                   value: count*2
               },
               user: {
                   avatar : this.userInfo.avatar,
                   name: this.userInfo.name
               },
               create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
               abstract: this.content
            })

            this.$router.push('/detail?id=' + this.movieData.id)
           }

       }
    }
</script>

<style lang="less" scoped>

.publish-container {
    
    width: 590px;
    margin: 0 auto;
}

.page-title {
    font-size: 14px;
    margin-top: 5px;
    color: #007722;
}

.movie-info {
    display: flex;
    width: 590px;
    height: 62px;
    margin: 0 auto;
    margin-top: 10px;
    background-color: #f8f8f8;
    overflow: hidden;
  }

.info-img {
    width: 48px;
    height: 62px;
    margin-right: 15px;
}

.right-info {
    padding: 10px 40px 0 0;
    margin-bottom: 5px;
    
    .title {
      color: #37a;
      font-size: 14px;
      line-height: 1.4;
    }
    .desc {
      margin-top: 2px;
      color: #999;
    }
}

.rankstar {
    display: flex;
    align-items: center;
}

.star-item {
    width: 16px;
    height: 16px;
    background-size: cover;
    cursor: pointer;
    &.normal {
      background-image: url('./imgs/star.png');
    }
    &.full {
      background-image: url('./imgs/star-fill.png');
    }
}

.score-add {
    margin-top: 30px;
    display: flex;
}

.text-input {
    margin-top: 20px;
}

#commentInput {
    outline: none;
    border: none;
    border-top: 1px solid #ddd;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    padding: 16px 10px;
    width: 100%;
    min-height: 400px;
    overflow: auto;
    font-size: 14px;
}

  #submitBtn {
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    background-color: #3db04d;
    width: 28px;
    cursor: pointer;
}

</style>