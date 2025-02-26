<script setup lang="ts">
import { Form, type SubmissionHandler } from 'vee-validate'
import { ref, watch } from 'vue'
import * as yup from 'yup'
import FormGroup from './FormGroup.vue'
import { matchService, type CreateMatchDto } from '@/api/services/matchService'
import { useAuth } from '@/stores/authStore'
import { distributionTypeOptions, gameOptions } from '@/constants/selectOptions/selectOptions'

const emit = defineEmits(['close', 'save'])
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
})

const authStore = useAuth()
const isOpen = ref(false)
const loading = ref(false)

async function opened() {
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}

const updateVisible = (val: boolean) => {
  if (!val) {
    emit('close')
  }
}

const schema = yup.object({
  name: yup.string().required().label('Название'),
  playerAmount: yup.number().required().label('Количество игроков'),
  game: yup.string().required().label('Игра'),
  distributionType: yup.string().required().label('Тип распределения игроков'),
})

async function onSubmit(values: CreateMatchDto) {
  try {
    loading.value = true
    const body: CreateMatchDto = Object.assign({}, values)
    console.log(body)
    body.hostId = authStore.user._id
    console.log(authStore.user)
    console.log(body)
    await matchService.createMatch(body)

    emit('close')
    emit('save')
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

watch(
  () => props.open,
  (val) => {
    if (!val) {
      return close()
    }
    return opened()
  },
)
</script>

<template>
  <PrimeDialog
    :header="'Создание матча'"
    :draggable="false"
    modal
    class="create-match-modal"
    v-model:visible="isOpen"
    @update:visible="updateVisible"
  >
    <Form :validation-schema="schema" @submit="onSubmit as SubmissionHandler<CreateMatchDto>">
      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <FormGroup name="name" :disabled="loading" label="Название" placeholder="Название" />
        </div>
        <div class="field col-12 md:col-6">
          <FormGroup
            name="playerAmount"
            :disabled="loading"
            value="10"
            label="Количество игроков"
            placeholder="Количество игроков"
            type="number"
          />
        </div>
        <div class="field col-12 md:col-6">
          <FormGroup
            name="game"
            :disabled="loading"
            label="Игра"
            placeholder="Игра"
            :list="gameOptions"
            type="select"
          />
        </div>
        <div class="field col-12 md:col-6">
          <FormGroup
            name="distributionType"
            :disabled="loading"
            label="Тип распределения игроков"
            placeholder="Тип распределения игроков"
            :list="distributionTypeOptions"
            type="select"
          />
        </div>

        <div class="col-12 mt-2 flex justify-content-between align-items-center mt-4">
          <PrimeButton
            severity="secondary"
            outlined
            :label="'Отмена'"
            @click="$emit('close')"
            :disabled="loading"
          />
          <PrimeButton severity="primary" :label="'Создать'" :disabled="loading" type="submit" />
        </div>
      </div>
    </Form>
  </PrimeDialog>
</template>

<style>
.create-match-modal {
  width: 30rem;
}
</style>
