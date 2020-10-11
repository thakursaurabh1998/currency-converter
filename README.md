# Currency Converter App

I have created the application as it was explained in the email. It was really fun and I learnt some new things too.
I tried to create the best possible architecture and kept the project modular. I also used the best coding practices upto full extent.

## Good design decisions

-   Graceful Shutdown
-   External services are used such that changing the service provider is really easy and abstracted outside of the main logic.
-   Request schema validation is done using Joi.

## Tech Stack

1. **NodeJS** - JavaScript engine for running back end JS code
1. **ExpressJS** - Web Framework used to create API
1. **React** - JavaScript library for building UI
1. **Heroku** - For hosting the application

## Production environment setup

-   The API is deployed on Heroku. It doesn't uses Heroku's normal application builds, rather I have used Heroku Container Registry where I have deployed my custom container.
-   Docker is used for containerization. I have used custom Dockerfile which uses node to run the application.
-   For high scalability container images can be deployed directly with Kubernetes.

## Environment variables

-   `.env` file is used to set environment variables. `env` file is passed when starting the docker container using the flag `--env-file`.
-   `.env` example is given in the [.env.example](./.env.example) file

## Development tools

-   **VS-Code** - All the development was done in Visual Studio Code
-   **git** - git is used for version control
-   **eslint** - It helps in keeping the code semantic and unifies the coding style all over the project.
-   **prettier** - Code formatter, keeps the code format unique across the codebase.

## Possible improvements
