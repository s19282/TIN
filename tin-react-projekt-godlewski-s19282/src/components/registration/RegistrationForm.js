import React from "react";
import {Redirect} from "react-router-dom";
import formMode from "../../helpers/formHelper";
import {
    addRegistrationApiCall,
    getRegistrationByIdApiCall,
    updateRegistrationApiCall
} from "../../apiCalls/registrationApiCalls";
import {
    checkDate,
    checkInsuranceNumber,
    checkRegistrationNumber,
    checkRequired,
    isSameOrBefore
} from "../../helpers/validationCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import FormSelect from "../form/FormSelect";
import {getOwnersApiCall} from "../../apiCalls/ownerApiCalls";
import {getVehiclesApiCall} from "../../apiCalls/vehicleApiCalls";
import { withTranslation } from 'react-i18next';
import { formValidationKeys } from '../../helpers/formHelper'

class RegistrationForm extends React.Component
{
    constructor(props) {
        super(props);

        const paramsRegistrationId = props.match.params.registrationId
        const currentFormMode = paramsRegistrationId ? formMode.EDIT : formMode.NEW
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state = {
            registrationId : paramsRegistrationId,
            registration: {
                dateFrom : '',
                dateTo : '',
                registrationNumber : '',
                insuranceNumber : '',
                owner_id: '',
                vehicle_id: '',
                notice : notice
            },
            errors: {
                dateFrom : '',
                dateTo : '',
                registrationNumber : '',
                insuranceNumber : '',
                owner_id: '',
                vehicle_id: ''
            },
            formMode : currentFormMode,
            redirect : false,
            error : null,
            allOwners : [],
            allVehicles : []
        }
    }

