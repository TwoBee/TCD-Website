<template>
  <section>
    <FormKit type="form" @submit="sendMail" incomplete-message="Bitte vervollständigen Sie das Formular um fortzufahren.">
      <FormKit type="text" outer-class="half" name="name" id="name" label="Vorname" placeholder="Jon"
        validation="required" :validation-messages="{
          required: 'Dieses Feld ist Pflicht.'
        }" v-model="mailProps.vorname" />
      <FormKit type="text" class="half" name="name" id="name" label="Nachname" placeholder="Doe" validation="required"
        v-model="mailProps.nachname" />
      <FormKit type="email" class="half" label="Email" validation="required|email" :validation-messages="{
        email: 'Bitte geben Sie eine gültige Adresse an.'
      }" placeholder="jon.doe@mail.com" v-model="mailProps.mail" />
      <FormKit type="text" name="name" id="name" label="Straße und Hausnummer" placeholder="Musterstraße 1a"
        v-model="mailProps.anschrift" />
      <FormKit type="text" name="name" id="name" label="Postleitzahl" placeholder="0815" v-model="mailProps.plz" />
      <FormKit type="text" name="name" id="name" label="Ort" placeholder="Musterstadt" v-model="mailProps.ort" />
      <FormKit type="file" label="Antrag" accept=".pdf" help="Unterschriebener Antrag hochladen." multiple="false"
        aria-placeholder="Keine Datei ausgewählt." />
    </FormKit>
  </section>
</template>
<script setup>
const props = defineProps({ blok: Object });
const { $mail } = useNuxtApp()

const mailProps = ref({
  vorname: '',
  nachname: '',
  mail:'',
  anschrift:'',
  plz:'',
  ort:''
})



const sendMail = () => {
  $mail.send({
    config: 'contact',
    from: `"${vorname.value} ${nachname.value}"<${mail.value}>`,
    subject: 'Kontaktformular',
    text: `${ort.value}`,
  })
};
</script>
<style scoped lang="scss">
section {
  width: 100%;
  display: flex;
  justify-content: center;

  :deep(form) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-width: 50%;
  }
}
</style>

