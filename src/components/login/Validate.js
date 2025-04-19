
export function Validation(formData,emailRegex,passwordRegex){
    const errors={};

    if(!formData.email.trim()){
        errors.email='email is required';
    }
    else if(!emailRegex.test(formData.email)){
        errors.email='email is not valid';
    }
    if(!formData.password.trim()){
        errors.password='password is required';
    }
    else if(!passwordRegex.test(formData.password)){
        errors.password='password needs uppercase, lowercase, symbol & 6+ chars'
    }
    return errors;
}