# Community IoT Device (CIoTD)



## 📦 Introduction
CIoTD (Collaborative IoT Device) is an innovative and collaborative platform designed to efficiently access and share data from a variety of IoT devices.

CIoTD simplifies and facilitates the exchange of data between IoT devices and their users. This creates an environment that is conducive to the advancement of technology and the emergence of new opportunities in various industries.

The CIoTD represents a significant step toward a more connected and collaborative future, where the data collected by IoT devices is made easily accessible to drive innovation and progress.


## ✒️ About
PredictWeather offers customers several benefits, including the ability to make more informed and strategic decisions about their farming operations. This includes decisions related to planting, irrigation, crop management, and preparation for adverse weather events.

With detailed information on the intensity of rainfall, farmers can optimize the use of resources such as water and fertilizer, reduce waste and operating costs, and mitigate the risks associated with extreme weather events.

IoT sensor data contributes to decision-making in the agricultural industry with a range of benefits that can significantly improve the efficiency, productivity, and resilience of customers in the agricultural sector.


## 🕸️ API Requirements:

The API provides methods to retrieve the current amount of rain that is measured by any of the sensors that are registered on the PredictWeather platform.


## 🚀 Getting Started

The following steps are required for testing and execution of project scripts from the command line


## 📋 Prerequisites

This project requires Node v20.x (LTS) and access to the Internet to download the packages needed to run the project.


⬇️ Download Node

> Binaries, installers, and source tarballs are available at https://nodejs.org/en/download/.

🐑 Clone repository locally

```sh
$ git clone https://github.com/mcneillbr/system_predict_weather.git
```

To install the packages to run the API use npm.

```sh
$ cd system_predict_weather

$ cp .env.example .env

$ npm install
```

## ⚡ Quick start

Configuring the root user in the environment file to enable creating users and devices in the system.

### ✨ Development

For easier developing you can launch the server with command:

```sh
$ npm run start
```

### 🛠️ Building

To build the project use the command:

```sh
$ npm run build
```

### 🏃‍♂️ Running 

```sh
$ npm run start:prod
```

---


## 📚 API Documentation

An Application Programming Interface (API) defines the allowed interactions between two pieces of software, just like a User Interface defines the ways in which a user can interact with a program.

### ⚙️ Open Endpoints

######  Open endpoints require no Authentication.

---

### 🔨 Endpoints

#### Auth Login

> Sing in user on system and get JWT token
>
> **URL** : /api/auth/login
>
> **Method** : `POST  `
>
> **Parameters** : None
>
> **Body** : 
```json
{
    "userName": "name", 
    "password": "pass"
}
```
>
> **Auth required** : NO

**Data example**

```json
{
    "access_token": "JWT_TOKEN"
}
```

### Success Response

**Code** : `200 OK`

### Sample request

```sh
$ curl --location 'http://localhost:3000/api/auth/login' \
--header 'Content-Type: application/json' \
--data '{
    "userName": "name", 
    "password": "pass"
}'
```


---


### ⚙️ Endpoints with Access Token

Send a valid Access Token in the Authorization header, using the Bearer authentication scheme.

######  Endpoints require Authentication.

#### Get the movie award interval
> Get user profile

> **URL** : /api/auth/profile
>
> **Method** : `GET`
>
> **Parameters** : None
>
> **Auth required** : YES

**Data example**

```json
{
    "sub": "66132a99f1d5421b90cb7803",
    "username": "admin1",
    "role": "admin",
    "iat": 1712532126,
    "exp": 1713136926
}
```

### Success Response

**Code** : `200 OK`

### Sample request

```sh
$ curl --location 'http://localhost:3000/api/auth/profile' \
--header 'Authorization: Bearer token'
```

### Unauthorized Response

**Code** : `401`

### Sample data

```json
{
  "statusCode":401,
  "message": "Unauthorized"
}
```


---


### Full documentation in yml format

[OpenAPI Documentation](./docs/api_specification.yml)


## 📃 License

Distributed under the MIT license
