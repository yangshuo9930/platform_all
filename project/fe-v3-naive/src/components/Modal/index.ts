// export { default as BasicModal } from './src/basicModal.vue'
import BasicModal from './src/basicModal.vue'
export { useModal } from './src/hooks/useModal'
export * from './src/type'

export default BasicModal

export type TypeBasicModal = InstanceType<typeof BasicModal>
