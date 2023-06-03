const {
    validateEmail,
    validateDependence,
    validatePassword,
    validateUsername,
    validateDependenceSlug,
    validateProjectName,
    validateProjectSlug,
    validateProjectMetaName,
} = require("./validators")

const validate = (data) => {
    let errors = {}

    const validatorMap = {
        validateEmail,
        validateDependence,
        validatePassword,
        validateUsername,
        validateDependenceSlug,
        validateProjectName,
        validateProjectSlug,
        validateProjectMetaName,
    }

    for (let key in data) {
        if (data[key]) {
            let validationFunction = `validate${key.charAt(0).toUpperCase() + key.slice(1)}`
            if (validatorMap[validationFunction] && !validatorMap[validationFunction](data[key])) {
                errors = { 
                    message: `Invalid ${key}`,
                    statusCode: 400,
                }
            }
        }
    }
    if(errors)return errors
    return null
}



module.exports = validate
