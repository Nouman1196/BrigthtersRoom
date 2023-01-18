export const ProfileValidation = ({
    first_name,
    last_name,
    new_password,
    confirm_password
}) => {

    if (first_name === '') {
        return {
            valid: false,
            errors: first_name === '' ? "First Name is Required" : null
        }
    }
    else if (last_name === '') {
        return {
            valid: false,
            errors: last_name === '' ? "Last Name is Required" : null
        }
    } 
    else if (new_password === "" && confirm_password !== "") {
        return {
            valid: false,
            errors: new_password === "" && confirm_password !== "" ? "Please enter your New Password" : null
        }
    }
    else if (confirm_password === "" && new_password !== "") {
        return {
            valid: false,
            errors: confirm_password === "" ? "Please enter your Confirm Password" : null
        }
    }
    else if (new_password !== confirm_password) {
        return {
            valid: false,
            errors: new_password !== confirm_password ? "Password & Confirm Password Does not Match" : null
        }
    }
    else {
        return { valid: true, errors: null }
    }

}

export const loginValidation = ({ email, password }) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (email === '') {
        return {
            valid: false,
            errors: email === '' ? "Please Enter Your Email" : null
        }
    }
    else if (reg.test(email) === false) {
        return {
            valid: false,
            errors: reg.test(email) === false ? "Email format is invalid" : null
        }
    }
    else if (password === '') {
        return {
            valid: false,
            errors: password === '' ? "Please Enter Your Password" : null
        }
    }
    else {
        return { valid: true, errors: null }
    }
}


export const Signup_CreatePass = ({ password, confirmPassword }) => {

    if (password === "") {
        return {
            valid: false,
            errors: password === "" ? "Please enter your Password" : null
        }
    }
    else if (confirmPassword === "") {
        return {
            valid: false,
            errors: confirmPassword === "" ? "Please enter your Confirm Password" : null
        }
    }
    else if (confirmPassword !== password) {
        return {
            valid: false,
            errors: confirmPassword !== password ? "Password & Confirm Password Does not Match" : null
        }
    }
    else {
        return { valid: true, errors: null }
    }
}


export const Signup_validation = ({ email, password, firstName, lastName }) => {


    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (firstName === '') {
        return {
            valid: false,
            errors: firstName === '' ? "First Name is Required" : null
        }
    }
    else if (lastName === '') {
        return {
            valid: false,
            errors: lastName === '' ? "Last Name is Required" : null
        }
    }
    else if (email === '') {
        return {
            valid: false,
            errors: email === '' ? "Please Enter Your Email" : null
        }
    }
    else if (reg.test(email) === false) {
        return {
            valid: false,
            errors: reg.test(email) === false ? "Email format is invalid" : null
        }
    }
    else if (password === '') {
        return {
            valid: false,
            errors: password === '' ? "Please Enter Your Password" : null
        }
    }
    else if (password.length < 6) {
        return {
            valid: false,
            errors: password.length < 6 ? "Password is too short (minimum is 6 characters)" : null
        }
    }
    else {
        return { valid: true, errors: null }
    }
}