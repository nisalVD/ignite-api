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
* Module: References
* content: String
* answers: [{
  content:String
}]

#### Module
* name: String

#### Marking
User: References
Module: References
Quest.answer: References
correct: boolean

### Answer
Question: references
Question.answer: references


### CheckList
* x View all modules
* x View all questions for certain module
* x Find all the answers for the question
* x Make Answer table
* List marking associated with user

* Add marking functionality that checks if the question is right
* Refactor the routes alot