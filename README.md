# Social-Network-API

[![MIT license](https://img.shields.io/badge/License-MIT-blueviolet.svg)](https://choosealicense.com/licenses/mit/)

## Table of Contents 
- [Description](#description)
- [User Story](#user-story)
- [Acceptance Criteria](#user-story)
- [Installation](#Acceptance-Criteria)
- [Usage](#usage)
- [ScreenShots](#screenshots)
- [Features](#features)
- [Contribution](#contribution)
- [Test](#test)
- [Questions](#questions)


## Description
This project uses MonogoDB, Mongoose.js, and Express.js. This server is an backend API used for socializing with other people by create thoughts and reactions to posts. For the server it uses mongoDB for data storage instead of SQL and it uses mongoose to set up the models.

## User Story
AS A social media startup</br>
I WANT an API for my social network that uses a NoSQL database</br>
SO THAT my website can handle large amounts of unstructured data</br>

## Acceptance Criteria
GIVEN a social network API</br>
WHEN I enter the command to invoke the application</br>
THEN my server is started and the Mongoose models are synced to the MongoDB database</br>
WHEN I open API GET routes in Insomnia for users and thoughts</br>
THEN the data for each of these routes is displayed in a formatted JSON</br>
WHEN I test API POST, PUT, and DELETE routes in Insomnia</br>
THEN I am able to successfully create, update, and delete users and thoughts in my database</br>
WHEN I test API POST and DELETE routes in Insomnia</br>
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list</br>


## Installation
npm i 

## Usage 
When you save this project on your machine. Use command `npm i` in the terminal to download all the packages required to run and grab the DB from mongo.</br>
For the user you have 4 different routes. A GET, POST, PUT, and DELETE route. For thoughts you also have 4 different routes GET, POST, PUT, and DELETE. For reactions there are only two routes a POST and DELETE. Finally there are two routes for friends, there is a POST and DELETE route.

 * Thoughts Route: http://localhost:3001/api/thoughts
 * User Route: http://localhost:3001/api/users 
 * Friend Route: http://localhost:3001/api/users/:userId
 * Reaction Route: http://localhost:3001/api/thoughts/:thoughtId/reactions

## ScreenShots
GET Route Example 
![ ScreenShot](./assets/GET%20Thoughts.PNG)
![ ScreenShot](./assets/Get%20a%20single%20thought.PNG)
POST Route Example 
![ ScreenShot](./assets/Create%20Thought.PNG)
UPDATE Route Example
![ ScreenShot](./assets/Update%20Thought.PNG)
DELETE Route Example
![ ScreenShot](./assets/Delete%20Thought.PNG)


## Features
no features

## Contribution
No need to contribute 

## Test 
no testing 

## License
 This application is covered under MIT. Click on the badge for information about the license


## Questions 
* https://github.com/Jonnvoo 
* Jonathanvu2065@gmail.com