    fetchRegistrationForm = () => {
        getRegistrationByIdApiCall(this.state.registrationId)
            .then(res => res.json())
            .then(
                (data) => {
                    if(data.message){
                        this.setState({
                            message: data.message
                        })
                    }
                    else
                    {
                        this.setState({
                            registration: data,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode
        if (currentFormMode === formMode.EDIT)
            this.fetchRegistrationForm()

        getVehiclesApiCall()
            .then(res =>res.json())
            .then((data) => {
                this.setState({
                    allVehicles: data
                })
            })
        getOwnersApiCall()
            .then(res => res.json())
            .then((data) =>{
                this.setState({
                    allOwners: data
                })
            })
    }

    handleChange = (event) => {
        const { name, value } = event.target
        const registration = { ...this.state.registration }
        registration[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        this.setState({
            registration: registration,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) =>
    {
        let errorMessage = '';

        if (fieldName === 'owner_id')
        {
            if (!checkRequired(fieldValue))
                errorMessage = formValidationKeys.notEmpty
        }

        if (fieldName === 'vehicle_id')
        {
            if (!checkRequired(fieldValue))
                errorMessage = formValidationKeys.notEmpty
        }

        if (fieldName === 'dateFrom')
        {
            if (!checkRequired(fieldValue))
                errorMessage = formValidationKeys.notEmpty
            else if (!checkDate(fieldValue))
                errorMessage = formValidationKeys.notDate
            else if (isSameOrBefore(fieldValue))
                errorMessage = formValidationKeys.notFutureDate
        }
        if (fieldName === 'dateTo')
        {
            if (isSameOrBefore(fieldValue))
                errorMessage = formValidationKeys.notFutureDate
            // else if (isSameOrAfter(fieldValue))
            //     errorMessage = "Data końca rejestracji nie może być wcześniejsza niż data początku rejestracji";
            //    TODO: check if it's possible to get access to other field
        }

        if (fieldName === 'registrationNumber')
        {
            if (!checkRequired(fieldValue))
                errorMessage = formValidationKeys.notEmpty
            else if (!checkRegistrationNumber(fieldValue))
                errorMessage = formValidationKeys.notRegistrationNumber
        }

        if (fieldName === 'insuranceNumber')
        {
            if (!checkRequired(fieldValue))
                errorMessage = formValidationKeys.notEmpty
            else if (!checkInsuranceNumber(fieldValue))
                errorMessage = formValidationKeys.notInsuranceNumber
        }

        return errorMessage;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                registration = this.state.registration,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addRegistrationApiCall(registration)

            }
            else if (currentFormMode === formMode.EDIT)
            {
                const registrationId = this.state.registrationId
                promise = updateRegistrationApiCall(registrationId, registration)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        })
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                for (const i in data)
                                {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    const errors = { ...this.state.errors }
                                    errors[fieldName] = errorMessage
                                    this.setState({
                                        errors: errors,
                                        error: null
                                    })
                                }
                            } else {
                                this.setState({ redirect: true })
                            }
                        },
                        (error) => {
                            this.setState({ error })
                        })
            }
        }
    }

    validateForm = () => {
        const registration = this.state.registration
        const errors = this.state.errors

        for (const fieldName in registration)
        {
            const fieldValue = registration[fieldName]
            errors[fieldName] = this.validateField(fieldName, fieldValue)
        }
        this.setState({
            errors: errors
        })
        return !this.hasErrors()
    }

    hasErrors = () => {
        const errors = this.state.errors
        for (const errorField in this.state.errors) {
            if (errors[errorField].length > 0) {
                return true
            }
        }
        return false
    }



    render() {
        const { redirect } = this.state
        const { t } = this.props;

        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? t('registration.form.add.confirm.text') : t('registration.form.edit.confirm.text')
            return (
                <Redirect to={{
                    pathname: "/registrations/",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const errorsSummary = this.hasErrors() ? t('validation.formContainsErrors') : ''
        const fetchError = this.state.error ? `${t('validation.error')}: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('registration.form.add.pageTitle') : t('registration.form.edit.pageTitle')
        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormSelect
                        label={t('registration.fields.owner')}
                        required
                        error={this.state.errors.owner_id}
                        name="owner_id"
                        onChange={this.handleChange}
                        value={this.state.registration.owner_id}
                        list={this.state.allOwners}
                        isOwner={true}
                        id={this.state.registration.owner_id}
                    />
                    <FormSelect
                        label={t('registration.fields.vehicle')}
                        required
                        error={this.state.errors.vehicle_id}
                        name="vehicle_id"
                        onChange={this.handleChange}
                        value={this.state.registration.vehicle_id}
                        list={this.state.allVehicles}
                        isOwner={false}
                        id={this.state.registration.vehicle_id}
                    />
                    <FormInput
                        type="date"
                        label={t('registration.fields.dateFrom')}
                        required
                        error={this.state.errors.dateFrom}
                        name="dateFrom"
                        onChange={this.handleChange}
                        value={this.state.registration.dateFrom}
                    />
                    <FormInput
                        type="date"
                        label={t('registration.fields.dateTo')}
                        error={this.state.errors.dateTo}
                        name="dateTo"
                        onChange={this.handleChange}
                        value={this.state.registration.dateTo}
                    />
                    <FormInput
                        type="text"
                        label={t('registration.fields.registrationNumber')}
                        required
                        error={this.state.errors.registrationNumber}
                        name="registrationNumber"
                        placeholder={t('registration.placeHolders.registrationNumber')}
                        onChange={this.handleChange}
                        value={this.state.registration.registrationNumber}
                    />
                    <FormInput
                        type="text"
                        label={t('registration.fields.insuranceNumber')}
                        required
                        error={this.state.errors.insuranceNumber}
                        name="insuranceNumber"
                        placeholder={t('registration.placeHolders.insuranceNumber')}
                        onChange={this.handleChange}
                        value={this.state.registration.insuranceNumber}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/registrations"
                    />
                </form>
                <p className="success">{this.state.notice}</p>
            </main >
        )
    }
}

export default withTranslation() (RegistrationForm)