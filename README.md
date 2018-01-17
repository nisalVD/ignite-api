# Ignite-API
### Models
* User
* Question
* Module
* Marking
* Answer

#### User
* firstName: String,
* lastName: String,
* email: String,
* password,
* dateOfBirth: Date,
* address: String,
* State: String,
* PostCode: String

#### Question
* moduleId: References
* content: String
* answers: [{
  content:String
}]

#### Module
* name: String

#### Marking
userId: References
moduleId: References
questionId: References
correct: boolean

### CheckList
* x View all modules
* x View all questions for certain module
* Find all the answers for the question