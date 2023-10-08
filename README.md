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

---

### PARTY

**Create Party**

- URL : http://localhost:5000/api/v1/party

- Method: POST

- Required Token: No

- Request Body:

```json
{
  "name": "Partai Banteng Biadab"
}
```

- Response Body :

```json
{
  "code": 201,
  "data": {
    "id": 7,
    "name": "Partai Banteng Biadab",
    "created_at": "2023-10-08T11:40:25.715Z",
    "updated_at": "2023-10-08T11:40:25.715Z"
  }
}
```

**Find All Party**

- URL : http://localhost:5000/api/v1/parties

- Method: GET

- Required Token: No

- Response Body :

```json
{
  "code": 200,
  "data": [
    {
      "id": 1,
      "name": "Partai Dewa Banteng",
      "created_at": "2023-10-08T08:33:08.214Z",
      "updated_at": "2023-10-08T08:33:08.214Z"
    },
    {
      "id": 2,
      "name": "Partai Banteng Biru",
      "created_at": "2023-10-08T08:33:15.106Z",
      "updated_at": "2023-10-08T08:33:15.106Z"
    },
    {
      "id": 3,
      "name": "Partai Banteng Stres",
      "created_at": "2023-10-08T08:33:21.354Z",
      "updated_at": "2023-10-08T08:33:21.354Z"
    },
    {
      "id": 4,
      "name": "Partai Maniak Banteng",
      "created_at": "2023-10-08T08:33:29.787Z",
      "updated_at": "2023-10-08T08:33:29.787Z"
    },
    {
      "id": 5,
      "name": "Partai Iblis Banteng",
      "created_at": "2023-10-08T08:33:34.452Z",
      "updated_at": "2023-10-08T08:33:34.452Z"
    },
    {
      "id": 7,
      "name": "Partai Banteng Biadab",
      "created_at": "2023-10-08T11:40:25.715Z",
      "updated_at": "2023-10-08T11:40:25.715Z"
    }
  ]
}
```

**Find Party By Id**

- URL : http://localhost:5000/api/v1/party/1

- Method: GET

- Required Token: No

- Response Body :

```json
{
  "code": 200,
  "data": {
    "id": 1,
    "name": "Partai Dewa Banteng",
    "created_at": "2023-10-08T08:33:08.214Z",
    "updated_at": "2023-10-08T08:33:08.214Z"
  }
}
```

**Update Party By Id**

- URL : http://localhost:5000/api/v1/party/7

- Method: PUT

- Required Token: No

- Request Body:

```json
{
  "name": "Sudah Bubar"
}
```

- Response Body :

```json
{
  "code": 200,
  "data": {
    "id": 7,
    "name": "Sudah Bubar",
    "created_at": "2023-10-08T11:40:25.715Z",
    "updated_at": "2023-10-08T11:47:36.645Z"
  }
}
```

**Delete Party By Id**

- URL : http://localhost:5000/api/v1/party/7

- Method: DELETE

- Required Token: No

- Response Body :

```json
{
  "code": 200,
  "data": {}
}
```
