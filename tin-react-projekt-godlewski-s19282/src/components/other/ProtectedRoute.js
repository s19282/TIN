import {Redirect, Route} from "react-router-dom";
import {isAuthenticated} from "../../helpers/authHelper";

export function ProtectedRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest}
            render={props =>
                isAuthenticated()
                    ? (<Component {...props} />)
                    : (<Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />)
            }
        />
    );
}