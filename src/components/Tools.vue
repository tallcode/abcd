<script setup lang="ts">
import { ref,computed } from 'vue'
const a = ref('')
const b = ref('')
const c = ref('')
const d = ref('')

const rules = [
    (value: string) => {
      if (value && /^\d+(\.\d+)?$/.test(value)) return true
      return 'must enter a number.'
    },
  ]

const message = ref('')
const snackbar = computed({
  get: () => !!message.value,
  set: (value:boolean) => {
    if(!value) {
      message.value = ''
    }
  }
})

const result = computed(() => {
  const data = [
    Number.parseFloat(a.value),
    Number.parseFloat(b.value),
    Number.parseFloat(c.value),
    Number.parseFloat(d.value),
  ]
  if(data.some(isNaN)) {
    return 'Invalid input'
  }
  return 125-data[0]-data[1]-data[2]-data[3]
})

</script>

<template>
    <v-form @submit.prevent>
        <v-container>
            <v-row>
            <v-col cols="3">
                <v-text-field
                v-model="a"
                label="A"
                :rules="rules"
                required
                ></v-text-field>
            </v-col>
            <v-col cols="3">
                <v-text-field
                v-model="b"
                label="B"
                :rules="rules"
                required
                ></v-text-field>
            </v-col>
            <v-col cols="3">
                <v-text-field
                v-model="c"
                label="C"
                :rules="rules"
                required
                ></v-text-field>
            </v-col>
            <v-col cols="3">
                <v-text-field
                v-model="d"
                label="D"
                :rules="rules"
                required
                ></v-text-field>
            </v-col>
            </v-row>
            <v-row>
            <v-col cols="12">
                <v-card>
                <v-card-title>
                    <span class="headline">Result</span>
                </v-card-title>
                <v-card-text>
                    <span class="headline">{{ result }}</span>
                </v-card-text>
                </v-card>
            </v-col>
            </v-row>
        </v-container>
    </v-form>
    <v-snackbar v-model="snackbar">
        {{ message }}
        <template v-slot:actions>
        <v-btn
            color="pink"
            variant="text"
            @click="snackbar = false"
        >
            Close
        </v-btn>
        </template>
    </v-snackbar>
</template>