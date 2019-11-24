<template>
  <div class="category-container">
      <div class="field">
          <label for="name" class="label">Category Name</label>
          <div class="control"
            :class="{'has-icons-right': !title}">
              <input type="text" class="input"
                :class="{'is-danger': !title}"
                v-model="title">
              <span v-if="!title" :class="{'icon is-small is-right': !title}">
                <v-icon name="exclamation-triangle"/>
              </span>
              <p v-if="!title" :class="{'help is-danger': !title}">Name is required</p>
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
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('transaction');

export default {
  name: 'CategoryForm',
  components: {
    Compact,
  },
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
      },
      title: '',
      colorLabel: '',
      icon: '',
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    isFormValid() {
      return !!this.title;
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
      const payload = {
        title: this.title,
        description: '',
        colorLabel: this.colors.hex,
        icon: this.icon,
      };
      this.createNewCategory(payload)
        .then((data) => {
          this.$emit('created', data);
        });
    },
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
</style>
