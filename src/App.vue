<template>
  <el-container style="height: 100vh;">
    <el-header>
      <el-menu :default-active="activeTab" mode="horizontal" class="el-menu-demo" @select="handleClick">
        <el-menu-item index="summary">Summary</el-menu-item>
        <el-menu-item index="add">Add Transaction</el-menu-item>
      </el-menu>
    </el-header>
    
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const activeTab = ref('summary');

const handleClick = (index) => {
  activeTab.value = index;
  router.push(`/${index}`);
};
</script>

<style>
body {
  font-family: 'Poppins', sans-serif;
}

.el-menu-demo {
  background-color: #545c64;
  border: none;
}
</style>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">