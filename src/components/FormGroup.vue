<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRef, watch } from 'vue'
const props = defineProps({
  id: { type: String, required: false },
  stepMinute: { type: Number, default: 5 },
  type: { type: String, default: 'text' },
  name: { type: String, required: true },
  optionLabel: { type: String, default: 'label' },
  optionValue: { type: String, default: 'value' },
  value: { default: '' },
  label: { type: String, default: '' },
  rows: { type: Number, default: 3 },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  list: { type: Array, default: null },
  search: { type: Function, default: () => {} },
  onItemSelect: { type: Function, default: () => {} },
  inputId: { type: Number, default: null },
  binary: { type: Boolean, default: false },
  display: { type: String, default: 'comma' },
  showClear: { type: Boolean, default: false },
  filter: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
})

const emit = defineEmits(['update'])

const name = toRef(props, 'name')

watch(
  () => props.value,
  (val) => {
    return (inputValue.value = val)
  },
)

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(name, undefined, { initialValue: props.value })

watch(
  () => inputValue.value,
  (val) => {
    emit('update', val)
  },
)
</script>
<template>
  <PrimeCheckbox
    v-if="type === 'checkbox'"
    :name="name"
    :placeholder="placeholder"
    :value="inputValue"
    :class="{ 'p-invalid': errorMessage }"
    :disabled="loading || disabled"
    @blur="handleBlur"
    @change="handleChange"
    :inputId="inputId"
    :binary="binary"
  />
  <div class="form-group" v-else>
    <div class="flex gap-2 align-items-center" v-if="label">
      <div class="p-text" v-if="label">
        {{ label }}
      </div>
      <slot></slot>
    </div>

    <PrimeSelect
      v-if="type === 'select'"
      :name="name"
      :placeholder="placeholder"
      v-model="inputValue"
      :class="{ 'p-invalid': errorMessage }"
      :loading="loading"
      :disabled="loading || disabled"
      @blur="handleBlur"
      :show-clear="showClear"
      :option-label="optionLabel"
      :option-value="optionValue"
      :options="list"
      :filter="filter"
    />
    <PrimeInputNumber
      v-else-if="type === 'number'"
      class="form-group__input"
      :name="name"
      :placeholder="placeholder"
      inputId="integeronly"
      v-model="inputValue"
      :class="{ 'p-invalid': errorMessage }"
      :disabled="loading || disabled"
      :loading="loading"
      @blur="handleBlur"
      @change="handleChange"
      :readonly="readonly"
    />
    <PrimeToggleSwitch
      v-else-if="type === 'switch'"
      :name="name"
      :v-model="inputValue"
      :class="{ 'p-invalid': errorMessage }"
      :disabled="loading || disabled"
      @blur="handleBlur"
      @change="handleChange"
    />
    <PrimeMultiSelect
      v-else-if="type === 'multiselect'"
      v-model="inputValue"
      class="form-group__input"
      :option-label="optionLabel"
      :option-value="optionValue"
      :name="name"
      :placeholder="placeholder"
      :loading="loading"
      :class="{ 'p-invalid': errorMessage }"
      :disabled="loading || disabled"
      @blur="handleBlur"
      :options="list"
      :display="display"
      :filter="filter"
    />
    <PrimeAutoComplete
      v-else-if="type === 'autocomplete'"
      v-model="inputValue"
      class="form-group__input"
      :option-label="optionLabel"
      :option-value="optionValue"
      :name="name"
      :placeholder="placeholder"
      :class="{ 'p-invalid': errorMessage }"
      :disabled="loading || disabled"
      @blur="handleBlur"
      :suggestions="list"
      @complete="search"
    />

    <PrimeDatePicker
      v-else-if="type === 'date'"
      v-model="inputValue"
      :name="name"
      :placeholder="placeholder"
      :type="type"
      :loading="loading"
      :class="{ 'p-invalid': errorMessage }"
      :disabled="loading || disabled"
      @blur="handleBlur"
      @change="handleChange"
      date-format="dd.mm.yy"
    />
    <PrimeDatePicker
      :id="id"
      v-else-if="type === 'time'"
      :name="name"
      :placeholder="placeholder"
      v-model="inputValue"
      :class="{ 'p-invalid': errorMessage }"
      :disabled="loading || disabled"
      @blur="handleBlur"
      @change="handleChange"
      timeOnly
      :step-minute="stepMinute"
    />
    <PrimeDatePicker
      v-else-if="type === 'datepicker'"
      :name="name"
      :placeholder="placeholder"
      v-model="inputValue"
      :class="{ 'p-invalid': errorMessage }"
      :disabled="loading || disabled"
      @blur="handleBlur"
      @change="handleChange"
      showTime
      hourFormat="24"
      :step-minute="15"
    />
    <PrimeTextarea
      v-else-if="type === 'textarea'"
      class="form-group__input"
      v-model="inputValue"
      :name="name"
      :placeholder="placeholder"
      :class="{ 'p-invalid': errorMessage }"
      :disabled="loading || disabled"
      :loading="loading"
      @blur="handleBlur"
      @change="handleChange"
      :rows="rows"
      :readonly="readonly"
    />
    <PrimeInputText
      v-else
      class="form-group__input"
      :name="name"
      :placeholder="placeholder"
      :type="type"
      v-model="inputValue"
      :class="{ 'p-invalid': errorMessage }"
      :disabled="loading || disabled"
      :loading="loading"
      @blur="handleBlur"
      @change="handleChange"
      :readonly="readonly"
    />
    <div class="p-error" v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style>
.form-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group__input,
.form-group input {
  width: 100%;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
