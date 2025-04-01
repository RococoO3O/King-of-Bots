<!-- 游戏地图容器组件 -->
<template>
    <!-- 父容器元素：通过 ref 获取 DOM 引用 -->
    <div ref="parent" class="gamemap">
      <!-- Canvas 画布元素：用于绘制游戏图形 -->
      <canvas ref="canvas"></canvas>
    </div>
  </template>
  
  <script>
  // 导入游戏地图核心逻辑模块
  import { GameMap } from '@/assets/scripts/GameMap';
  // 导入 Vue 组合式 API
  import { ref, onMounted } from 'vue';
  
  export default {
    // 使用 composition API 的 setup 函数
    setup() {
      // 创建 DOM 元素引用（Vue 3 的 ref 机制）
      const parent = ref(null);  // 父容器 DOM 引用
      const canvas = ref(null);  // Canvas 元素 DOM 引用
  
      // 生命周期钩子：组件挂载后执行
      onMounted(() => {
        // 获取 Canvas 2D 渲染上下文
        const ctx = canvas.value.getContext('2d');
        // 初始化游戏地图实例，传入绘图上下文和父容器尺寸
        new GameMap(ctx, parent.value);
      });
  
      // 暴露模板需要的响应式引用
      return { parent, canvas };
    }
  }
  </script>
  
  <style scoped>
  /* 容器样式：scoped 表示仅作用于当前组件 */
  div.gamemap {
    width: 100%;    /* 占满父容器宽度 */
    height: 100%;   /* 占满父容器高度 */
    display: flex;
    justify-content: center; /* 水平居中对齐 */
    align-items: center;   /* 垂直居中对齐 */
  }
  
  /* Canvas 默认样式会由 GameMap 类动态设置，
     通常会根据容器尺寸同步调整 canvas.width/height */
  </style>
  