import React from "react";
import {Redirect} from "react-router-dom";
import formMode from "../../helpers/formHelper";
import {addAnnouncementApiCall, getAnnouncementByIdApiCall, updateAnnouncementApiCall} from "../../apiCalls/announcementApiCalls";
import {checkRequired} from "../../helpers/validationCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import {withTranslation} from 'react-i18next';
import { formValidationKeys } from '../../helpers/formHelper'

class AnnouncementForm extends React.Component{
    constructor(props) {
        super(props);
        const paramsAnnouncementId = props.match.params.announcementId
        const currentFormMode = paramsAnnouncementId ? formMode.EDIT : formMode.NEW

        this.state = {
            announcementId: paramsAnnouncementId,
            announcement :  {
                dateOfPublication: '',
                expirationDate: '',
                text:''
            },
            errors: {
                dateOfPublication: '',
                expirationDate: '',
                text:''
            },
            formMode : currentFormMode,
            redirect : false,
            error : null
        }
    }

    fetchAnnouncementDetails = () => {
        getAnnouncementByIdApiCall(this.state.announcementId)
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
                            announcement: data,
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
            this.fetchAnnouncementDetails()
    }

    handleChange = (event) => {
        const {name, value} = event.target
        const announcement = {...this.state.announcement}
        announcement[name] = value

        const errorMessage = this.validateField(name,value)
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            announcement: announcement,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) =>
    {
        let errorMessage = '';
        if (fieldName === 'text')
        {
            if(!checkRequired(fieldValue))
                errorMessage = formValidationKeys.notEmpty
        }
        return errorMessage
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if(isValid){
            const
                announcement = this.state.announcement,
                currentFormMode = this.state.formMode;
            let
                promise,
                response;

            if(currentFormMode === formMode.NEW)
                promise = addAnnouncementApiCall(announcement)
            else if(currentFormMode === formMode.EDIT)
            {
                const announcementId = this.state.announcementId
                promise = updateAnnouncementApiCall(announcementId,announcement)
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
        const announcement = this.state.announcement
        const errors = this.state.errors

        for(const fieldName in announcement)
        {
            const fieldValue = announcement[fieldName]
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
                ? t('announcement.form.add.confirm.text')
                : t('announcement.form.edit.confirm.text')

            return (
                <Redirect to={{
                    pathname: "/announcements/",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const errorsSummary = this.hasErrors() ? t('validation.formContainsErrors') : ''
        const fetchError = this.state.error ? `${t('validation.error')}: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('announcement.form.add.pageTitle') : t('announcement.form.edit.pageTitle')

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('announcement.fields.text')}
                        required
                        error={this.state.errors.text}
                        name="text"
                        onChange={this.handleChange}
                        value={this.state.announcement.text}/>

                        <FormInput
                        type="date"
                        label={t('announcement.fields.expirationDate')}
                        required
                        error={this.state.errors.expirationDate}
                        name="expirationDate"
                        onChange={this.handleChange}
                        value={this.state.announcement.expirationDate}/>

                        <FormButtons
                            formMode={this.state.formMode}
                            error={globalErrorMessage}
                            cancelPath={"/announcements"}/>
                </form>
            </main>
        )
    }
}

export default withTranslation()(AnnouncementForm)