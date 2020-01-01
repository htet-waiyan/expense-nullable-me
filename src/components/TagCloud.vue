<template>
    <div class="columns">
      <div class="column">
        <span class="tag"
          :class="{'selected': tagSelected(tag) }"
          @click="toggleTag(tag)"
          v-for="(tag, index) in tags" :key="index">{{ tag }}</span>
        <button class="button is-white is-small">
            <span class="icon is-small">
                <v-icon name="plus"/>
            </span>
        </button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'TagCloud',
  props: {
    value: {
      type: Array,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tags: ['Dinner', 'Lunch', 'Starbucks', 'Lazada', 'TGIF', 'Pasta', 'CoffeeBean', 'Inle', 'Breakfast', 'Brunch', 'Supper',
        'Cake'],
      selectedTags: this.value || [],
    };
  },
  methods: {
    toggleTag(label) {
      const indexOf = this.selectedTags.indexOf(label);
      if (indexOf >= 0) {
        this.selectedTags.splice(indexOf, 1);
      } else if (this.multiple) {
        this.selectedTags.push(label);
      } else {
        this.selectedTags.splice(indexOf, 1, label);
      }
      this.$emit('input', this.selectedTags);
    },
    tagSelected(label) {
      return this.selectedTags.indexOf(label) >= 0;
    },
  },
};
</script>

<style scoped>
  .tag{
    padding: 5px;
    border-radius: 5px;
    background-color: #6666;
    color: #fff;
    margin-right: 5px;
    margin-bottom: 3px;
    cursor: pointer;
    font-size: 13px;
  }
  .tag.selected {
    background-color: rgb(37, 37, 37);
  }

</style>
