import Vue from 'vue'
import VueGoodTablePlugin from 'vue-good-table'
import Datepicker from 'vuejs-datepicker'
import VueMoment from 'vue-moment'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import VueSignaturePad from 'vue-signature-pad'
import vSelect from 'vue-select'
// import CKEditor from '@ckeditor/ckeditor5-vue'

// import Vueditor from 'vueditor'

// config
// const config = {
//   toolbar: [
//     'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider',
//     'bold', 'italic', 'underline', 'strikeThrough', 'links', 'divider', 'subscript', 'superscript',
//     'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent',
//     'insertOrderedList', 'insertUnorderedList', '|', 'picture', 'tables', '|', 'switchView'
//   ],
//   fontName: [
//     { val: 'arial black' },
//     { val: 'times new roman' },
//     { val: 'Courier New' }
//   ],
//   fontSize: ['12px', '14px', '16px', '18px', '0.8rem', '1.0rem', '1.2rem', '1.5rem', '2.0rem'],
//   uploadUrl: ''
// }

// use
Vue.use(VueGoodTablePlugin)
Vue.use(VueMoment)
Vue.component('date-picker', Datepicker)
Vue.use(VueLodash, { lodash })
Vue.use(VueSignaturePad)
Vue.component('v-select', vSelect)
// Vue.use(Vueditor, config)
// Vue.use(CKEditor)
