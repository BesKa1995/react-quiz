export function createControl(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    value: ''
  }
}

export function validate(value, validation = null) {
  if (!validation) {
    return true
  }
  let isValid = true

  if (validation.required) {
    isValid = value !== ''
  }
  return  isValid
}



export function validateForm(fromControl) {
  let isFormValid = true
  for (const control in fromControl) {
    if (fromControl.hasOwnProperty(control)) {
      isFormValid = fromControl[control].valid && isFormValid
    }
  }

  return isFormValid

}