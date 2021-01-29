import React from "react";
import {Redirect} from "react-router-dom";
import formMode from "../../helpers/formHelper";
import {addOwnerApiCall, getOwnerByIdApiCall, updateOwnerApiCall} from "../../apiCalls/ownerApiCalls";
import {checkRequired,checkTextLengthRange,checkEmail} from "../../helpers/validationCommon";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";

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
                            emp: data,
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

    componentDidMound = () =>{
        const currentFormMode = this.state.formMode
        if(currentFormMode === formMode.EDIT)
            this.fetchOwnerDetails()
    }

    handleChange = (event) => {
        const {name, value} = event.target
        const owner = {...this.state.emp}
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
        if (fieldName === 'firstName'){
            if(!checkRequired(fieldValue))
                errorMessage = 'Pole jest wymagane'
            else if(!checkTextLengthRange(fieldValue,2,60))
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
        }
        if (fieldName === 'lastName')
        {
            if(!checkRequired(fieldValue))
                errorMessage = 'Pole jest wymagane'
            else if(!checkTextLengthRange(fieldValue,2,60))
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
        }
        if(fieldName === 'email')
        {
            if (!checkRequired(fieldValue))
                errorMessage = "Pole jest wymagane";
            else if (!checkTextLengthRange(fieldValue))
                errorMessage = "Pole powinno zawierać od 5 do 60 znaków";
            else if (!checkEmail(fieldValue))
                errorMessage = "Pole powinno zawierać prawidłowy adres email";
        }
        if(fieldName === 'phoneNumber')
        {
            if (!checkRequired(fieldValue))
                errorMessage = "Pole jest wymagane";
            else if (!checkTextLengthRange(fieldValue))
                errorMessage = "Pole powinno zawierać od 5 do 60 znaków";
            else if (!checkEmail(fieldValue))
                errorMessage = "Pole powinno zawierać prawidłowy adres email";
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
                console.log(owner) //TODO: delete
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
                                console.log(data) //TODO: delete
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
                            console.log(error) //TODO: delete
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
        if(redirect)
        {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie dodano nowego właściciela' :
                'Pomyślnie zaktualizowano nowego właściciela'
            return (
                <Redirect to={{
                    pathname: "/employees/",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? 'Nowy właściciel' : 'Edycja właściciela'

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label="Imię"
                        required
                        error={this.state.errors.firstName}
                        name="firstName"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        value={this.state.owner.firstName}/>

                        <FormInput
                        type="text"
                        label="Nazwisko"
                        required
                        error={this.state.errors.lastName}
                        name="lastName"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        value={this.state.owner.lastName}/>

                        <FormInput
                        type="text"
                        label="Email"
                        required
                        error={this.state.errors.email}
                        name="email"
                        placeholder="np. nazwa@domena.pl"
                        onChange={this.handleChange}
                        value={this.state.owner.email}/>

                        <FormInput
                        type="text"
                        label="Numer telefonu"
                        required
                        error={this.state.errors.phoneNumber}
                        name="phoneNumber"
                        placeholder="2-60 znaków"   //TODO: change placeholder
                        onChange={this.handleChange}
                        value={this.state.owner.phoneNumber}/>
                        <FormButtons
                            formMode={this.state.formMode}
                            error={globalErrorMessage}
                            cancelPath={"/owners"}/>
                </form>
            </main>
            // <main>
            //     <h2>Nowy właściciel</h2>
            //     <form className="form">
            //         <label htmlFor="firstName">Imię:<abbr title="required" aria-label="required">*</abbr> </label>
            //         <input type="text" name="firstName" id="firstName" placeholder="2-60 znaków" value=""/>
            //         <span id="errorFirstName" className="errors-text"></span>
            //         <label htmlFor="lastName">Nazwisko:<abbr title="required" aria-label="required">*</abbr> </label>
            //         <input type="text" name="lastName" id="firstName" placeholder="2-60 znaków" value=""/>
            //         <span id="errorLastName" className="errors-text"></span>
            //         <label htmlFor="email">Email:<abbr title="required" aria-label="required">*</abbr></label>
            //         <input type="email" name="email" id="email" placeholder="np. nazwa@domena.pl" value="" />
            //         <span id="errorEmail" className="errors-text"></span>
            //         <label htmlFor="phoneNumber">Numer telefonu:</label>
            //         <input type="text" name="phoneNumber" id="phoneNumber" placeholder="XxxXxxXxx" value="" />
            //         <span id="errorPhoneNumber" className="errors-text"></span>
            //         <div className="form-buttons">
            //             <p id="errorsSummary" className="errors-text"></p>
            //             <input className="form-button-submit" type="submit" value="Dodaj" />
            //             <Link to="/owners" className="form-button-cancel">Anuluj</Link>
            //         </div>
            //     </form>
            // </main>
        )
    }
}

export default OwnerForm