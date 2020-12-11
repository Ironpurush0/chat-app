const {User} = require('../models')
const bcrypt = require('bcrypt')
const {UserInputError, AuthenticationError} = require('apollo-server')

module.exports = {
    Query: {
        getUsers: async () => {
            try {
                const users = await User.findAll()
                return users
            } catch (error) {
                console.log(error.message)                
            }
        },

        login: async (_, args) => {
            const {username, password} = args
            let errors = {}

            try {
                if(username.trim() === '') errors.username = "Username must not be empty"
                if(password === '') errors.password = "Password must not be empty"

                const user = await User.findOne({where: {username}})

                if(!user){
                    errors.username = "user does not exist"
                }

                if(Object.keys(errors).length > 0){
                    throw new UserInputError("user does not exist", {errors})
                }

                const correctPasword = await bcrypt.compare(password, user.password)
                if(!correctPasword){
                    errors.password = "password is not correct."
                    throw new UserInputError("Password is not correct")
                }

                return user
            } catch (error) {
                console.log(error)
                throw error
            }
        }
      },

      Mutation:{
          register: async (_, args) => {
              let {username, email, password, confirmPassword} = args
              let errors = {}

              try {
                  //*validate user input
                  if(username.trim() === '') errors.username = 'Username must not be empty.'
                  if(email.trim() === '') errors.email = 'Email must not be empty.'
                  if(password.trim() === '') errors.password = 'Password must not be empty.'
                  if(confirmPassword.trim() === '') errors.confirmPassword = 'ConfirmPasswrd must not be empty.'

                  if(password !== confirmPassword) errors.matchPassword = 'Password does not match'

                //   //?check for data existense
                //   const userByUsername = await User.findOne({where: {username}})
                //   const userByEmail = await User.findOne({where: {email}})

                //   if(userByUsername) errors.username = "Username is taken"
                //   if(userByEmail) errors.email = "Email is already registered"

                  if(Object.keys(errors).length > 0){
                      throw errors
                  }

                  //!hashing the password
                  password = await bcrypt.hash(password, 6)

                  //*create user
                  const user = await User.create({
                      username, email, password
                  })
                  return user

              } catch (error) {
                  console.log(error)
                  if(error.name === "SequelizeUniqueConstraintError"){
                      error.errors.forEach(er => (errors[er.path] = `${er.path} must be unique`))
                  } else if(error.name === "SequelizeValidationError"){
                      error.errors.forEach(er => (errors[er.path] = er.message))
                  }
                  throw new UserInputError('Bad input', {errors})
              }
          }
      }
}