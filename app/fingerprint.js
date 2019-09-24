import * as utils from "tns-core-modules/utils/utils";
import { android as appAndroid } from 'tns-core-modules/application';

// -------------------

export const checkFingerprint = () => {
  const context = utils.ad.getApplicationContext();
  const { BiometricManager } = com.biometric.auth;

  // com.biometric.auth.BiometricManager.READY = 0; // отпечатки работают
  // com.biometric.auth.BiometricManager.NOT_SUPPORTED = 1; // нет поддержки, Андроид ниже 6 версии
  // com.biometric.auth.BiometricManager.NO_FINGERPRINTS = 2; // если на устройстве нет отпечатков
  // com.biometric.auth.BiometricManager.NOT_REGISTER = 3; // если устройство не защищено пином, рисунком или паролем
  // com.biometric.auth.BiometricManager.NO_PERMISSION = 4; // нет разрешенного доступа к отпечаткам
    
   return BiometricManager.READY === BiometricManager.checkFingerprint(context);
}

// -------------------

export const openFingerprint = () => {
  const biometricManager = new com.biometric.auth.BiometricManager(appAndroid.foregroundActivity)
    .setTitle('FingerPrint to "Open"')
    .setDescription('Use your fingerprint to open')
    .setNegativeButtonText('Use code');

  const BiometricCallback = java.lang.Object.extend({
    interfaces: [com.biometric.auth.BiometricCallback],

    //все прошло успешно
    onAuthenticationSuccessful() { console.log('onAuthenticationSuccessful') },

    //несколько неудачных попыток считывания (5)
    //после этого сенсор станет недоступным на некоторое время (30 сек)
    onAuthenticationError(errorCode, errString) { 
      console.log('onAuthenticationError', errorCode, errString) 
    },
    
    //отпечаток считался, но не распознался
    onAuthenticationFailed() { 
      console.log('onAuthenticationFailed')
    },
    
    //грязные пальчики, недостаточно сильный зажим
    onAuthenticationHelp(helpCode, helpString) { 
      console.log('onAuthenticationHelp', helpCode, helpString) 
    }
  });

  biometricManager.authenticate(new BiometricCallback());
}

export default {
  checkFingerprint,
  openFingerprint
}