<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container"> 
        <!-- 删掉-fluid就会变的窄一点 -->
        <!-- <a class="navbar-brand" href="/">King of Bots</a> -->
        <router-link class="navbar-brand" :to="{ name: 'home' }">King of Bots</router-link>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <!-- <a class="nav-link active" aria-current="page" href="/pk/">对战</a> -->
            <router-link v-bind:class="route_name == 'pk_index' ? 'nav-link active' : 'nav-link'" :to="{ name: 'pk_index' }">对战</router-link>
            <!-- active控制高亮效果 -->
            </li>
            <li class="nav-item">
            <!-- <a class="nav-link" href="/record/">对局列表</a> -->
            <router-link :class="route_name == 'record_index' ? 'nav-link': 'nav-link'" :to="{ name: 'record_index' }">对局列表</router-link>
            </li>
            <li class="nav-item">
            <!-- <a class="nav-link" href="/ranklist/">排行榜</a> -->
            <router-link :class="route_name == 'ranklist_index' ? 'nav-link': 'nav-link'" :to="{ name: 'ranklist_index' }">排行榜</router-link>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            yujinhao
          </a>
          <ul class="dropdown-menu">
            <li>
              <!-- <a class="dropdown-item" href="/user/bot/">我的Bot</a> -->
              <router-link class="dropdown-item" :to="{ name: 'user_bot_index' }">我的Bot</router-link>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">退出</a></li>
          </ul>
        </li>
          </ul>
        </div>
    </div>
    </nav>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue' // 需要实时计算的属性需要引入computed

export default {
  setup() {
    const route = useRoute(); // 先把页面信息取出来
    let route_name = computed(() => route.name); // 取出当前路由的name
    return {
      route_name // 这个是当前路由的name
    }
  }
}
</script>


<style scoped>


</style>