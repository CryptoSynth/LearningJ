# Notes:
- POST => Create data to client (Create)
- GET => Read data from client (Read)
- PUT => Update resources (Update)
- DELETE => Delete resources (Delete)

# Express Setup
- Module Imports
  - debug => npm i debug
  - config => npm i config 
  - helmet => npm i helmet
  - morgan => npm i morgan
  - Joi => npm i Joi
  - express => npm i express
  - mongoose => npm i mongoose (Database)
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
  - 
- ### Update Document (Update First):
  - Update directly
  - Optionally: get the updated document 

- ### Remove Document 