<template>
  456
  <uni-test></uni-test>
  <button @click="add">add{{counter.count}}</button>
  <button @click="go"> go sub</button>
</template>
<script setup>
import {
  onLoad,
  onShow
} from "@dcloudio/uni-app";
import { useCounterStore } from '@/stores/counter';
const counter = useCounterStore();
const add=()=>{
  counter.count++
}
const go=()=>{
  uni.navigateTo({
    url: '/pkgGuess/pages/index'
  });
}
// onLoad 接受 A 页面传递的参数
onLoad((option) => {
  console.log("B 页面 onLoad:", option); //B 页面 onLoad: {id: '1', name: 'uniapp'}
});

onShow(() => {
  console.log("B 页面 onShow");
});
</script>