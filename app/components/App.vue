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
import { FingerprintAuth } from '@/androidBiometricAuth';
const finger = new FingerprintAuth();

export default {
  data: () => ({
    status: ''
  }),
  mounted() {
    this.status = finger.available();
  },
  methods: {
    async onClick() {
      try {
        await finger.verifyFingerprint({
          title: 'FingerPrint to "Open"',
          description: 'Use your fingerprint to open',
          buttonCancel: 'Use code',
        });
        console.log('Success');
      } catch (err) {
        console.log(err)
      }
    },
    // async onClick() {
    //   try {
        
    //     debugger;
    //     const promise = finger.verifyFingerprint({
    //         title: 'FingerPrint to "Open"',
    //         description: 'Use your fingerprint to open',
    //         buttonCancel: 'Use code',
    //       });

    //     await promise;
    //     console.log('Success');
    //   } catch (err) {
    //     console.log('Error')
    //   }
    // }
  }
}
</script>

