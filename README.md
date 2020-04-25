# Notes:
- POST => Create data to client (Create)
- GET => Read data from client (Read)
- PUT => Update resources (Update)
- DELETE => Delete resources (Delete)

# Express Setup
- Module Imports (ORDER MATTERS!!!)
  - express => npm i express
  - mongoose => npm i mongoose (Database)
  - config => npm i config 
  - debug => npm i debug
  - helmet => npm i helmet
  - morgan => npm i morgan
  - nodemon => npm i -g nodemon (Real time changes on Node.js)
  - set express to a variable => (app)
- Configuration
  - Config folder with .json (custom-environment-variables, default, dev, prod)
  - Log any ENV variables to look at
  - set DEBUG=app:*
  - set NODE_ENV= production || development
  - set app_password=1234
- Port
- Install middleware functions
  - express.json
  - express.urlencoded
  - express.static
- Install third party middleware functions
  - helmet
  - morgan => only for development env  
- Install custom party middleware functions
- Template Engine 
  - PUG
  - views folder with .pug (index.pug)
- Stores Specific routes in their own modules using express.Router() 
  - routes folder  
- Store Middleware functions into a folder => middleware 

# Asynchronous Programming:
- code executes in various order, does not wait for things to finish executing
  - Example: [A,B,D,C,E]

- Callbacks
- Promises
- Async/await => Prefered Method easier and cleaner to understand 

# Synchronous Programming:
- code executes in order, waits for things to finish executing
  - Example: [A,B,C,D,E]
  
# MongoDB:
- download mongoDB
- download mongoCompass
- set PATH environment variables where mongodb is located
- connect to mongoDB
- create mongoose schema
- compile Model Schema into Class 
- ### Create documents:
  - save to db
- ### Query (Get) documents:
  - limit
  - sort
  - select
  - Comparison Operators:
    - eq => equal
    - ne => not equal
    - gt => greater than
    - gte => greater than or equal to
    - lt => less than
    - lte => less than or equal to 
    - in => in
    - nin => not in 
  - Logical Operators:
    - or
    - and
  - Regular Expression
- ### Update Document (Query First): 
  - findById()
  - Modify its properties
  - save()
- ### Update Document (Update First):
  - Update directly
  - Optionally: get the updated document 
- ### Remove Document 

# MongoDB - Data Validation
- Built in validation 
- Custom validation
- async validation
- SchemaType options 

# Modeling Relationships
- References (Normalization) -> CONSISTENCY
- References (Denormalization) -> PERFORMANCE 
- Trade off between query performance vs consistency 
- Hybrid (Snapshot)

# ObjectID
- _id: 5e9c7d09a405a53a88fdd280
  - 12 bytes:
    - 4 bytes: timestamp
    - 3 bytes: machine identifier
    - 2 bytes: process identifier 
    - 3 bytes: counter

# Authentication -> Login & Auth
- bcrypt => npm i bcrypt
- joi-password-complexity => npm i  

- ### jwt:
  - jsonwebtoken => npm i jsonwebtoken  
  - set the jwtPrivateKey in custom-enviroment-variables config in auth
  - set response headers in login
  - create method generateAuthToken for cleaner coding approach

# Authorization -> Permissions 
- make sure user has access to api end points that require permission (if user is a user send to end points, else access denied)
- req.header, if no header send status 401 access denied 
- set auth middleware function that takes three args (req, res, next)
- verify jwt with config => custom-enviroment-variables
- use auth middleware for end points that modify data 
- logging out is handled on the front-end, for best practise store token on client side and  send the token to server on HTTPS to prevent sniffing 
- admin role 
  - 400 -> Unauthorized
  - 403 -> Forbidden

# Handling and Logging Errros
- handle error res with try and catch
- relocate all error res to a error middleware function (make sure its after route handler our else the response error status will not be sent)
- create try & catch as a middleware factory function returning the handler()
- ### Express Async Errors:
  - npm i express-async-errors
- ### Logging Erros:
  - npm i winston
  - Winston Logging Level:
    - error
    - warn
    - info
    - verbose
    - debug
    - silly
  - catching uncaught exceptions w/ winston
  - catching  promise rejections w/ winston 

# Refactor Code to enterprise level:

# Automated Testing => the practise of writing code to test our code and then run those tests in an automated fasion 
- production code
- test code
- ### Types of Tests:
  - Unit Test:
    - Test a unit of an app without its *external dependcies*
  - Integration Test:
    - Tests the app with its *external dependcies* 
  - End-TO-END Test:
    - Drives an app through its UI 
- ### Test Pyramid:
  - (1) E2E
  - (2) Integration
  - (3) Unit 

# Jest => npm i jest --save-dev
- change package.json script property to jest 
- With unit tests cover all execution paths 
- put related tests in a describe block
- when testing strings make sure test is not to specific 
- jest --watchAll for continous live feed

# Unit Testing
- describe()
- it()
- mock functions
- if you are using to many mock fucntions move to 
- Integration testing 

# Integration Test => npm i supertest --save-dev
- TDD => Test Driven Development - test first, then code 

# Deployment
- Platform provides infrastructure (handles servers, load balancers, reverse processes, reload on a crash)
  ### Platform Services:
  - Heroku
  - Google Cloud Platform
  - AWS
  - Azure
  
- Docker easily creates an image to your own server machine 

- ### Prepare Application for Production
  - install helmet to secure your code => npm i helmet
  - install compression, compress the http req that is sent to client => npm i compression 
- ### Heroku
  - create an account 
  - install heroku CLI
  - heroku login (login in to heroku CLI)
  - add "start": node index.js to package.json
  - add "engines": {"node": "v12.16.2"}
  - add source code to a GIT repo
  - heroku create => creates an application and GIT remote
  - git push heroku <branch>
  - #### Push changes from local branch to master 
    - git checkout master
    - git pull               # to update the state to the latest remote master state
    - git merge develop      # to bring changes to local master from your develop branch
    - git push origin master # push current HEAD to remote master branch