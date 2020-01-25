---
title:  "Restful API Authentication App"
excerpt: ""
toc: true
toc_sticky: true
# toc_label: "페이지 주요 목차"

categories:
  - Development
tags:
  - Development
  - JavaScript
  - Node.js
  - API
last_modified_at: 2019-04-13T08:06:00-05:00

header:
  overlay_image: /assets/images/headerLogo2.jpg
  overlay_filter: 0.3 # same as adding an opacity of 0.5 to a black background
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  #actions:
  #  - label: "More Info"
  #    url: "https://unsplash.com"
---

# Restful API Authentication App

## Used Packages, Libraris, Dependencies and Database in the project.
- Node.js
- Express.js: Node.js package
- nodemon: To restart server
- Mongoose: DB package
- MongoDB: To save user data
- bcryptjs: Encrypt the user's password so that 3rd party don't see
- dotenv: Configuration private setting data
- @hapi/joi: To validate user input form data

## Make sure

<p>Make sure that node.js must be installed in your computer. </p>
<p>Make sure that you must have your own mongoDB cluster.</p>
<p>Make sure that postman which is used to requset get or post method with data to server should be installed.</p>

## Usage

1. clone the repository.
2. Inside .env file, Replace <password> with your mongoDB account password.
3. Open the terminal.
4. Start Server by typing 'npm start' or 'npm run dev' in the terminal (Make sure that except for quotation mark in the terminal).
5. Open the postman
6. Try to send 'POST' request with JSON data(below 6) format with URL - http://localhost:5000/api/user/register
7. Try with Example JSON data => { "name": "lemidia", "email": "poiu2186@gmail.com", "password":"own password" }
8. Once you have done this, Try to send 'POST' request with JSON data(below 7) format with URL - http://localhost:5000/api/user/login
9. Try with Example JSON data => { "poiu2186@gmail.com", "password":"<own passowrd" }

## Repository 

[Github - lemidia](https://github.com/lemidia/Rest-ful-API-Authentication)