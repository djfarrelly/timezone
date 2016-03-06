# Timezone

Timezone is an application aimed at helping remote teams by making it
easier to see where and **when** their coworkers are. This is the stripped
down open source version of **[Timezone.io](http://timezone.io)** which
you can sign up for if you'd rather not self-host and take advantage of
newer features!

![Screenshot](https://dl.dropboxusercontent.com/u/50627698/timezone-github.png)

# Setup

Clone this repo and add a `people.json` file in the repo's root directory.

Each person can have the following data values:

* Personal Details
  * **name**: The person's display name *MANDATORY*
  * **avatar**: A url to the person's image *OPTIONAL*
  * **city**: The person's city name *OPTIONAL*
  * **tz**: Timezone codes for the `tz` field can be found [here](http://momentjs.com/timezone/). *MANDATORY*

**Note:** In each timezone, the city with the most number of people is used for the column name, unless TZ display is selected.  See **Configuration** below.

Each person object should have data in the following format:

```json
[
  {
    "name": "Dan",
    "avatar": "https://d389zggrogs7qo.cloudfront.net/images/team/dan.jpg",
    "city": "NYC",
    "tz": "America/New_York"
  },
  {
    "name": "Niel",
    "avatar": "https://d389zggrogs7qo.cloudfront.net/images/team/niel.jpg",
    "city": "Cape Town",
    "tz": "Africa/Johannesburg"
  }
]
```
# Configuration

By default, in each timezone, the city with the most number of people
is used for the column name.  This can be overridden by setting the
environment variable, `USE_TZ=1`.

# Deploy

This project is designed with a Procfile to deploy to a Heroku instance. Please
check with Heroku's up to date documentation for any latest changes. You should
be able to commit your changes in your forked repo (including adding your own
people.json file) then run:

```bash
  $ heroku create
  $ git push heroku master
```


# Development

You must have [Node.js](http://nodejs.org/) and [Browserify](http://browserify.org/)
installed on your system to compile the project assets. After install Node.js, run:

```bash
  $ npm install -g browserify
```

To run the server and download all dependencies for the project run this in the
project root directory:

```bash
  $ npm install
```

`bundle.js` contains all of the necessary scripts and data for the client.
To re-build this file with Browserify run:

```bash
  $ npm run build
```

Now to start the server on localhost:3000 you can run:

```bash
  $ node ./index.js
```

**Note:** These docs are very basic and need some more love. I'll add more info
soon  :)
