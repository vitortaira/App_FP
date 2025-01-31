<template>
  <el-card class="monthly-summary-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <el-icon><Calendar /></el-icon>
        <span>Monthly Summary</span>
      </div>
    </template>

    <!-- Date Picker Section -->
    <div class="date-picker-wrapper">
      <el-card class="date-picker-card" shadow="never">
        <div class="date-picker-content">
          <span class="date-label">Select Month:</span>
          <el-date-picker
            v-model="selectedMonth"
            type="month"
            placeholder="Pick a month"
            size="large"
            class="styled-date-picker"
            @change="updateFinancialSummary"
          />
        </div>
      </el-card>
    </div>

    <el-divider />

    <!-- Summary Cards Layout -->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="always" class="summary-card income-card">
          <el-statistic title="Total Income" :value="totalIncome" prefix="R$" :formatter="formatCurrency"/>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="always" class="summary-card expense-card">
          <el-statistic title="Total Expenses" :value="totalExpenses" prefix="R$" :formatter="formatCurrency"/>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="always" class="summary-card net-savings-card"
          :style="{ borderColor: netSavings >= 0 ? '#67C23A' : '#F56C6C' }">
          <el-statistic
            title="Net Savings"
            :value="netSavings"
            prefix="R$"
            :value-style="{ color: netSavings >= 0 ? '#67C23A' : '#F56C6C' }"
            :formatter="formatCurrency"
          />
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Calendar } from '@element-plus/icons-vue';
import { useFinanceStore } from '../stores/financeStore';

const props = defineProps<{
  store: ReturnType<typeof useFinanceStore>
}>();
const store = props.store as ReturnType<typeof useFinanceStore>;

const formatCurrency = (value: number) => value.toFixed(2);

const selectedMonth = ref(new Date().toISOString().slice(0, 7));
const totalIncome = ref(0);
const totalExpenses = ref(0);
const netSavings = ref(0);

const updateFinancialSummary = () => {
  const [year, month] = new Date(selectedMonth.value).toISOString().slice(0, 7).split('-');
  const initialDate = new Date(Number(year), Number(month) - 1, 1);
  const finalDate = new Date(Number(year), Number(month), 0);

  const result = props.store.calculateTotalsForPeriod(initialDate.toISOString(), finalDate.toISOString());

  totalIncome.value = result.totalIncome
  totalExpenses.value = result.totalExpenses
  netSavings.value = result.netSavings

};

watch(
  () => props.store.transactions,
  updateFinancialSummary,
  { immediate: true, deep: true }
);
</script>

<style scoped>
.monthly-summary-card {
  max-width: 800px;
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

/* Date Picker Styling */
.date-picker-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.date-picker-card {
  width: 100%;
  max-width: 450px;
  padding: 20px;
  border-radius: 12px;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e4e7ed;
}

.date-picker-content {
  width: 100%;
  text-align: center;
}

.date-label {
  font-size: 16px;
  font-weight: 600;
  color: #606266;
  margin-bottom: 10px;
  display: block;
}

.styled-date-picker {
  width: 100%;
  max-width: 350px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.styled-date-picker :deep(.el-input__wrapper) {
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
}

.styled-date-picker:deep(.el-input__wrapper):hover {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

/* Summary Cards */
.summary-card {
  text-align: center;
  border-radius: 10px;
  padding: 15px;
  transition: transform 0.2s ease-in-out;
}

.summary-card:hover {
  transform: scale(1.03);
}

.income-card {
  border-left: 5px solid #67C23A;
}

.expense-card {
  border-left: 5px solid #F56C6C;
}

.net-savings-card {
  border-left: 5px solid var(--net-savings-color);
}
</style>
