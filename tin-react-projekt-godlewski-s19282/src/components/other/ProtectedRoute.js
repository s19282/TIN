import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import { isAuthenticated } from '../../helpers/authHelper'

class ProtectedRoute extends React.Component {

    render() {
        return isAuthenticated()
            ? (<Route exact path={this.props.path} component={this.props.component}/> )
            : (<Redirect to="/login" />);
    }
}

export default ProtectedRoute;

