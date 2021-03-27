<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-26 13:17:55
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-27 13:41:58
-->
<template>
    <h1>NameSpace Details</h1>
</template>

<script>
export default {
    name: 'NameSpaceDetails',
    created: function(){
        console.log(this.$store.state.namespaces.namespaceDetails);
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>

</style>