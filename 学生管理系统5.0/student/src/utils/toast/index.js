import Vue from 'vue';
import toast from './index.vue';

const Toast = Vue.extend(toast);

const showToast = ({ msg, type }) => {
    const app = new Toast({
        data() {
            return {
                msg,
                type
            }
        },
        el: document.createElement('div'),
    })

    document.body.appendChild(app.$el);

    setTimeout(() => {
        app.show = false;
    }, 1500)
    setTimeout(() => {
        app.exist = false;
    }, 2500)
}

export default showToast