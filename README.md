# DOCUMENTATION

### AUTH

**Register**

- URL : http://localhost:5000/api/v1/auth/register

- Method: POST

- Required Token: No

- Request Body:

```json
{
  "fullName": "Adi Chahyionio",
  "email": "adichah123@gmail.com",
  "password": "12345678"
}
```

- Response Body :

```json
{
  "code": 201,
  "data": {
    "full_name": "Adi Chahyionio",
    "email": "adichah123@gmail.com",
    "id": 8
  }
}
```

---

**Login**

- URL : http://localhost:5000/api/v1/auth/login

- Method: POST

- Required Token: No

- Request Body:

```json
{
  "email": "adichah123@gmail.com",
  "password": "12345678"
}
```

- Response Body :

```json
{
  "code": 200,
  "data": {
    "id": 8,
    "full_name": "Adi Chahyionio",
    "email": "adichah123@gmail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmdWxsX25hbWUiOiJBZGkgQ2hhaHlpb25pbyIsImVtYWlsIjoiYWRpY2hhaDEyM0BnbWFpbC5jb20ifSwiaWF0IjoxNjk2NzU4ODc0LCJleHAiOjE2OTY3NjI0NzR9.uUcZQineUzjHyX13fawqZgfqGf7HEQ_Kw4u8Fqas4pU"
}
```

---

**Check JWT Token**

- URL : http://localhost:5000/api/v1/auth/check

- Method: GET

- Required Token: Yes

- Response Body :

```json
{
  "code": 201,
  "message": "Token is valid!"
}
```
