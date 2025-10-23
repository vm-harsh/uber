# User Registration API

This document describes the `POST /api/user/register` endpoint in the backend.

## Endpoint

- URL: `/api/user/register`
- Method: `POST`
- Purpose: Register a new user and return the created user object and an auth cookie containing a JWT.

## Request Body (JSON)

The endpoint expects a JSON body with the following shape:

{
  "fullname": {
    "firstname": "string",  // required, min length 3
    "lastname": "string"    // optional, min length 3 if provided
  },
  "email": "string",       // required, must be a valid email
  "password": "string"     // required, min length 6
}

Validation rules and messages applied by the route:

- `fullname.firstname` - required; must be at least 3 characters long.
  - Message: "First name must be at least 3 character long"
- `email` - required; must be a valid email address.
  - Message: "Invalid Email"
- `password` - required; must be at least 6 characters long.
  - Message: "Password must be atleast 6 character long"

Note: The controller also hashes the password before saving.

## Responses

- 201 Created
  - Description: User successfully created. The response body contains the created user object (password is omitted by default). A cookie named `token` is set with the authentication token.
  - Example body:

```
HTTP/1.1 201 Created
Set-Cookie: token=<jwt>; HttpOnly
Content-Type: application/json

{
  "_id": "64a1f0b0e6d9f1a2b3c4d5e6",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "socketId": null
}
```

- 400 Bad Request
  - Description: Validation failed for the input. Response body contains an array of validation error objects from `express-validator`.
  - Example body:

```
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "message": [
    {
      "value": "Jo",
      "msg": "First name must be at least 3 character long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

- 500 Internal Server Error
  - Description: Unexpected server error (e.g., database error, hashing error). Response body contains an error message.

## Example cURL

```bash
curl -X POST http://localhost:3000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {"firstname": "Jane", "lastname": "Smith"},
    "email": "jane@example.com",
    "password": "secret123"
  }'
```

## Notes

- The `password` field is hashed before storing in the database.
- The `password` field is set with `select:false` in the Mongoose schema, so it won't appear in the returned user object.
- The JWT secret used for token generation must be provided in `process.env.JWT_SECRET`.

