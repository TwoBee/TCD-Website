<template>
    <section>
        <form @submit.prevent="submit" @reset="onReset" method="POST">
            <div class="contactform">
                <div class="cell half-width">
                    <label for="fname">Vorname</label>
                    <input type="text" id="fname" name="firstname" placeholder="Vorname">
                </div>
                <div class="cell half-width">
                    <label for="lname">Nachname</label>
                    <input type="text" id="lname" name="lastname" placeholder="Nachname">
                </div>
                <div class="cell full-width">
                    <label for="email">Email</label>
                    <input type="email" placeholder="Email-Adresse">
                </div>
            </div>
        </form>
    </section>
</template>
<script setup>

</script>
<style scoped lang="scss">
form {
    .contactform {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin: 0 auto;
        background-color: #1a4e38;
        color: #d6dbd4;
        width: 50%;

        .cell {
            display: flex;
            flex-direction: column;
            padding: 1rem;

            label {
                @include font-body-sans-r;
                font-weight: lighter;
            }

            input {
                height: 2.2rem;
                font-size: 1.5rem;

                &::placeholder{
                    color: transparent;
                }
            }

            &.half-width {
                grid-column: span 1;
            }

            &.full-width {
                grid-column: span 2;
                width: 50%;
            }
        }


    }
}
</style>