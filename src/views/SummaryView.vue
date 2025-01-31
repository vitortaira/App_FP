<template>
  <MonthlySummaryCard :store="financeStore"/>
  <TransactionsHistoryTable :store="financeStore" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useFinanceStore } from '../stores/financeStore';
import TransactionsHistoryTable from '../components/TransactionsHistoryTable.vue';
import MonthlySummaryCard from '../components/MonthlySummaryCard.vue';
import { Transaction } from '@/types/Transaction';

const financeStore = useFinanceStore();

onMounted(() => {
  // Load stored transactions
  financeStore.loadFromLocalStorage();
});

</script>

<style scoped>
.box-card {
  margin-top: 20px;
}
</style>
