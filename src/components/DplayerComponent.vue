<template>
  <div className="p-4">
    <div id="dplayer"></div>
  </div>
</template>
<script lang="ts" setup>
import {onMounted} from 'vue';
import Hls from 'hls.js';
import DPlayer from 'dplayer';


let dp: any;

// 初始化播放器
const initPlayer = () => {
  dp = new DPlayer({
    container: document.getElementById('dplayer'),
    autoplay: false,
    theme: '#0093ff',
    loop: true,
    lang: 'zh-cn',
    screenshot: true,
    hotkey: true,
    preload: 'auto',
    volume: 0.7,
    mutex: true,
    logo: 'https://i.loli.net/2019/06/06/5cf8c5d94521136430.png',
    video: {
      url: 'http://47.103.40.79:8080/mooc_video/hls/b.m3u8',
      type: 'customHls',
      customType: {
        customHls: (video: any, player: any) => {
          console.log('查看传递的参数', video, player);
          const hls = new Hls();
          hls.loadSource(video.src);
          hls.attachMedia(video);
        },
      },
    },
    contextmenu: [
      {
        text: 'custom1',
        link: 'https://github.com/DIYgod/DPlayer',
      },
      {
        text: 'custom2',
        // click: (player: any) => {
        //   console.log(player);
        // },
      },
    ],

    highlight: [
      {
        time: 20,
        text: '这是第 20 秒',
      },
      {
        time: 120,
        text: '这是 2 分钟',
      },
    ],
  });
};
onMounted(() => {
  initPlayer();
});

</script>

<style scoped>

</style>
