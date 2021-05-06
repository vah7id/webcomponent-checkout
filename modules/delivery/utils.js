import { Required } from '@lion/form-core';

class AddressValidator extends Required {
    execute(modelValue, param) {
      const hasFeedback = false;
      if (modelValue === param) {
        hasFeedback = true;
      }
      return hasFeedback;
    }
  
    static get validatorName() {
      return 'Required';
    }
  
    static getMessage({ fieldName }) {
      return `Please fill in ${fieldName}, it's REQUIRED!!!`;
    }
}

export {
    AddressValidator
}