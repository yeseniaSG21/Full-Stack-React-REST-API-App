import React from 'react';

/**
 * This component provides the "Form" utilized in user sign-in and sign-up by:
    ** Anazlying the submit and cancel events.
    ** Providing the submit and cancel buttons.
    ** Rendering Validation errors.
 **/

const Form = (props) => {
    const { cancel, errors, submit, submitButtonText, elements } = props;

    // Handles the form submission
    function handleSubmit(event) {
        event.preventDefault();
        submit();
    }

    // Handles when the form is canceled
    function handleCancel(event) {
        event.preventDefault();
        cancel();
    }

    return (
        <div>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                {elements()}
                <div className="pad-bottom">
                    <button className="button" type="submit">{submitButtonText}</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

// Creates the Validation Errors to use in the Form above
function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;

    if (errors.length) {
        errorsDisplay = (
            <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
            </div>
        );
    }

    return errorsDisplay;
}

export default Form;