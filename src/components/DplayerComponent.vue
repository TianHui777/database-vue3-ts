<template>
  <div className="p-4">
    <div id="dplayer"></div>
  </div>
</template>
<script lang="ts" setup>
import {defineComponent, onMounted} from 'vue';
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
      url: 'https://vod.bunediy.com/20210706/NiYYm3Ki/index.m3u8',
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
  });
};
onMounted(() => {
  initPlayer();
});


// export default defineComponent({
//   setup() {
//
//
//     return {};
//   },
// });
</script>
