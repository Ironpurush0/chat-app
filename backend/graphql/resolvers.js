const {User} = require('../models')
const bcrypt = require('bcrypt')
const {UserInputError} = require('apollo-server')

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

                  //?check for data existense
                  const userByUsername = await User.findOne({where: {username}})
                  const userByEmail = await User.findOne({where: {email}})

                  if(userByUsername) errors.username = "Username is taken"
                  if(userByEmail) errors.email = "Email is already registered"

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
                  console.log(error.message)
                  throw new UserInputError('Bad input', {errors: error})
              }
          }
      }
}