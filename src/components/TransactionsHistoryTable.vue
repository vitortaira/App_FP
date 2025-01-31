<template>
  <el-card class="transaction-table-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <el-icon><Coin /></el-icon>
        <span>Transaction List</span>
      </div>
    </template>

    <el-table :data="filteredTransactions" style="width: 100%" class="styled-table">
      <el-table-column label="Date" prop="date" sortable />
      <el-table-column label="Description" prop="description" sortable />
      <el-table-column label="Amount" prop="amount" sortable>
        <template #default="scope">
          R$ {{ scope.row.amount.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column label="Type" prop="type" sortable />
      
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Search by description" class="styled-input" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)" class="styled-button">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index)" class="styled-button secondary">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <!-- Edit Modal -->
  <TransactionEditModal 
    v-model="isModalVisible"
    :transaction="selectedTransaction"
    @save="updateTransaction"
  />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import TransactionEditModal from './TransactionEditModal.vue';
import { useFinanceStore } from '../stores/financeStore';
import { ElMessage } from 'element-plus';
import { Coin } from '@element-plus/icons-vue';
import { Transaction } from '@/types/Transaction';

const props = defineProps<{ store: ReturnType<typeof useFinanceStore> }>();

const search = ref('');
const isModalVisible = ref(false);
const selectedTransaction = ref<Transaction | null>(null);
const selectedIndex = ref<number | null>(null);

const filteredTransactions = computed(() =>
  props.store.transactions.filter((transaction: Transaction) =>
    search.value ? transaction.description.toLowerCase().includes(search.value.toLowerCase()) : true
  )
);

const handleEdit = (index: number, transaction: Transaction) => {
  selectedTransaction.value = { ...transaction };
  selectedIndex.value = index;
  isModalVisible.value = true;
};

const updateTransaction = (updatedTransaction: Transaction) => {
  if (selectedIndex.value !== null) {
    props.store.transactions[selectedIndex.value] = updatedTransaction;
    props.store.saveToLocalStorage();
    ElMessage.success('Transaction updated successfully');
  } else {
    ElMessage.error('Update failed: Invalid transaction index');
  }
};

const handleDelete = (index: number) => {
  try {
    props.store.deleteTransaction(index);
    ElMessage.success('Transaction deleted successfully');
  } catch (error) {
    ElMessage.error('Deletion failed');
  }
};
</script>

<style scoped>
.transaction-table-card {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: bold;
  color: #303133;
}

.styled-table {
  width: 100%;
}

.styled-input {
  width: 100%;
  max-width: 250px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.styled-input:deep(.el-input__wrapper):hover {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.styled-button {
  border-radius: 8px;
  padding: 8px 12px;
  transition: background 0.3s ease, transform 0.2s ease-in-out;
}

.styled-button:hover {
  transform: scale(1.05);
}

.secondary {
  background: #f4f4f5;
  color: #606266;
}

.secondary:hover {
  background: #e4e7ed;
}
</style>