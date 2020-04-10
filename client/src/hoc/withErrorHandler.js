import React, {useState, useEffect, Fragment} from 'react';
import DialogBoxModel from '../components/UI/DialogBoxModel/DialogBoxModel'

const withErrorHandler = ( WrappedComponent, axios ) => {
    return props=>{
        const [error, setError] = useState(null);

            const reqInterceptor=axios.interceptors.request.use(req => {
                setError(null);
                return req;
            });
            const resInterceptor=axios.interceptors.response.use(res => res, error => {
                setError(error);
            });

            useEffect(()=>{
                return ()=>{
                    axios.interceptors.request.eject(reqInterceptor);
                    axios.interceptors.response.eject(resInterceptor);
                }
            })

        const errorConfirmedHandler = () => {
            setError(null);
        }

            return (
                <Fragment>
                    <DialogBoxModel 
                        show={error}
                        close={errorConfirmedHandler}>
                        {error ? error.message : null}
                    </DialogBoxModel>
                    <WrappedComponent {...props} />
                </Fragment>
            );
    }
}

export default withErrorHandler;