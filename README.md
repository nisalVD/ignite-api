# Ignite-API
### Models
* User
* Question
* Module
* Marking

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

#### Module
* name: String

#### Marking
userID: References
moduleId: References
questionId: References
correct: boolean
