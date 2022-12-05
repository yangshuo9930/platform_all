<script lang="tsx">
import { defineComponent, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
// import { NEmpty } from 'naive-ui'
import { storage } from '@/utils/Storage'
import { useUserStore } from '@/store/modules/user'
import { REDIRECT_URL } from '@/store/mutation-types'

export default defineComponent({
  name: 'Redirect',
  setup() {
    const route = useRoute()

    const userStore = useUserStore()

    const token = route.query.access_token

    if (route.query && token) {
      userStore.setToken(token as string)
    }
    const redirectUrl = storage.get(REDIRECT_URL)

    onBeforeMount(() => {
      if (
        redirectUrl &&
        !redirectUrl.includes('signout-callback-oidc') &&
        !redirectUrl.includes('login')
      ) {
        window.location.href = redirectUrl
      } else {
        window.location.href = '/'
      }
    })
    return () => <div></div>
  }
})
</script>
