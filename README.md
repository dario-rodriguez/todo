# Todo application backend

## Description

- Configuration by environment
- Persistence in a sqlite database
- CORS + security headers
- OpenAPI following a code first approach
- Authentication with JWT, all endpoints require aunthentication
- CRUD for todos
- The Todo entity
  - id: bigint
  - version: int
  - createdAt: string (JSON date)
  - updatedAt: string (JSON date)
  - description: text
  - priority: int
  - completed: boolean
  - userId: bigint (references to User.id)
- The parameters version, createdat and updatedAt should be excluded when we send a response to the client.
- All parameters must be validated
- An user can only read, create, update and delete its own todos
- Custom endpoint: toggle/id. It should toggle the completed status of a todo.
