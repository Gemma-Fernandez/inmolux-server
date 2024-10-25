# InmoLux

## [See the App!](https://inmolux.netlify.app)


## Description

This project provides the backend for a luxury real estate application, designed to manage high-end properties, handle users and admin. The server is built with [Node.js](https://nodejs.org/), using [Express](https://expressjs.com/), and [MongoDB](https://www.mongodb.com/) as the database for data storage.

#### [Client Repo here](https://github.com/Gemma-Fernandez/inmolux-client)
#### [Server Repo here](https://github.com/Gemma-Fernandez/inmolux-server)

## Backlog Functionalities

- **User roles and permissions**: Improved access control for admin and agent roles.
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
- **Cloudinary**: Cloud-based image storage and processing service, used for optimizing and serving property images efficiently.
- **Leaflet**: Interactive mapping library used to display property locations and geospatial data on customizable maps.

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
```
## API Endpoints (backend routes)
| HTTP Method | URL                                 | Request Body                         | Success Status | Error Status | Description                                                     |
|-------------|-------------------------------------|--------------------------------------|----------------|--------------|-----------------------------------------------------------------|
| **POST**    | `/auth/signup`                      | {username, email, password, image}   | 201            | 400          | Registers the user in the database                              |
| **POST**    | `/auth/login`                       | {username, password}                | 200            | 400          | Validates credentials, creates, and sends token                 |
| **GET**     | `/auth/verify`                      |                                      | 200            | 401          | Verifies the user token                                         |
| **GET**     | `/vivienda`                         |                                      | 200            | 400          | Shows all vivienda documents in the database                    |
| **POST**    | `/vivienda/addVivienda`             | {apiId}                              | 201            | 400          | Creates a new vivienda document                                 |
| **GET**     | `/vivienda/:viviendasId`            |                                      | 200            | 400, 401     | Shows details of a specific vivienda                            |
| **PUT**     | `/vivienda/:viviendasId/edit`       | {fields to update}                   | 200            | 400, 401     | Edits vivienda document                                         |
| **DELETE**  | `/vivienda/:viviendasId`            |                                      | 200            | 401          | Deletes a vivienda document                                     |
| **GET**     | `/user/profile` or `/admin/profile` |                                      | 200            | 401          | Retrieves user or admin profile details                         |
| **PUT**     | `/user/:userId` or `/admin/:adminId`| {fields to update}                   | 200            | 400, 401     | Edits the user or admin profile                                 |
| **PATCH**   | `/profile/email` or `/profile/username` | {new email or username}          | 200            | 401          | Edits email and username of user or admin                       |
| **POST**    | `/profile/wishlist`                 | {viviendaId}                         | 200            | 401          | Adds a vivienda to the wishlist of favorites                    |
| **DELETE**  | `/profile/wishlist/:viviendasId`    |                                      | 200            | 401          | Removes a vivienda from the wishlist of favorites               |
| **GET**     | `/solicitudes`                      |                                      | 200            | 400, 401     | Retrieves all solicitudes for a user                            |
| **POST**    | `/solicitudes`                      | {solicitud details}                  | 200            | 401          | Adds a new solicitud                                            |
| **DELETE**  | `/solicitudes/:solicitudId`         |                                      | 200            | 401          | Deletes a specific solicitud                                    |
| **GET**     | `/solicitudes/admin`                |                                      | 200            | 401          | Shows all solicitudes for admin review                          |

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