const schema = `
# passwordReset type
type passwordReset {
  passwordResetToken: String
  passwordResetExpire: String
}

# user type
type User {
    userName: String
    firstName: String
    lastName: String
    email: String
    role: String
    mobile: String
    nationalID : String
    gender: String
    accountStatus: String
    passwordReset: passwordReset

}
type Query {
    # Return a user by username
    User : User
    # Set NationalID
    setNationalID(username : String): User
    # Activate NationalID
    activateNationalID(userName : String , image : String): User
}

`;

module.exports.Schema = schema;
