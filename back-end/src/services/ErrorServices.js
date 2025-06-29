const ErrorServices = {

    validacaoErro: (msg ,error, response) => {
        if(error.name ===  'SequelizeUniqueConstraintError') {
            return response.status(422).json({ 
                message: msg + error.errors[0].message
            })
        }
        return response.status(500).json({ 
            message: msg + error
        })
    }
}

module.exports = ErrorServices;