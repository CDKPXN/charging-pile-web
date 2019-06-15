<template>
<!--
    总览所有数据在此请求
 -->
    <div style="margin-top:5px;">
    <!-- 总览 -->
        <!-- 头部 -->
        <OverviewHeader style="margin-top:-10px"></OverviewHeader>
        <!-- 主体 -->
        <OverviewBody></OverviewBody>
        <!-- 底部 -->
        <OverviewFooter></OverviewFooter>
    </div>
</template>

<script>
    import OverviewHeader from './components/header.vue'
    import OverviewBody from './components/body.vue'
    import OverviewFooter from './components/footer.vue'     

    import axios from 'axios'
    import url from '../../config/url.js'

    export default {
        components:{
            OverviewHeader,
            OverviewBody,
            OverviewFooter
        },
        data () {
            return {
                headerData:[]
            }
        },
    }
</script>
