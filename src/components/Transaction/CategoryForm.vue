<template>
  <div class="category-container">
      <div class="field">
          <label for="name" class="label">Category Name</label>
          <div class="control has-icons-right">
              <input type="text" class="input"
                :class="{'is-danger': !title || isNameTaken}"
                @input="getNameCount"
                v-model="title">
              <span v-if="nameValidating"
                class="icon is-small is-right">
                <v-icon name="spinner"/>
              </span>
              <span v-if="!title || isNameTaken"
                class="icon is-small is-right">
                <v-icon name="exclamation-triangle"/>
              </span>
              <span v-if="title && !isNameTaken && !nameValidating"
                style="color: green"
                class="icon is-small is-right">
                <v-icon name="check"/>
              </span>
              <p v-if="!title" :class="{'help is-danger': !title}">Name is required</p>
              <p v-if="isNameTaken"
                :class="{'help is-danger': isNameTaken}">Name is not available</p>
          </div>
      </div>
      <div class="field">
          <div class="control">
            <compact v-model="colors"/>
          </div>
      </div>
      <div class="field icon-container">
        <div class="columns is-mobile is-vcentered"
          v-for="(row, key) in iconPacks"
          :key="key">
            <div class="column has-text-centered"
              v-for="icon in row"
              :key="icon.name">
              <a href="javascript:;" class="category-icon"
                :class="{'selected': iconSelected(icon.name)}"
                @click="selectIcon(icon.name)">
                <v-icon :name="icon.name" :scale="icon.scale"/>
              </a>
            </div>
        </div>
      </div>
        <div class="field is-grouped">
            <div class="control">
              <button class="button is-dark"
                :disabled="!isFormValid"
                :class="{'is-loading': this.loading}"
                @click="createCategory">Submit</button>
            </div>
            <div class="control">
              <button class="button"
                @click="$emit('cancel')">Cancel</button>
            </div>
        </div>
  </div>
</template>

<script>
import { Compact } from 'vue-color';
import 'vue-awesome/icons/suitcase-rolling';
import 'vue-awesome/icons/laptop';
import 'vue-awesome/icons/gas-pump';
import 'vue-awesome/icons/clinic-medical';
import 'vue-awesome/icons/beer';
import 'vue-awesome/icons/dog';
import 'vue-awesome/icons/coffee';
import 'vue-awesome/icons/box-open';
import 'vue-awesome/icons/film';
import 'vue-awesome/icons/leaf';
import 'vue-awesome/icons/graduation-cap';
import 'vue-awesome/icons/tshirt';
import 'vue-awesome/icons/university';
import 'vue-awesome/icons/running';
import 'vue-awesome/icons/futbol';
import 'vue-awesome/icons/ambulance';
import 'vue-awesome/icons/bicycle';
import 'vue-awesome/icons/sun';
import 'vue-awesome/icons/glass-cheers';
import 'vue-awesome/icons/heart';
import 'vue-awesome/icons/gift';
import 'vue-awesome/icons/dumbbell';
import 'vue-awesome/icons/baby';
import 'vue-awesome/icons/tv';
import 'vue-awesome/icons/exclamation-triangle';
import 'vue-awesome/icons/spinner';
import 'vue-awesome/icons/check';
import 'vue-awesome/icons/hamburger';
import 'vue-awesome/icons/plug';
import 'vue-awesome/icons/shopping-cart';
import 'vue-awesome/icons/taxi';
import 'vue-awesome/icons/plane';
import 'vue-awesome/icons/shopping-bag';
import 'vue-awesome/icons/utensils';
import 'vue-awesome/icons/pizza-slice';
import 'vue-awesome/icons/birthday-cake';
import 'vue-awesome/icons/bacon';
import 'vue-awesome/icons/money-bill-alt';
import 'vue-awesome/icons/plane-departure';
import 'vue-awesome/icons/bed';
import { createNamespacedHelpers } from 'vuex';
import { debounce } from 'lodash';
import { http } from '../../http';
import utilMixins from '../../mixins/util';

const { mapActions } = createNamespacedHelpers('transaction');

export default {
  name: 'CategoryForm',
  components: {
    Compact,
  },
  mixins: [utilMixins],
  data() {
    return {
      colors: {},
      // TODO: initialize from backend and query from DB
      // so in the future, easily roll out new icons
      iconPacks: {
        1: [
          { name: 'suitcase-rolling', scale: 2 },
          { name: 'laptop', scale: 2 },
          { name: 'gas-pump', scale: 2 },
          { name: 'clinic-medical', scale: 2 },
        ],
        2: [
          { name: 'beer', scale: 2 },
          { name: 'dog', scale: 2 },
          { name: 'coffee', scale: 2 },
          { name: 'box-open', scale: 2 },
        ],
        3: [
          { name: 'film', scale: 2 },
          { name: 'leaf', scale: 2 },
          { name: 'graduation-cap', scale: 2 },
          { name: 'tshirt', scale: 2 },
        ],
        4: [
          { name: 'university', scale: 2 },
          { name: 'running', scale: 2 },
          { name: 'futbol', scale: 2 },
          { name: 'ambulance', scale: 2 },
        ],
        5: [
          { name: 'sun', scale: 2 },
          { name: 'bicycle', scale: 2 },
          { name: 'glass-cheers', scale: 2 },
          { name: 'heart', scale: 2 },
        ],
        6: [
          { name: 'gift', scale: 2 },
          { name: 'dumbbell', scale: 2 },
          { name: 'baby', scale: 2 },
          { name: 'tv', scale: 2 },
        ],
        7: [
          { name: 'hamburger', scale: 2 },
          { name: 'utensils', scale: 2 },
          { name: 'birthday-cake', scale: 2 },
          { name: 'pizza-slice', scale: 2 },
        ],
        8: [
          { name: 'bacon', scale: 2 },
          { name: 'money-bill-alt', scale: 2 },
          { name: 'plane-departure', scale: 2 },
          { name: 'bed', scale: 2 },
        ],
      },
      title: '',
      colorLabel: '',
      icon: '',
      isNameTaken: false,
      nameValidating: false,
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    isFormValid() {
      return !!this.title && !this.isNameTaken;
    },
  },
  methods: {
    ...mapActions(['createNewCategory']),
    selectIcon(name) {
      this.icon = name;
    },
    iconSelected(name) {
      return this.icon === name;
    },
    createCategory() {
      const user = this.getUserProfile();
      const payload = {
        title: this.title,
        description: '',
        colorLabel: this.colors.hex,
        icon: this.icon,
        user: user._id,
      };
      this.createNewCategory(payload)
        .then((data) => {
          this.$emit('created', data);
        });
    },
    getNameCount: debounce(function () {
      this.nameValidating = true;
      http.get(`/category/count?name=${this.title}`)
        .then((response) => {
          this.nameValidating = false;
          this.isNameTaken = !!response.data.count;
        })
        .catch(() => {
          this.$store.dispatch('setNetworkError', true);
          this.nameValidating = false;
        });
    }, 500),
  },
};
</script>

<style scoped>
  .vc-compact {
    width: 100% !important;
  }
  .icon-container {
    margin-top: 20px;
    margin-bottom: 30px;
    color: rgb(189, 189, 189);
  }
  .icon-container .category-icon {
    color: inherit;
  }

  .category-icon.selected {
    color:rgb(90, 90, 90);
  }
  .category-container {
    margin-bottom: 10em;
  }
</style>
