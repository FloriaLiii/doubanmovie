<template>
    <div class="score" :style="{backgroundPositionY:'-'+posY+'px'}"></div>
</template>

<script>
import { reactive, computed } from 'vue'
    export default {
        name: 'rankstar',
        components: {},
        props: {
            score: {
                type: Number,
                default: 0
            }
        },
        setup(props) {
            let posY = computed( ()=> {

                let res = 0
                let s = props.score
                if(s > 9){
                    res = 0
                } else if (s > 8){
                    res = 11
                } else if (s > 7){
                    res = 22
                } else if (s > 6){
                    res = 33
                } else if (s > 5){
                    res = 44
                } else if (s > 4){
                    res = 55
                } else if (s > 3){
                    res = 66
                } else if (s > 2){
                    res = 77
                } else if (s > 1){
                    res = 99
                } else {
                    res = 99
                }
                return res
            })
            
            return {
                posY
            }  
        }
    }
</script>

<style lang="less" scoped>
  .score {
    width: 55px;
    height: 11px;
    background-image: url('./imgs/ic_rating_s@2x.png');
    background-size: cover;
  }
</style>