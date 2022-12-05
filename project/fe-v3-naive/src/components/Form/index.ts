// export { default as BasicForm } from './src/BasicForm.vue'
import BasicForm from './src/BasicForm.vue'

export { useForm } from './src/hooks/useForm'
export * from './src/types/form'
export * from './src/types/index'

export default BasicForm

export type TypeBasicForm = InstanceType<typeof BasicForm>
