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
  "code": 200,
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

---

### PASLON

**Create Paslon**

- URL : http://localhost:5000/api/v1/paslon

- Method: POST

- Required Token: No

- Request Body:

  Form Data:

  - name: Johnny G Plate
  - vision: Menjadi Menteri Yang Berhasil Menghubungkan Internet Di Seluruh Polandia.
  - party: [4]
  - image: File(1.png)

- Response Body :

```json
{
  "code": 201,
  "data": {
    "id": 6,
    "name": "Johnny G Plate",
    "vision": "Menjadi Menteri Yang Berhasil Menghubungkan Internet Di Seluruh Polandia.",
    "image": "https://res.cloudinary.com/dogz0yvva/image/upload/v1696766288/paslon/yugtfkmev3hcvgjfhm81.png",
    "created_at": "2023-10-08T11:53:53.129Z",
    "updated_at": "2023-10-08T11:53:53.129Z",
    "party": [
      {
        "id": 4,
        "name": "Partai Maniak Banteng"
      }
    ]
  }
}
```

**Find All Paslon**

- URL : http://localhost:5000/api/v1/paslons

- Method: GET

- Required Token: No

- Response Body :

```json
{
  "code": 200,
  "data": [
    {
      "id": 3,
      "name": "Fer D Sambo",
      "vision": "Menjadi Polisi Nomor 1 Di WakandaNesia.",
      "image": "https://res.cloudinary.com/dogz0yvva/image/upload/v1696565889/paslon/ipxqomf8gatvbbmkkp2r.png",
      "created_at": "2023-10-08T08:41:58.597Z",
      "updated_at": "2023-10-08T08:41:58.597Z",
      "parties": [
        {
          "id": 1,
          "name": "Partai Dewa Banteng",
          "paslon_id": 3
        }
      ],
      "votes": [
        {
          "id": 2,
          "voter_name": "Andry Pebrianto",
          "created_at": "2023-10-08T08:50:15.127Z",
          "updated_at": "2023-10-08T08:50:15.127Z",
          "paslon_id": 3
        }
      ]
    },
    {
      "id": 5,
      "name": "Mega Foo An",
      "vision": "Menjadi Wakil Rakyat Paling Dicintai Di KonohaNesia",
      "image": "https://res.cloudinary.com/dogz0yvva/image/upload/v1696573928/paslon/tuyazzpqwwfxuknhickg.png",
      "created_at": "2023-10-08T08:46:05.026Z",
      "updated_at": "2023-10-08T08:46:05.026Z",
      "parties": [
        {
          "id": 2,
          "name": "Partai Banteng Biru",
          "paslon_id": 5
        },
        {
          "id": 3,
          "name": "Partai Banteng Stres",
          "paslon_id": 5
        }
      ],
      "votes": []
    },
    {
      "id": 6,
      "name": "Johnny G Plate",
      "vision": "Menjadi Menteri Yang Berhasil Menghubungkan Internet Di Seluruh Polandia.",
      "image": "https://res.cloudinary.com/dogz0yvva/image/upload/v1696766288/paslon/yugtfkmev3hcvgjfhm81.png",
      "created_at": "2023-10-08T11:53:53.129Z",
      "updated_at": "2023-10-08T11:53:53.129Z",
      "parties": [
        {
          "id": 4,
          "name": "Partai Maniak Banteng",
          "paslon_id": 6
        }
      ],
      "votes": []
    }
  ]
}
```

**Find Paslon By Id**

- URL : http://localhost:5000/api/v1/paslon/3

- Method: GET

- Required Token: No

- Response Body :

```json
{
  "code": 200,
  "data": {
    "id": 3,
    "name": "Fer D Sambo",
    "vision": "Menjadi Polisi Nomor 1 Di WakandaNesia.",
    "image": "https://res.cloudinary.com/dogz0yvva/image/upload/v1696565889/paslon/ipxqomf8gatvbbmkkp2r.png",
    "created_at": "2023-10-08T08:41:58.597Z",
    "updated_at": "2023-10-08T08:41:58.597Z",
    "parties": [
      {
        "id": 1,
        "name": "Partai Dewa Banteng"
      }
    ]
  }
}
```

**Update Paslon By Id**

- URL : http://localhost:5000/api/v1/party/6

- Method: PUT

- Required Token: No

- Request Body:

  Form Data:

  - name: Johnny G Plate (Update)
  - vision: Menjadi Menteri Yang Berhasil Menghubungkan Internet Di Seluruh Polandia. (Update)
  - image: File(2.png)

- Response Body :

```json
{
  "code": 200,
  "data": {
    "id": 6,
    "name": "Johnny G Plate (Update)",
    "vision": "Menjadi Menteri Yang Berhasil Menghubungkan Internet Di Seluruh Polandia. (Update)",
    "image": "https://res.cloudinary.com/dogz0yvva/image/upload/v1696565889/paslon/ipxqomf8gatvbbmkkp2r.png",
    "created_at": "2023-10-08T11:53:53.129Z",
    "updated_at": "2023-10-08T12:06:25.898Z",
    "parties": [
      {
        "id": 4,
        "name": "Partai Maniak Banteng"
      }
    ]
  }
}
```

**Delete Paslon By Id**

- URL : http://localhost:5000/api/v1/paslon/6

- Method: DELETE

- Required Token: No

- Response Body :

```json
{
  "code": 200,
  "data": {}
}
```

---

### VOTE

**Create Vote**

- URL : http://localhost:5000/api/v1/vote

- Method: POST

- Required Token: Yes

- Request Body:

```json
{
  "paslonId": 5
}
```

- Response Body :

```json
{
  "code": 201,
  "data": {
    "id": 4,
    "voter_name": "Adi Chahyionio",
    "paslon": {
      "id": 5,
      "name": "Mega Foo An",
      "vision": "Menjadi Wakil Rakyat Paling Dicintai Di KonohaNesia"
    }
  }
}
```

**Find All Vote**

- URL : http://localhost:5000/api/v1/votes

- Method: GET

- Required Token: No

- Response Body :

```json
{
  "code": 200,
  "data": [
    {
      "id": 2,
      "createdAt": "2023-10-08T08:50:15.127Z",
      "updatedAt": "2023-10-08T08:50:15.127Z",
      "paslon": {
        "id": 3,
        "name": "Fer D Sambo",
        "vision": "Menjadi Polisi Nomor 1 Di WakandaNesia.",
        "image": "https://mardizu.co.id/assets/images/client/default.png",
        "createdAt": "2023-10-08T08:41:58.597Z",
        "updatedAt": "2023-10-08T08:41:58.597Z"
      },
      "user": {
        "id": 5,
        "full_name": "Andry Pebrianto",
        "email": "andry12345@gmail.com"
      }
    },
    {
      "id": 4,
      "createdAt": "2023-10-08T12:32:58.210Z",
      "updatedAt": "2023-10-08T12:32:58.210Z",
      "paslon": {
        "id": 5,
        "name": "Mega Foo An",
        "vision": "Menjadi Wakil Rakyat Paling Dicintai Di KonohaNesia",
        "image": "https://mardizu.co.id/assets/images/client/default.png",
        "createdAt": "2023-10-08T08:46:05.026Z",
        "updatedAt": "2023-10-08T08:46:05.026Z"
      },
      "user": {
        "id": 8,
        "full_name": "Adi Chahyionio",
        "email": "adichah123@gmail.com"
      }
    }
  ]
}
```
