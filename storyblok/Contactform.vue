<template>
  <section>
    <FormKit type="form" @submit="sendMail" incomplete-message="Bitte vervollständigen Sie das Formular um fortzufahren.">
      <FormKit type="text" name="name" id="name" label="Vorname" placeholder="Jon" validation="required"
        :validation-messages="{
          required: 'Dieses Feld ist pflicht.'
        }" v-model="vorname" />
      <FormKit type="text" name="name" id="name" label="Nachname" placeholder="Doe" validation="required"
        v-model="nachname" />
      <FormKit type="email" label="Email" validation="required|email"  :validation-messages="{
        email: 'Bitte geben Sie eine gültige Adresse an.'
      }" placeholder="jon.doe@mail.com" v-model="mail" />
      <FormKit type="text" name="name" id="name" label="Straße und Hausnummer" placeholder="Musterstraße 1a"
        v-model="anschrift" />
      <FormKit type="text" name="name" id="name" label="Postleitzahl" placeholder="0815" v-model="plz" />
      <FormKit type="text" name="name" id="name" label="Ort" placeholder="Musterstadt" v-model="ort" />
    </FormKit>
  </section>
</template>
<script setup>
const props = defineProps({ blok: Object });
const { $mail } = useNuxtApp()
const vorname = ref('')
const nachname = ref('')
const mail = ref('')
const anschrift = ref('')
const plz = ref('')
const ort = ref('')



const sendMail = () => {
  $mail.send({
    config: 'contact',
    from: `"${vorname.value} ${nachname.value}"<${mail.value}>`, //Alex Absender <alex@example.net>
    subject: 'Kontaktformular',
    text: `${ort.value}`,
  })
}
</script>
<style scoped lang="scss">
section {
  width: 100vw;

  :deep(form) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    width: 50%;
    margin: 0 auto;

    >div {
      width: 50%;
      margin: 0 auto;
    }
  }
}
</style>