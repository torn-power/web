import { createI18n } from 'vue-i18n'

const messages = {
    En: {
        message: {
            hello: 'hello world'
        }
    },
    Zh: {
        message: {
            hello: '你好世界'
        }
    }
}
const i18n = createI18n({
    locale: 'Zh',
    messages
})

export default i18n