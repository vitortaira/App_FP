<template>
  <el-card class="transaction-form-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <el-icon><Coin /></el-icon>
        <span>Add Transaction</span>
      </div>
    </template>

    <el-form 
      ref="formRef" 
      :model="formData" 
      :rules="rules"
      label-width="120px"
      class="styled-form"
      @submit.prevent="onSubmit"
    >
      <!-- Transaction Type -->
      <el-form-item label="Type" prop="type">
        <el-radio-group v-model="formData.type" class="styled-radio-group">
          <el-radio value="income">Income</el-radio>
          <el-radio value="expense">Expense</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- Amount -->
      <el-form-item label="Amount (R$)" prop="amount">
        <el-input 
          v-model.number="formData.amount" 
          type="number" 
          placeholder="Enter amount"
          class="styled-input"
        />
      </el-form-item>

      <!-- Description -->
      <el-form-item label="Description" prop="description">
        <el-input 
          v-model="formData.description" 
          placeholder="Enter description"
          class="styled-input"
        />
      </el-form-item>

      <!-- Date -->
      <el-form-item label="Date" prop="date">
        <el-date-picker
          v-model="formData.date"
          type="date"
          placeholder="Select date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          class="styled-date-picker"
        />
      </el-form-item>

      <!-- Action Buttons -->
      <el-form-item class="form-actions">
        <el-button type="primary" @click="submitForm" class="styled-button">Submit</el-button>
        <el-button @click="resetForm" class="styled-button secondary">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElForm, ElMessage } from 'element-plus';
import { Coin } from '@element-plus/icons-vue';
import { useFinanceStore } from '../stores/financeStore';
import { Transaction } from '@/types/Transaction';

const financeStore = useFinanceStore();

// Reactive form data
const formData = ref<Transaction>({
  type: 'income',
  amount: null,
  date: '',
  description: '',
});

// Validation rules
const rules = {
  type: [
    { required: true, message: 'Transaction type is required', trigger: 'change' }
  ],
  amount: [
    { required: true, message: 'Amount is required', trigger: 'blur' },
    { type: 'number', min: 0.01, message: 'Amount must be greater than 0', trigger: 'blur' }
  ],
  description: [
    { required: true, message: 'Description is required', trigger: 'blur' },
    { min: 3, message: 'Description must be at least 3 characters', trigger: 'blur' }
  ],
  date: [
    { required: true, message: 'Date is required', trigger: 'change' }
  ]
};

// Reference to <el-form> for validation
const formRef = ref<InstanceType<typeof ElForm> | null>(null);

function onSubmit() {
  // Overridden to prevent page reload
}

function submitForm() {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      financeStore.addTransaction({ ...formData.value });
      resetForm();
      ElMessage.success('Transaction added successfully');
    } else {
      ElMessage.error('Please correct the errors before submitting');
    }
  });
}

function resetForm() {
  formRef.value?.resetFields();
}
</script>

<style scoped>
/* General Card Styling */
.transaction-form-card {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
}

/* Header Styling */
.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: bold;
  color: #303133;
}

/* Form Styling */
.styled-form {
  width: 100%;
}

/* Radio Button Styling */
.styled-radio-group {
  display: flex;
  gap: 15px;
}

/* Input & Date Picker Styling */
.styled-input, 
.styled-date-picker {
  width: 100%;
  max-width: 350px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.styled-input :deep(.el-input__wrapper), 
.styled-date-picker :deep(.el-input__wrapper) {
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
}

.styled-input:deep(.el-input__wrapper):hover, 
.styled-date-picker:deep(.el-input__wrapper):hover {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

/* Button Styling */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.styled-button {
  border-radius: 8px;
  padding: 10px 15px;
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