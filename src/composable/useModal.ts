import {ref, readonly} from 'vue'

const visible = ref<Boolean>(false)
export const useModal = () => {
    const show = (): boolean => visible.value = true
    const hide = (): boolean => visible.value = false

    return {
        visible: readonly(visible),
        show,
        hide,
    }
}
