# InmoLux

## [See the App!](https://inmolux.netlify.app)


## Description

This project provides the backend for a luxury real estate application, designed to manage high-end properties, handle users and admin. The server is built with [Node.js](https://nodejs.org/), using [Express](https://expressjs.com/), and [MongoDB](https://www.mongodb.com/) as the database for data storage.

#### [Client Repo here](https://github.com/Gemma-Fernandez/inmolux-client)
#### [Server Repo here](https://github.com/Gemma-Fernandez/inmolux-server)

## Backlog Functionalities

-**User roles and permissions**: Improved access control for admin and agent roles.
- **User Registration and Authentication**: Supports clients and administrators.
- **Property Management**: Create, edit, and delete luxury properties.
- **Favorites and saved searches**: Allow users to save properties and search filters.
- **In-app messaging**: Enable communication between potential buyers and agents.
- **Security**: Includes JWT authentication and password encryption.
- **Advanced Search**: Filter properties based on user preferences.

## Technologies used
- **Node.js**: JavaScript runtime for backend development.
- **Express**: Node.js framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user and property data.
- **JWT (JSON Web Tokens)**: For user authentication.
- **BCrypt**: For password encryption.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **Postman**: API testing and documentation.

# Server Structure

## Models

User model

```javascript
 {
    email: {
      type: String,
      required: [true, 'Email required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password required.']
    },
    username: {
      type: String,
      required: [true, 'Username required.'],
      unique: true
    },
    profile_image: {
     type:String,
     required: [true, 'Image required.']
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    wishlist: [{type: Schema.Types.ObjectId, ref: 'Vivienda'}],
    
  }

```

Vivienda model

```javascript
 {
  name: { type: String, required: [true, "Name required."] },
  city: { type: String, required: [true, "City required."] },
  description: { type: String, required: [true, "Name required."] },
  property_type: { type: String, required: [true, "Property Type required."] },
  bathrooms: { type: String, required: [true, "Bathrooms required."] },
  bedrooms: { type: String, required: [true, "Bedroom required."] },
  image1: { type: String, required: [true, "Image is required"] },
  image2: { type: String },
  image3: { type: String},
  price: { type: Number, required: [true, "Price required"] },
  coordinates: [Number]
}
```
Solicitud model

```javascript
{
        vivienda: { type: Schema.Types.ObjectId, ref: 'Vivienda'},
         user: { type: Schema.Types.ObjectId, ref: 'User'},
         message: {type: String, required: [true, 'Message is required.']}
    }

## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                    |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | -------------------------------------------------------------- |
| POST        | `/auth/signup`     | {username, email, password, image}   | 201      | 400     | Registers the user in the Database                             |
| POST        | `/auth/login`               | {username, password}         | 200            | 400          | Validates credentials, creates and sends Token                 |
| GET         | `/auth/verify`              |                              | 200            | 401          | Verifies the user Token                                        |
| GET         | `/vivienda`                 |                              | 200            | 400          | Show vivienda in the DB                   |
| POST        | `/vivienda/addVivienda`      | {apiId}                      | 201            | 400          | Creates a new vivienda Document                                    |
| GET         | `/vivienda/:viviendasId`             |                  | 200            | 400, 401     | Show details of one vivienda                                         |
| PUT         | `/vivienda/:viviendasId/edit`     |                              | 200            | 400, 401     | Edits vivienda document                                            |
| DELETE      | `/vivienda/:viviendasId`             |                              | 200            | 401          | Deletes vivienda document                                          |
| GET         | `/user/profile`   `/admin/profile`      |          | 200      | 401     | Sends user profile details                                     |
| PUT         | `/user/:userId` `/admin/:adminId`                 |                              | 200            | 400, 401     | Edits the user profile                                         |
                                         |
| GET         | `/gameApi`                  |                              | 200            | 401          | Gets game data from API (Search)                               |
| GET         | `/gameApi/:apiId`           |                              | 200            | 401          | Gets game details from API                                     |
  
## Links

### Collaborators

[Malú Dietrich](https://github.com/Malu888)

[Gemma Fernández](https://github.com/Gemma-Fernandez)

### Project

[Repository Link Client](https://github.com/Gemma-Fernandez/inmolux-client)

[Repository Link Server](https://github.com/Gemma-Fernandez/inmolux-server)

[Deploy Link](https://inmolux.netlify.app)


### Slides

[Slides Link](www.your-slides-url-here.com)