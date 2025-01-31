<template>
  <el-dialog v-model="visible" class="transaction-dialog" shadow="hover">
    <!-- Header -->
    <template #header>
      <div class="dialog-header">
        <el-icon><Coin /></el-icon>
        <span>Edit Transaction</span>
      </div>
    </template>

    <!-- Form -->
    <el-form
      ref="formRef"
      :model="editedTransaction"
      :rules="rules"
      label-width="120px"
      class="styled-form"
      @submit.prevent
    >
      <!-- Transaction Type -->
      <el-form-item label="Type" prop="type">
        <el-radio-group v-model="editedTransaction.type" class="styled-radio-group">
          <el-radio value="income">Income</el-radio>
          <el-radio value="expense">Expense</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- Amount -->
      <el-form-item label="Amount (R$)" prop="amount">
        <el-input
          v-model.number="editedTransaction.amount"
          type="number"
          placeholder="Enter amount"
          class="styled-input"
        />
      </el-form-item>

      <!-- Description -->
      <el-form-item label="Description" prop="description">
        <el-input
          v-model="editedTransaction.description"
          placeholder="Enter description"
          class="styled-input"
        />
      </el-form-item>

      <!-- Date -->
      <el-form-item label="Date" prop="date">
        <el-date-picker
          v-model="editedTransaction.date"
          type="date"
          placeholder="Select date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          class="styled-date-picker"
        />
      </el-form-item>
    </el-form>

    <!-- Footer Actions -->
    <template #footer>
      <div class="form-actions">
        <el-button @click="cancelChanges" class="styled-button secondary">Cancel</el-button>
        <el-button type="primary" @click="submitForm" class="styled-button">Save</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { ElForm, ElMessage } from 'element-plus';
import { Coin } from '@element-plus/icons-vue';
import { Transaction } from '@/types/Transaction';

const props = defineProps<{
  modelValue: boolean;
  transaction: Transaction;
}>();
const emit = defineEmits(['update:modelValue', 'save']);

// Reactive state
const visible = ref(props.modelValue);
const editedTransaction = ref({ ...props.transaction });
const formRef = ref<InstanceType<typeof ElForm> | null>(null);

// Validation rules
const rules = {
  type: [{ required: true, message: 'Transaction type is required', trigger: 'change' }],
  amount: [
    { required: true, message: 'Amount is required', trigger: 'blur' },
    { type: 'number', min: 0.0000001, message: 'Amount must be greater than 0', trigger: 'blur' }
  ],
  description: [
    { required: true, message: 'Description is required', trigger: 'blur' },
    { min: 3, message: 'Description must be at least 3 characters', trigger: 'blur' }
  ],
  date: [{ required: true, message: 'Date is required', trigger: 'change' }]
};

// Keep the dialog visibility in sync with parent prop
watch(
  () => props.modelValue,
  (newVal) => {
    visible.value = newVal;
    if (newVal) {
      editedTransaction.value = { ...props.transaction }; // Reset the form when opening
    }
  }
);

// Emit updates to parent
watch(visible, (newVal) => {
  emit('update:modelValue', newVal);
});

// Methods
function submitForm() {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      emit('save', editedTransaction.value);
      visible.value = false;
    } else {
      ElMessage.error('Please correct the errors before submitting');
    }
  });
}

function cancelChanges() {
  visible.value = false;
}
</script>

<style scoped>
/* Dialog Container: Now more compact */
.transaction-dialog {
  max-width: 500px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
}

/* Header with Bottom Border */
.dialog-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  padding: 16px 20px;
  border-bottom: 1px solid #ebeef5;
}

/* Form Styling */
.styled-form {
  width: 100%;
  padding: 10px 20px;
}

/* Radio Button Group */
.styled-radio-group {
  display: flex;
  gap: 15px;
}

/* Inputs & Date Picker */
.styled-input,
.styled-date-picker {
  width: 100%;
  max-width: 350px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

/* Deep selectors for Element Plus internals */
.styled-input :deep(.el-input__wrapper),
.styled-date-picker :deep(.el-input__wrapper) {
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
}

.styled-input:deep(.el-input__wrapper):hover,
.styled-date-picker:deep(.el-input__wrapper):hover {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

/* Footer Buttons */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 20px;
}

.styled-button {
  border-radius: 8px;
  padding: 10px 15px;
  transition: background 0.3s ease, transform 0.2s ease-in-out;
}

.styled-button:hover {
  transform: scale(1.05);
}

/* Secondary Button Style */
.secondary {
  background: #f4f4f5;
  color: #606266;
}

.secondary:hover {
  background: #e4e7ed;
}
</style>
