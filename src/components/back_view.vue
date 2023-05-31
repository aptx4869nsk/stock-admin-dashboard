<template>
  <div class="fullscreen-container">
    <vue-particles :params="particlesConfig"></vue-particles>
  </div>
</template>

<style>
.fullscreen-container {
  background-color: #000013;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

<script>
export default {
  data() {
    return {
      particlesConfig: {
        particles: {
          number: {
            value: 60, // 粒子数量
            density: {
              enable: true,
              value_area: 200, // 粒子分布密度
            },
          },
          color: {
            value: ["#ffffff", "#ff0000", "#00ff00", "#0000ff"], // 设置颜色数组
            random: true, // 随机选择颜色
          },
          shape: {
            type: "circle", // 粒子形状
            stroke: {
              width: 0, // 描边宽度
              color: "#000000", // 描边颜色
            },
            polygon: {
              nb_sides: 5, // 多边形的边数
            },
            image: {
              src: "img/github.svg", // 自定义图片路径
              width: 100, // 图片宽度
              height: 100, // 图片高度
            },
          },
          opacity: {
            value: 0.5, // 粒子透明度
            random: false, // 随机透明度
            anim: {
              enable: false, // 是否启用透明度动画
              speed: 1, // 透明度动画速度
              opacity_min: 0.1, // 最小透明度
              sync: false, // 是否同步动画
            },
          },
          size: {
            value: 3, // 粒子大小
            random: true, // 随机大小
            width: window.innerWidth,
            height: window.innerHeight,
            anim: {
              enable: false, // 是否启用大小动画
              speed: 40, // 大小动画速度
              size_min: 0.1, // 最小大小
              sync: false, // 是否同步动画
            },
          },
          line_linked: {
            enable: true, // 是否显示粒子间连线
            distance: 150, // 连线距离
            color: "#ffffff", // 连线颜色
            opacity: 0.4, // 连线透明度
            width: 1, // 连线宽度
          },
          move: {
            enable: true, // 是否允许粒子运动
            speed: 2, // 粒子移动速度
            direction: "bottom", // 运动方向
            random: false, // 随机运动方向
            straight: false, // 直线运动
            out_mode: "out", // 离开画布的模式
            bounce: false, // 边界反弹
            attract: {
              enable: false, // 是否吸引粒子
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        canvasStyle: {
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
        },
        interactivity: {
          detect_on: "canvas", // 交互事件检测的对象
          events: {
            onhover: {
              enable: true, // 是否启用鼠标悬停事件
              mode: "repulse", // 悬停模式
            },
            onclick: {
              enable: true, // 是否启用鼠标点击事件
              mode: "push", // 点击模式
            },
            resize: true, // 是否监听窗口大小变化
          },
          modes: {
            grab: {
              distance: 400, // 吸附距离
              line_linked: {
                opacity: 1, // 连线透明度
              },
            },
            bubble: {
              distance: 400, // 气泡距离
              size: 40, // 气泡大小
              duration: 2, // 气泡持续时间
              opacity: 8, // 气泡透明度
              speed: 3, // 气泡速度
            },
            repulse: {
              distance: 200, // 排斥距离
              duration: 0.4, // 排斥持续时间
            },
            push: {
              particles_nb: 4, // 粒子数量
            },
            remove: {
              particles_nb: 2, // 粒子数量
            },
          },
        },
        retina_detect: true, // 是否适配 Retina 屏幕
      },
    };
  },
};
</script>
