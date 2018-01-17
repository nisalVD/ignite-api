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

### Answer
question: references
question.answer: references

### CheckList
* x View all modules
* x View all questions for certain module
* x Find all the answers for the question
* x Make Answer table