import { ref, onUnmounted, unref, getCurrentInstance, watch, nextTick } from 'vue'
import { isProdMode } from '@/utils/env'
import { ModalMethods, UseModalReturnType } from '../type'
import { getDynamicProps } from '@/utils'
import { tryOnUnmounted } from '@vueuse/core'
import type { DialogOptions } from 'naive-ui/lib/dialog'

export function useModal(props: DialogOptions): UseModalReturnType {
  const modalRef = ref<Nullable<ModalMethods>>(null)
  // const currentInstance = getCurrentInstance()

  const getInstance = () => {
    const instance = unref(modalRef.value)
    if (!instance) {
      console.error('useModal instance is undefined!')
    }
    return instance
  }

  const register = (modalInstance: ModalMethods) => {
    isProdMode() &&
      tryOnUnmounted(() => {
        modalRef.value = null
      })
    modalRef.value = modalInstance
    // 请自己自行在封装的组件中实现emit 'register' 事件
    // currentInstance?.emit('register', modalInstance)

    watch(
      () => props,
      () => {
        props && modalInstance.setProps(getDynamicProps(props))
      },
      {
        immediate: true,
        deep: true
      }
    )
  }

  const methods: ModalMethods = {
    setProps: (props): void => {
      getInstance()?.setProps(props)
    },
    openModal: () => {
      getInstance()?.openModal()
    },
    closeModal: () => {
      getInstance()?.closeModal()
    },
    setSubLoading: (status) => {
      getInstance()?.setSubLoading(status)
    }
  }

  return [register, methods]
}
