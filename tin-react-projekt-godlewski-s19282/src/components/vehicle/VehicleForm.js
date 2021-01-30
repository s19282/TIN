import React from "react";
import formMode from "../../helpers/formHelper";
import {addVehicleApiCall, getVehicleByIdApiCall, updateVehicleApiCall} from "../../apiCalls/vehicleApiCalls";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import {Redirect} from "react-router-dom";
import {
    checkDate,
    checkNumber,
    checkRequired,
    checkTextLengthRange,
    isMoreThanZero,
    isSameOrBefore
} from "../../helpers/validationCommon";

class VehicleForm extends React.Component
{
    constructor(props)
    {
        super(props);

        const paramsVehicleId = props.match.params.vehicleId
        const currentFormMode = paramsVehicleId ? formMode.EDIT : formMode.NEW

        this.state =
        {
            vehicleId : paramsVehicleId,
            vehicle :
            {
                vin : '',
                make : '',
                model : '',
                firstRegistrationDate : '',
                engineCapacity : ''
            },
            errors :
            {
                vin : '',
                make : '',
                model : '',
                firstRegistrationDate : '',
                engineCapacity : ''
            },
            formMode : currentFormMode,
            redirect : false,
            error : null
        }
    }

    fetchVehicleDetails = () =>
    {
        getVehicleByIdApiCall(this.state.vehicleId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message)
                    {
                        this.setState({
                            message: data.message
                        })
                    }
                    else
                    {
                        this.setState({
                            vehicle: data,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true,
                    })
                },
                (error) =>
                {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })
    }

    componentDidMount = () =>
    {
        const currentFormMode = this.state.formMode
        if (currentFormMode === formMode.EDIT)
            this.fetchVehicleDetails()
    }

    handleChange = (event) =>
    {
        const { name, value } = event.target
        const vehicle = { ...this.state.vehicle }
        vehicle[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        this.setState({
            vehicle: vehicle,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) =>
    {
        let errorMessage = '';
        if (fieldName === 'vin')
        {
            if (!checkRequired(fieldValue))
                errorMessage = 'Pole jest wymagane'
            else if (!checkTextLengthRange(fieldValue, 5, 30))
                errorMessage = 'Pole powinno zawierać od 5 do 30 znaków'
        }
        if (fieldName === 'make')
        {
            if (!checkRequired(fieldValue))
                errorMessage = 'Pole jest wymagane'
            else if (!checkTextLengthRange(fieldValue, 2, 30))
                errorMessage = 'Pole powinno zawierać od 2 do 30 znaków'
        }
        if (fieldName === 'model')
        {
            if (!checkRequired(fieldValue))
                errorMessage = 'Pole jest wymagane'
            else if (!checkTextLengthRange(fieldValue, 1, 30))
                errorMessage = 'Pole powinno zawierać od 1 do 30 znaków'
        }
        if (fieldName === 'firstRegistrationDate')
        {
            if (!checkRequired(fieldValue))
                errorMessage = "Pole jest wymagane";
            else if (!checkDate(fieldValue))
                errorMessage = "Data nie może być z przyszłości";
            else if (isSameOrBefore(fieldValue))
                errorMessage = "Data nie może być z przyszłości";
        }
        if (fieldName === 'engineCapacity')
        {
            if (!checkRequired(fieldValue))
                errorMessage = "Pole jest wymagane";
            else if (checkNumber(fieldValue))
                errorMessage = "Pojemność silnika musi być liczbą";
            else if (isMoreThanZero(fieldValue))
                errorMessage = "Pojemność silnika musi być większa od zera";
        }
        return errorMessage
    }

    handleSubmit = (event) =>
    {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid)
        {
            const
                vehicle = this.state.vehicle,
                currentFormMode = this.state.formMode
            let
                promise,
                response;

            if (currentFormMode === formMode.NEW)
            {
                promise = addVehicleApiCall(vehicle)

            }
            else if (currentFormMode === formMode.EDIT)
            {
                const vehicleId = this.state.vehicleId
                promise = updateVehicleApiCall(vehicleId, vehicle)
            }
            if (promise)
            {
                promise
                    .then(
                        (data) =>
                        {
                            response = data
                            if (response.status === 201 || response.status === 500)
                                return data.json()
                        })
                    .then(
                        (data) =>
                        {
                            if (!response.ok && response.status === 500)
                            {
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
                            }
                            else
                                this.setState({ redirect: true })
                        },
                        (error) => this.setState({ error })
                    )
            }

        }
    }

    validateForm = () =>
    {
        const vehicle = this.state.vehicle
        const errors = this.state.errors
        for (const fieldName in vehicle)
        {
            const fieldValue = vehicle[fieldName]
            const errorMessage = this.validateField(fieldName, fieldValue)
            errors[fieldName] = errorMessage
        }
        this.setState({
            errors: errors
        })
        return !this.hasErrors()
    }

    hasErrors = () =>
    {
        const errors = this.state.errors
        for (const errorField in this.state.errors)
        {
            if (errors[errorField].length > 0)
                return true
        }
        return false
    }

    render()
    {
        const { redirect } = this.state
        if (redirect)
        {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie dodano nowy pojazd' : 'Pomyślnie zaktualizowano pojazd'
            return (
                <Redirect to={{
                    pathname: "/vehicles/",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? 'Nowy pojazd' : 'Edycja pojazdu'

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label="VIN"
                        required
                        error={this.state.errors.vin}
                        name="vin"
                        placeholder="5-30 znaków"
                        onChange={this.handleChange}
                        value={this.state.vehicle.vin}
                    />
                    <FormInput
                        type="text"
                        label="Marka"
                        required
                        error={this.state.errors.make}
                        name="make"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        value={this.state.vehicle.make}
                    />
                    <FormInput
                        type="text"
                        label="Model"
                        required
                        error={this.state.errors.model}
                        name="model"
                        placeholder="np. nazwa@domena.pl"
                        onChange={this.handleChange}
                        value={this.state.vehicle.model}
                    />
                    <FormInput
                        type="date"
                        label="Data pierwszej rejestracji"
                        required
                        error={this.state.errors.firstRegistrationDate}
                        name="firstRegistrationDate"
                        onChange={this.handleChange}
                        value={this.state.vehicle.firstRegistrationDate}
                    />
                    <FormInput
                        type="text"
                        label="Pojemność silnika"
                        required
                        error={this.state.errors.engineCapacity}
                        name="engineCapacity"
                        placeholder="np. nazwa@domena.pl"
                        onChange={this.handleChange}
                        value={this.state.vehicle.engineCapacity}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/vehicles"
                    />
                </form>
            </main >
        )
    }
}

export default VehicleForm