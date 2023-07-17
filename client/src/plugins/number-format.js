import numeral from 'numeral';
import numFormat from 'vue-filter-number-format';
import Vue from 'vue'

Vue.filter('numFormat', numFormat(numeral));