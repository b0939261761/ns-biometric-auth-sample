<template>
  <Page>
    <ActionBar title="nativescript biometric auth sample"/>
    <StackLayout orientation="vertical">
      <Button @tap = 'onClick' text = 'open' />
      <Label class="message" :text="status"/>
    </StackLayout>
  </Page>
</template>

<script>
import { checkFingerprint, openFingerprint } from '@/fingerprint';

export default {
  data: () => ({
    status: ''
  }),
  mounted() {
    this.status = checkFingerprint();
  },
  methods: {
    onClick() {
      openFingerprint();
    }
  }
}
</script>

