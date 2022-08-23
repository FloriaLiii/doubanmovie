<template>
    <div class="detail-container">
        <div class="left-container">
            <movieinfo></movieinfo>  
            <movieactors></movieactors>    
            <moviecomments></moviecomments>
        </div>
    </div>
</template>

<script>
    import movieinfo from './movieinfo.vue'
    import movieactors from './movieactors.vue'
    import moviecomments from './moviecomments.vue'
    export default {
        name: 'detail',
        components: {
            movieinfo,
            movieactors,
            moviecomments
        }
    }
</script>

<style lang="less" scoped>
.detail-container {
    display: flex;
}

.left-content {
    width: 705px;
    margin-top: 40px;
    padding: 15px;
}
</style>