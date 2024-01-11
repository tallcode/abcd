<script setup lang="ts">
import { ref,computed } from 'vue'
const lipidField = ref<LipidText>({})
const constituentField = ref<{
    a: ConstituentText;
    b: ConstituentText;
    c: ConstituentText;
    d: ConstituentText;
}>({
  a: {},
  b: {},
  c: {},
  d: {},
})

const lipid = computed(() => {
  const { concentration, volume } = lipidField.value
  return {
    concentration: parseFloat(concentration||''),
    volume: parseFloat(volume||''),
  } as Lipid
})

const calc = (constituent:ConstituentText, lipid: Lipid)=>{
  const { molecularWeight, concentration, proportion } = constituent
  let _molecularWeight = parseFloat(molecularWeight||'')
  let _concentration = parseFloat(concentration||'')
  let _proportion = parseFloat(proportion||'')

  _molecularWeight =  _molecularWeight>=0?_molecularWeight:NaN
  _concentration =  _concentration>=0?_concentration:NaN
  _proportion =  (_proportion>=0 && _proportion<=100)?_proportion:NaN

  const invalid = isNaN(_molecularWeight) || isNaN(_concentration) || isNaN(_proportion) || isNaN(lipid.volume) || isNaN(lipid.concentration)

  return {
    molecularWeight: _molecularWeight,
    concentration: _concentration,
    proportion: _proportion,
    volume: invalid ? NaN : parseFloat(((_proportion*lipid.concentration*lipid.volume)/(_concentration/_molecularWeight)).toFixed(5)),
  } as Constituent
}

const constituent = computed(() => {
  const { a, b, c, d } = constituentField.value
  return {
    a: calc(a, lipid.value),
    b: calc(b, lipid.value),
    c: calc(c, lipid.value),
    d: calc(d, lipid.value),
  } 
})

const numberRules = (value: string) => {
  if (value && /^-?\d+(\.\d+)?$/.test(value)) return true
  return 'must enter a number.'
}

const maxRules = (value: string) => {
  if (value && parseFloat(value) <= 100) return true
  return 'must less than 100.'
}

const minRules = (value: string) => {
  if (value && parseFloat(value) >= 0) return true
  return 'must greater than 0.'
}

const result = computed(() => {
  if(isNaN(lipid.value.volume)) {
    return NaN
  }
  const list = [
    isNaN(constituent.value.a.volume) ? 0 : constituent.value.a.volume,
    isNaN(constituent.value.b.volume) ? 0 : constituent.value.b.volume,
    isNaN(constituent.value.c.volume) ? 0 : constituent.value.c.volume,
    isNaN(constituent.value.d.volume) ? 0 : constituent.value.d.volume,
  ]
  return parseFloat((lipid.value.volume-list[0]-list[1]-list[2]-list[3]).toFixed(5))
})

</script>

<template>
    <v-form @submit.prevent>
        <v-container>
          <v-row class="pt-4">
            <v-col cols="3">
              <v-text-field
                v-model="lipidField.concentration"
                label="脂相浓度"
                :rules="[numberRules, minRules]"
                required
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="lipidField.volume"
                label="脂相体积"
                suffix="mL"
                :rules="[numberRules, minRules]"
                required
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3" class="d-flex flex-column ga-3">
              <div class="px-1">组分A</div>
              <v-text-field
                v-model="constituentField.a.molecularWeight"
                label="分子量"
                :rules="[numberRules, minRules]"
                required
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="constituentField.a.concentration"
                label="质量浓度"
                suffix="mg/mL"
                :rules="[numberRules, minRules]"
                required
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="constituentField.a.proportion"
                label="组分比例"
                suffix="%"
                :rules="[numberRules, minRules, maxRules]"
                required
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="constituent.a.volume"
                label="体积"
                suffix="mL"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="3" class="d-flex flex-column ga-3">
              <div class="px-1">组分B</div>
              <v-text-field
                v-model="constituentField.b.molecularWeight"
                label="分子量"
                :rules="[numberRules, minRules]"
                required
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="constituentField.b.concentration"
                label="质量浓度"
                suffix="mg/mL"
                :rules="[numberRules, minRules]"
                required
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="constituentField.b.proportion"
                label="组分比例"
                suffix="%"
                :rules="[numberRules, minRules, maxRules]"
                required
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="constituent.b.volume"
                label="体积"
                suffix="mL"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="3" class="d-flex flex-column ga-3">
              <div class="px-1">组分C</div>
              <v-text-field
                v-model="constituentField.c.molecularWeight"
                label="分子量"
                :rules="[numberRules, minRules]"
                required
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="constituentField.c.concentration"
                label="质量浓度"
                suffix="mg/mL"
                :rules="[numberRules, minRules]"
                required
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="constituentField.c.proportion"
                label="组分比例"
                suffix="%"
                :rules="[numberRules, minRules, maxRules]"
                required
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="constituent.c.volume"
                label="体积"
                suffix="mL"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="3" class="d-flex flex-column ga-3">
              <div class="px-1">组分D</div>
              <v-text-field
                v-model="constituentField.d.molecularWeight"
                label="分子量"
                :rules="[numberRules, minRules]"
                required
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="constituentField.d.concentration"
                label="质量浓度"
                suffix="mg/mL"
                :rules="[numberRules, minRules]"
                required
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="constituentField.d.proportion"
                label="组分比例"
                suffix="%"
                :rules="[numberRules, minRules, maxRules]"
                required
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="constituent.d.volume"
                label="体积"
                suffix="mL"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3" class="d-flex flex-column ga-3">
              <div class="px-1">输出</div>
              <v-text-field
                v-model="result"
                label="补液体积"
                suffix="mL"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
    </v-form>
</template>