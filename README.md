# Apex Legends Weapon Library

This is a collab between [justinpjtate1](https://github.com/justinpjtate1), [AZ-LCA](https://github.com/AZ-LCA) and [nonisaurus](https://github.com/nonisaurus) to create a full stack web application.
Please find the deployed version of our project [here](https://apex-legends-app.netlify.app).

<br>

## Technology used
- [`React.js`](https://reactjs.org/)
- [`React Bootstrap`](https://react-bootstrap.github.io/)
- [`netlify`](https://www.netlify.com/)
- [`MongoDB`](https://mongodb.com/)
    - `Mongoose`
- [`NodeJs`](https://nodejs.org/en/)
    - `CORS`
    - `passport-jwt`
- [`npm`](https://www.npmjs.com/)
    - [`multer`](https://www.npmjs.com/package/multer)
    - [`compress-images`](https://www.npmjs.com/package/compress-images)
- [`base64`](https://www.base64decode.org/)

<br>

## Our Goal
* create full CRUD on at least one model
* create a database
* authenticate user
* add/remove items to user's list
* give users the opportunity to chat 
* allow users to view item info on click
* navigate between pages using react router
* deployed project


<br>

## User Stories
***
As a user, I should be able to:
- [x] be welcomed by a page that tells me what it is about
- [x] make an account
- [x] log into my account
- [x] view weapons from Apex Legends
- [x] favourite/un favourite weapons
- [x] see more details about the weapons by clicking on them
- [x] chat board to discuss ideas

<br>

# Building Process

### Wireframe

![](/wireframe/team_pickles_wireframe_2023.png)

<br>

We started the collaboration with making a clear plan on who is going to work on specific areas of the application. 

First we set up the back end together. We created our database, set up models, routes, middleware and tested everything along the way. Used a Passport strategy for authenticating with a JSON Web Token. 

Then we started working individually but consistently coordinating and continuously testing our code. We set up components and made API calls then find logic to interact (create, read, update and delete) with the database. We made use of Bootsrap so the application is responsive and sleek. 

Along these we have accomplished to upload images and made the application more secure with the help of a refresh token.

<br>

## Challenges

- The first challenge we faced was with Authentication. Although we were able to protect our routes and successfully deploy JWT tokens to local storage when the user logged in, we had the challenge of making refresh tokens to keep our routes better protected. Although we didn't encounter specific issues, it was just time-consuming to work the full process out.
- We also faced challenges with the functionality that allows the user to upload photos to their profile. Mongo isn't a good database for file storage, so we had that limitation. We used multer to handle the file upload. It converted the file to the binary form to store in Mongo, we then coverted it to a base64 string on the front end and used that in the image source. The problem was that we were finding some photos were too big for this process, so we had to compress them to enable the process to work effectively.
- We also wanted to make a comments section so users could interact with each other. We were able to display and add comments pretty easily, but struggled to get delete and update working at the same time.
- Finally, deploying to production via fly.io. This was just a case of using a new technology to us.




<br>

## Key Learning

<hr>
Justin:
- Enjoyed working in a team as I felt like we utilised each other well. I certainly felt like the other 2 took the lead on things I would have struggled with.
- In terms of coding techniques, learnt a lot about authentication, uploading and storing images as different file types
<hr>
Leon: Working with others has been good fun. I have been luckky do team coding projects before, so this was not a new experience to me. Learning about refresh tokens was a lot of fun and they were very convenient for allowing continued secure access to the webpage.
<hr>
Noni: I was very nervous about working in a group as I have never worked alongside anyone to build a project but it all faded away as we started. I did struggle with setting up my components in the right order which resolted in major errors but I managed to clear everything up and it makes complete sense now.
<hr>
 
<br>

## Future Improvements

- Minor issue where sometimes you have to click submit twice to change the profile image
- More information on the Apex Legends game
- Better process for uploading image files - possible use of cloudinary.com
- Use of Redux in the project
- Give user a message when login isn't successful
- Modify comment section so only the user can modify their comments


<br>

## Bugs
- Sometimes you have to click the submit button twice to upload the profile image
