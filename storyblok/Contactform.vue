<template>
  <section>
    <FormKit type="form" @submit="sendMail" incomplete-message="Bitte vervollständigen Sie das Formular um fortzufahren.">
      <div>
        <FormKit type="text" outer-class="half" name="name" id="name" label="Vorname" placeholder="Jon"
          validation="required" :validation-messages="{
            required: 'Dieses Feld ist Pflicht.'
          }" v-model="vorname" />
        <FormKit type="text" class="half" name="name" id="name" label="Nachname" placeholder="Doe" validation="required"
          v-model="nachname" />
      </div>
      <div>
        <FormKit type="email" class="half" label="Email" validation="required|email" :validation-messages="{
          email: 'Bitte geben Sie eine gültige Adresse an.'
        }" placeholder="jon.doe@mail.com" v-model="mail" />
      </div>
      <div>
        <FormKit type="text" name="name" id="name" label="Straße und Hausnummer" placeholder="Musterstraße 1a"
          v-model="anschrift" />
        <FormKit type="text" name="name" id="name" label="Postleitzahl" placeholder="0815" v-model="plz" />
        <FormKit type="text" name="name" id="name" label="Ort" placeholder="Musterstadt" v-model="ort" />
      </div>
      <div>
        <FormKit type="file" label="Antrag" accept=".pdf" help="Unterschriebener Antrag hochladen." multiple="false"
          aria-placeholder="Keine Datei ausgewählt." />
      </div>
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
    flex-wrap: wrap;
    width: min(50%, 800px);
    margin: 0 auto;
    gap: 10px;

    >div {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      flex: 0 0 100%;
      gap: 10px;

      >div {
        flex: 0 0 45%;
      }
    }
  }
}
</style>

