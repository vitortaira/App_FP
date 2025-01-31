<template>
    <TransactionForm />
</template>

<script setup>
import { useFinanceStore } from '../stores/financeStore';
import TransactionForm from '../components/TransactionForm.vue';

const financeStore = useFinanceStore();

function handleSubmit(formData) {
  financeStore.addTransaction(formData);
}
</script>

<style scoped>
.box-card {
  margin-top: 20px;
}
</style>
