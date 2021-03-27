<!--
 * @Descripttion: 自定义资源页面
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-24 19:47:38
-->
<template>
  <div>
      <el-button type="primary" @click="index">Index</el-button>
      <el-button type="primary" @click="home">Home</el-button>
      <br>
      <br>
      <el-button type="primary" @click="l1i1">Level1 index1</el-button>
      <el-button type="primary" @click="l2i1">Level2 index1</el-button>
      <el-button type="primary" @click="l3i1">Level3 index1</el-button>
      <br>
      <br>
      <el-button type="primary" @click="l1i2">Level1 index2</el-button>
      <el-button type="primary" @click="l2i2">Level2 index2</el-button>
      <el-button type="primary" @click="l3i2">Level3 index2</el-button>
      <br>
      <br>
      <el-button type="primary" @click="l1i3">Level1 index3</el-button>
      <el-button type="primary" @click="l2i3">Level2 index3</el-button>
      <el-button type="primary" @click="l3i3">Level3 index3</el-button>
  </div>
</template>

<script>

import axios from "axios";
import request from '@/utils/request'
export default {
  methods: {

    httpRequest: function(url){

      request({
        url: "http://localhost:8081/customize" + url,
        method: 'get',
      }).then((res)=>{
        console.log(res);
      }).catch((error)=>{
        console.log(error);
      });


      // axios.get("http://localhost:8081/customize" + url).then((res)=>{
      //   console.log(res);
      // }).catch((error)=>{
      //   console.log(error);
      // });
    },

    index: function(){
        this.httpRequest("/index");
    },
    home: function(){
      console.log("home");
      this.httpRequest("/home");
    },
    l1i1: function(){
      console.log("l1i1");
      this.httpRequest("/level1/1");
    },
    l2i1: function(){
      console.log("l2i1");
      this.httpRequest("/level2/1");
    },
    l3i1: function(){
      console.log("l3i1");
      this.httpRequest("/level3/1");
    },
    l1i2: function(){
      console.log("l1i2");
      this.httpRequest("/level1/2");
    },
    l2i2: function(){
      console.log("l2i2");
      this.httpRequest("/level2/2");
    },
    l3i2: function(){
      console.log("l3i2");
      this.httpRequest("/level3/2");
    },
    l1i3: function(){
      console.log("l1i3");
      this.httpRequest("/level1/3");
    },
    l2i3: function(){
      console.log("l2i3");
      this.httpRequest("/level2/3");
    },
    l3i3: function(){
      console.log("l3i3");
      this.httpRequest("/level3/3");
    },
  }
};
</script>

<style lang="less" scoped>
</style>