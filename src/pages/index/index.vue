<template>
  <view class="content">
    <!-- <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title" @click="go">{{ title }}</text>

      <view>123</view>
    </view> -->
    <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
      @scroll="scroll">
      <view id="demo1" v-for="i in 100" class="scroll-view-item uni-bg-red">{{ i }}A</view>
      <button @click="goTop">top</button>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref,nextTick } from 'vue'
const title = ref('title')
const go = () => {
  uni.switchTab({
    url: '/pages/index/home',
  })
}

const scrollTop = ref(0)
const old = ref({
  scrollTop: 0
})

const upper = (e) => {
  console.log(e)
}
const lower = (e) => {
  console.log(e)
}
const scroll = (e) => {
  console.log(e)
  old.value.scrollTop = e.detail.scrollTop
}
const goTop = (e) => {
  // 解决view层不同步的问题
  scrollTop.value = old.scrollTop
  nextTick(function () {
    scrollTop.value = 0
  });
  uni.showToast({
    icon: "none",
    title: "纵向滚动 scrollTop 值已被修改为 0"
  })
}

</script>

<style>
.scroll-Y {
  height: 100vh;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
