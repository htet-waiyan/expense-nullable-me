<template>
  <div class="container is-fluid">
      <profile-setting />
  </div>
</template>

<script>
import ProfileSetting from '../../components/Profile/Setting.vue';

export default {
  name: 'ProfileSettingIndex',
  components: {
    ProfileSetting,
  },
};
</script>
