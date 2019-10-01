/* eslint-disable class-methods-use-this */

import * as utils from 'tns-core-modules/utils/utils';
import { android as appAndroid } from 'tns-core-modules/application';

// -------------------

export const FingerprintAuth = class {
  available() {
    const context = utils.ad.getApplicationContext();

    const { BiometricManager } = com.biometric.auth;

    // com.biometric.auth.BiometricManager.READY = 0;
    // отпечатки работают
    // com.biometric.auth.BiometricManager.NOT_SUPPORTED = 1;
    // нет поддержки, Андроид ниже 6 версии
    // com.biometric.auth.BiometricManager.NO_FINGERPRINTS = 2;
    // если на устройстве нет отпечатков
    // com.biometric.auth.BiometricManager.NOT_REGISTER = 3;
    // если устройство не защищено пином, рисунком или паролем
    // com.biometric.auth.BiometricManager.NO_PERMISSION = 4;
    // нет разрешенного доступа к отпечаткам

    return { touch: BiometricManager.READY === BiometricManager.checkFingerprint(context) };
  }

  // -------------------

  verifyFingerprint({ title, description, buttonCancel }) {
    const biometricManager = new com.biometric.auth.BiometricManager(appAndroid.foregroundActivity)
      .setTitle(title)
      .setDescription(description)
      .setNegativeButtonText(buttonCancel);

    return new Promise((resolve, reject) => {
      const BiometricCallback = java.lang.Object.extend({
        interfaces: [com.biometric.auth.BiometricCallback],
      });

      // Почему-то когда в расширяемого объкта добавлять свойства, 
      // все функции и переменные с замыкания заморaживаються
      
      const biometricCallback = new BiometricCallback();
      
      // все прошло успешно
      biometricCallback.onAuthenticationSuccessful = () => resolve(),

      // несколько неудачных попыток считывания (5)
      // после этого сенсор станет недоступным на некоторое время (30 сек)
      biometricCallback.onAuthenticationError = (errorCode, errString) => 
        reject(new Error(errString)),

      // отпечаток считался, но не распознался
      biometricCallback.onAuthenticationFailed = () => console.log('onAuthenticationFailed');

      // грязные пальчики, недостаточно сильный зажим
      biometricCallback.onAuthenticationHelp = (helpCode, helpString) => 
        console.log('onAuthenticationHelp', helpCode, helpString)
      

      biometricManager.authenticate(biometricCallback);
    });
  }
};

export default {
  FingerprintAuth
};
