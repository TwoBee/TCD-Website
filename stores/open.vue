<script>
 import { defineStore } from 'pinia'

    const useToggleOpen = defineStore('open', {
        state: () => {
            return { open: false }
        },
        actions: {
            toggle() {
            this.open = !this.open
            },
        },
        })
</script>