const formMode = {
    NEW: 'NEW',
    EDIT: 'EDIT'
}

export const formValidationKeys = {
    notEmpty: 'notEmpty',
    len_2_60: 'len_2_60',
    len_5_60: 'len_5_60',
    notEmail: 'notEmail',
    len_7_13: 'len_7_13',
    notNumber: 'notNumber',
    len_7_50: 'len_7_50',
    len_1_50: 'len_1_50',
    notFutureDate: 'notFutureDate',
    notDate: 'notDate',
    notBeforeFromDate: 'notBeforeFromDate',
    notRegistrationNumber: 'notRegistrationNumber',
    notInsuranceNumber: 'notInsuranceNumber',
    len_5_30: 'len_5_30',
    len_2_30: 'len_2_30',
    len_1_30: 'len_1_30',
    greaterThan0: 'greaterThan0'
}

export function getValidationErrorKey(error) {
    return `validation.messages.${error}`
}


export default formMode