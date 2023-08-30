export default class UserDto {
 
  constructor(user) {
    const {first_name, last_name, age} = user
    this.name = first_name.toLowerCase()
    this.lastName = last_name.toLowerCase()
    this.age = parseInt(age)

}}