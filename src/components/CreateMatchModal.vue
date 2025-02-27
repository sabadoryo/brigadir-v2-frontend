<script setup lang="ts">
import { Form, type SubmissionHandler } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import * as yup from 'yup'
import FormGroup from './FormGroup.vue'
import { matchService, type CreateMatchDto } from '@/api/services/matchService'
import { useAuth } from '@/stores/authStore'
import { getDistributionTypeOptions, getGameOptions } from '@/constants/selectOptions/selectOptions'
import { i18n } from '@/locales'

const emit = defineEmits(['close', 'save'])
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
})

const { t } = i18n.global
const authStore = useAuth()
const isOpen = ref(false)
const loading = ref(false)

const gameOptions = computed(() => getGameOptions())
const distributionTypeOptions = computed(() => getDistributionTypeOptions())

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
  name: yup.string().required().label(t('placeholders.name')),
  playerAmount: yup.number().required().label(t('placeholders.playerAmount')),
  game: yup.string().required().label(t('placeholders.game')),
  distributionType: yup.string().required().label(t('placeholders.distributionType')),
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
          <FormGroup
            name="name"
            :disabled="loading"
            :label="$t('placeholders.name')"
            :placeholder="$t('placeholders.name')"
          />
        </div>
        <div class="field col-12 md:col-6">
          <FormGroup
            name="playerAmount"
            :disabled="loading"
            value="10"
            :label="$t('placeholders.playerAmount')"
            :placeholder="$t('placeholders.playerAmount')"
            type="number"
          />
        </div>
        <div class="field col-12 md:col-6">
          <FormGroup
            name="game"
            :disabled="loading"
            :label="$t('placeholders.game')"
            :placeholder="$t('placeholders.game')"
            :list="gameOptions"
            type="select"
          />
        </div>
        <div class="field col-12 md:col-6">
          <FormGroup
            name="distributionType"
            :disabled="loading"
            :label="$t('placeholders.distributionType')"
            :placeholder="$t('placeholders.distributionType')"
            :list="distributionTypeOptions"
            type="select"
          />
        </div>

        <div class="col-12 mt-2 flex justify-content-between align-items-center mt-4">
          <PrimeButton
            severity="secondary"
            outlined
            :label="$t('buttons.cancel')"
            @click="$emit('close')"
            :disabled="loading"
          />
          <PrimeButton severity="primary" :label="$t('buttons.create')" :disabled="loading" type="submit" />
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
