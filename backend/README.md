# Auth endpoints (concise)

This file documents two auth endpoints: register and login.

---

## POST /api/user/register

Purpose: Create a user, set auth cookie `token`, and return the user (password excluded).

Request JSON:

{
  "fullname": { "firstname": "string", "lastname": "string" },
  "email": "string",
  "password": "string"
}

Validation (route messages):
- `fullname.firstname`: required, min 3 — "First name must be at least 3 character long"
- `email`: valid email — "Invalid Email"
- `password`: min 6 — "Password must be atleast 6 character long"

Responses:
- 201 Created: user created, `Set-Cookie: token=<jwt>`; body: user object (no password).
- 400 Bad Request: validation errors — body: { message: [ ...errors ] }
- 500 Internal Server Error: unexpected error.

Quick example (success):

{
  "_id": "64a1f0...",
  "fullname": { "firstname": "Jane", "lastname": "Smith" },
  "email": "jane@example.com",
  "socketId": null
}

---

## POST /api/user/login

Purpose: Authenticate user, set `token` cookie, and return the user (password excluded).

Request JSON:

{
  "email": "string",
  "password": "string"
}

Validation (route messages):
- `email`: valid email — "Invalid Email"
- `password`: min 6 — "Password must be atleast 6 character long"

Responses:
- 200 OK: auth successful, `Set-Cookie: token=<jwt>`; body: user object (no password).
- 400 Bad Request: validation errors — body: { message: [ ...errors ] }
- 401 Unauthorized: invalid credentials — { message: "Invalid Email or Password" }
- 500 Internal Server Error: unexpected error.

Quick example (failure - invalid credentials):

{ "message": "Invalid Email or Password" }

---

Notes:
- Passwords are hashed before saving. Mongoose schema sets `password.select=false`, so responses omit it.
- Ensure `process.env.JWT_SECRET` is set for token generation.

---

## Login Endpoint

- URL: `/api/user/login`
- Method: `POST`
- Purpose: Authenticate an existing user. On success, sets a `token` cookie with a JWT and returns the user object (password omitted).

### Request Body (JSON)

The endpoint expects a JSON body with the following shape:

{
  "email": "string",     // required, must be a valid email
  "password": "string"   // required, min length 6
}

Validation rules and messages applied by the route:

- `email` - required; must be a valid email address.
  - Message: "Invalid Email"
- `password` - required; must be at least 6 characters long.
  - Message: "Password must be atleast 6 character long"

### Responses

- 200 OK
  - Description: Authentication successful. Returns the user object (password omitted) and sets a `token` cookie.
  - Example body:

```
HTTP/1.1 200 OK
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

- 401 Unauthorized
  - Description: Invalid credentials (email not found or password mismatch).
  - Example body:

```
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "message": "Invalid Email or Password"
}
```

- 500 Internal Server Error
  - Description: Unexpected server error (e.g., database error). Response body contains an error message.

### Example cURL

```bash
curl -X POST http://localhost:3000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "secret123"
  }'
```

---

## GET /api/user/profile

Purpose: Return the authenticated user's profile.

Auth: Required. The route reads JWT from cookie `token` or `Authorization: Bearer <token>` header.

Responses:
- 200 OK: returns user object (no password).
- 401 Unauthorized: missing/invalid/blacklisted token — { message: "Unauthorized" }
- 500 Internal Server Error: unexpected error.

Quick example (success):

{
  "_id": "64a1f0...",
  "fullname": { 
    "firstname": "Jane",
     "lastname": "Smith" }
     ,
  "email": "jane@example.com",
  "socketId": null
}

---

## GET /api/user/logout

Purpose: Log the user out by clearing the `token` cookie and blacklisting the token.

Auth: Required.

Responses:
- 200 OK: { message: "Logged out successfully" }
- 401 Unauthorized: missing/invalid/blacklisted token — { message: "Unauthorized" }
- 500 Internal Server Error: unexpected error.

Notes:
- The logout route clears the `token` cookie and saves the token in a blacklist collection to prevent reuse until it expires.


