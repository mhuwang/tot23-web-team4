<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-26 13:17:55
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-04-11 16:22:10
-->
<template>
    <h1>NameSpace Details</h1>
</template>

<script>
export default {
    name: 'NameSpaceDetails',
    mounted: function(){
        console.log(this.getNameSpace());
    },
    methods: {
        getNameSpace(){
            // 获取最后一个 / 的位置
            let index = this.$route.path.lastIndexOf('/');
            return this.$route.path.substring(index + 1, this.$route.path.length);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>