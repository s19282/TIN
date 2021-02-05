import React from "react";
import {Redirect} from "react-router-dom";
import formMode from "../../helpers/formHelper";
import {addOwnerApiCall, getOwnerByIdApiCall, updateOwnerApiCall} from "../../apiCalls/ownerApiCalls";
import {
    checkEmail,
    checkNumber,
    checkRequired,
    checkTextLength,
    checkTextLengthRange
} from "../../helpers/validationCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import {withTranslation} from 'react-i18next';
import { formValidationKeys } from '../../helpers/formHelper'

class OwnerForm extends React.Component{
    constructor(props) {
        super(props);
        const paramsOwnerId = props.match.params.ownerId
        const currentFormMode = paramsOwnerId ? formMode.EDIT : formMode.NEW

        this.state = {
            ownerId: paramsOwnerId,
            owner :  {
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                password: ''
            },
            errors: {
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                password: ''
            },
            formMode : currentFormMode,
            redirect : false,
            error : null
        }
    }

    fetchOwnerDetails = () => {
        getOwnerByIdApiCall(this.state.ownerId)
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
                            owner: data,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true
                    })
                },
                (error) =>{
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    componentDidMount = () =>{
        const currentFormMode = this.state.formMode
        if(currentFormMode === formMode.EDIT)
            this.fetchOwnerDetails()
    }

    handleChange = (event) => {
        const {name, value} = event.target
        const owner = {...this.state.owner}
        owner[name] = value

        const errorMessage = this.validateField(name,value)
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            owner: owner,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) =>
    {
        let errorMessage = '';
        if (fieldName === 'firstName')
        {
            if(!checkRequired(fieldValue))
                errorMessage = formValidationKeys.notEmpty
            else if(!checkTextLengthRange(fieldValue,2,60))
                errorMessage = formValidationKeys.len_2_60
        }
        if (fieldName === 'lastName')
        {
            if(!checkRequired(fieldValue))
                errorMessage = formValidationKeys.notEmpty
            else if(!checkTextLengthRange(fieldValue,2,60))
                errorMessage = formValidationKeys.len_2_60
        }
        if(fieldName === 'email')
        {
            if (!checkRequired(fieldValue))
                errorMessage = formValidationKeys.notEmpty
            else if (!checkTextLengthRange(fieldValue,5,60))
                errorMessage = formValidationKeys.len_5_60
            else if (!checkEmail(fieldValue))
                errorMessage = formValidationKeys.notEmail
        }
        if(fieldName === 'phoneNumber')
        {
            if (!checkRequired(fieldValue))
                errorMessage = formValidationKeys.notEmpty
            else if (!checkTextLengthRange(fieldValue,7,13))
                errorMessage = formValidationKeys.len_7_13
            else if(checkNumber(fieldValue))
                errorMessage = formValidationKeys.notNumber
        }
        if(fieldName === 'password')
        {
            if(!(checkTextLength(fieldValue)===0 && this.state.formMode==="EDIT"))
            {
                if (!checkRequired(fieldValue))
                    errorMessage = formValidationKeys.notEmpty
                else if (!checkTextLengthRange(fieldValue,7,50))
                    errorMessage = formValidationKeys.len_7_50
            }
        }
        return errorMessage
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if(isValid){
            const
                owner = this.state.owner,
                currentFormMode = this.state.formMode;
            let
                promise,
                response;

            if(currentFormMode === formMode.NEW)
                promise = addOwnerApiCall(owner)
            else if(currentFormMode === formMode.EDIT)
            {
                const ownerId = this.state.ownerId
                promise = updateOwnerApiCall(ownerId,owner)
            }
            if(promise)
            {
                promise
                    .then(
                        (data) =>{
                            response = data
                            if(response.status === 201 || response.status === 500)
                                return data.json()
                        })
                    .then(
                        (data) => {
                            if(!response.ok && response.status === 500)
                            {
                                for(const i in data)
                                {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    const errors = {...this.state.errors}
                                    errors[fieldName] = errorMessage
                                    this.setState({
                                        errors: errors,
                                        error: null
                                    })
                                }
                            }
                            else
                                this.setState({redirect: true})
                        },
                        (error) =>{
                            this.setState({error})
                        }
                    )
            }
        }
    }

    validateForm = () => {
        const owner = this.state.owner
        const errors = this.state.errors

        for(const fieldName in owner)
        {
            const fieldValue = owner[fieldName]
            const errorMessage = this.validateField(fieldName,fieldValue)
            errors[fieldName] = errorMessage
        }
        this.setState({
            errors: errors
        })
        return !this.hasErrors()
    }

    hasErrors = () => {
        const errors = this.state.errors
        for(const errorField in this.state.errors)
        {
            if(errors[errorField].length > 0)
                return true
        }
    }

    render() {
        const {redirect} = this.state
        const { t } = this.props

        if(redirect)
        {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW
                ? t('owner.form.add.confirm.text')
                : t('owner.form.edit.confirm.text')

            return (
                <Redirect to={{
                    pathname: "/owners/",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const errorsSummary = this.hasErrors() ? t('validation.formContainsErrors') : ''
        const fetchError = this.state.error ? `${t('validation.error')}: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('owner.form.add.pageTitle') : t('owner.form.edit.pageTitle')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('owner.fields.firstName')}
                        required
                        error={this.state.errors.firstName}
                        name="firstName"
                        placeholder={t('owner.placeHolders.firstName')}
                        onChange={this.handleChange}
                        value={this.state.owner.firstName}/>

                        <FormInput
                        type="text"
                        label={t('owner.fields.lastName')}
                        required
                        error={this.state.errors.lastName}
                        name="lastName"
                        placeholder={t('owner.placeHolders.lastName')}
                        onChange={this.handleChange}
                        value={this.state.owner.lastName}/>

                        <FormInput
                        type="text"
                        label={t('owner.fields.email')}
                        required
                        error={this.state.errors.email}
                        name="email"
                        placeholder={t('owner.placeHolders.email')}
                        onChange={this.handleChange}
                        value={this.state.owner.email}/>

                        <FormInput
                        type="text"
                        label={t('owner.fields.phoneNumber')}
                        required
                        error={this.state.errors.phoneNumber}
                        name="phoneNumber"
                        placeholder={t('owner.placeHolders.phoneNumber')}
                        onChange={this.handleChange}
                        value={this.state.owner.phoneNumber}/>

                        <FormInput
                        type="password"
                        label={t('owner.fields.password')}
                        required
                        error={this.state.errors.password}
                        name="password"
                        placeholder={t('owner.placeHolders.password')}
                        onChange={this.handleChange}/>

                        <FormButtons
                            formMode={this.state.formMode}
                            error={globalErrorMessage}
                            cancelPath={"/owners"}/>
                </form>
            </main>
        )
    }
}

export default withTranslation()(OwnerForm)