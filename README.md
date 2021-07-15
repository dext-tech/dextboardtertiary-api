# DextBoard Tertiary API

This is a [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer) API that accepts form-encoded request bodies, returns [JSON-encoded](https://www.json.org) responses, and uses standard HTTP response codes and verbs.

## Deployment on Windows

1. Install
   - [git](https://git-scm.com/download/win)
   - [xampp](https://www.apachefriends.org/download.html)
   - [npm](https://nodejs.org/en/download/)
2. Start xampp
3. Open xampp, start mysql server
4. Clone this repository
5. Navigate to repository in terminal
6. run `npm install` to install node packages
7. run `node .` to start server
8. find local ip address

server is running on your-ip-address:3000

## Troubleshooting

### Apache Cannot Start

If you are getting this error in xampp

![apachecannotstart1](https://www.ybierling.com/images/large/web/apachecannotstart/apachecannotstart1.png)

check out the solution [here](https://www.ybierling.com/en/blog-web-apachecannotstart)

## Usage

### Endpoints

- users
- courses
- lessons
- files

#### Examples with /users

##### Get all users

`GET /users`
Returns info about all users

example request: `fetch('https://localhost/users);`

example response:

```
[
    {
        id : 1,
        name : 'Jaylaud Johanesse',
        email: 'jay@gmail.com',
        dateRegistered : '1624782645012',
    },
    {
        id : 2,
        name : 'Emmanuel Nkrumah Sarpong',
        email: 'emmans200@gmail.com',
        dateRegistered : '1624782645012',
    },
    {
        id : 3,
        name : 'Asad Adele Adams',
        email: 'sadeldams@gmail.com',
        dateRegistered : '1624782645012',
    }
]
```

##### Get Single User By Id

`GET /users/:id` where :id is an integer
Returns info about a single user with id

example request: `fetch('https://localhost/users/3')`

example response:

```
{
   id : 3,
   name : 'Asad Adele Adams',
   email: 'sadeldams@gmail.com',
   dateRegistered : '1624782645012',
}
```

##### Create New User

`POST /users`
Creates a single user using info

Requires: a json body

example request:

```
var newUser = {
   name: 'Aziz Ambulamcee',
   email: 'aziz69@gmail.com',
}

fetch('https://localhost/users/',{
      method: 'post',
      headers: {'Content-Type: 'application/json'},
      body: JSON.stringify(newUser)
   }
).then(response => response.json())
 .then(data => {// what you want to use the response for here.})
```

[source](https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples)

example response:

```
    {
        id : 10,
        name : 'Aziz Ambulance',
        email: 'aziz69@gmail.com',
        dateRegistered : '1624782686012',
    }
```

##### Update User By Id

`PUT /users/:id` where :id is an integer
Updates the user with id `:id` with the info provided in the json body

Requires: a json body

example request:

```
   var currentUserInfo = {
      name: 'Aziz Ambulade',
      email: 'izzay@gmail.com'
   }

   fetch('https://localhost/users/10', {
      method: 'put',
      headers: {'Content-Type: 'application/json'},
      body: JSON.stringify(newUser)
   })
   .then(response => response.json())
   .then(data => {// what you want to use the json data response for here.})

```

[source](https://jasonwatmore.com/post/2020/11/02/react-fetch-http-put-request-examples)

example response:

```
    {
        id : 10,
        name : 'Aziz Ambulance',
        email: 'aziz69@gmail.com',
        dateRegistered : '1624782686012',
    }
```
