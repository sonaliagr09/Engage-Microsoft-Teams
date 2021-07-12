# Engage-Microsoft-Teams

![Untitled presentation (3)](https://user-images.githubusercontent.com/64857584/125316253-9404cd00-e355-11eb-8722-2a897b2a878b.png)

## Microsoft Teams Clone

Implementation of Microsoft Teams clone web app in which multiple participants are able to connect with each other to have a video conversation as well as chat conversation. The app includes features like in-call chat messages, screen sharing, toggling of video/audio stream, view and send messages, start the conversation before the meeting, continue the conversation after the meeting, Firebase Authentication using google account.

#### App Link- https://engage-ms-teams.herokuapp.com/

###### Important- The video call function may show security reasons and not open in some browsers as the camera/audio permissions are blocked. So, please try a different browser or click on the link below to directly join a videocall room.
https://engage-ms-teams-videocall.herokuapp.com/?room=testvc_1670216324

## Features and Functionalities
* One to many participants video calling (Ideal for 2 participants)
* Toggling of video stream (Hide & unhide video)
* Toggling of audio stream (mute & unmute)
* Screen sharing
* Meet-link sharing option
* In-call chat messages
* Pin participants' stream
* Adapt stage-Chat feature
    - Create Chat rooms, add users into it
    - Delete chat rooms
    - View & Send messages, attachments, photos
    - Continue the conversation after the meeting
    - Start the conversation before the meeting
    - Visibility of Online/Offline status of users
    - Avatar taken while signing up using google
    - See typing status of users in chat room
    - Chat gets stored and users can come back to it
    - Logout option
* Firebase Authentication using google account
* Chat Notification 

## How to run the app

* On terminal 1-Client side
    - ```cd ClientChatFeature ```
    - ```npm install```
    - ```npm start``` 
* On terminal 2-Server side
    - ```cd MicrosoftTeams```
    - ```npm init```
    - ```npm install express ejs socket.io uuid peer```
    - ```npm install -g nodemon```
    - ```nodemon app.js```

## Tech Stack used
* WebRTC 
* Node.js
* Socket.io
* Chat engine
* React.js
* Firebase (for authentication)
* Heroku (Hosting)

## Implementation of Agile Methodology

As the theme of this year’s engage program says “Intelligence is the ability to adapt to change” and so follows the agile methodology. So, I have implemented an agile methodology while building this app also. As agile methodology welcomes changes and new features that we can add to the existing product, I have implemented the chat feature using agile. Also, as i am taking the data of the users during login, the app can adopt to several other features that can make use of the data and the firebase authentication can also be extended to other platforms making it agile.

## Screenshots

### Login Page- First, we get to the login page of the app and we can signup using google account here.
![login page](https://user-images.githubusercontent.com/64857584/125251529-0a350f80-e315-11eb-8618-a301c183b47e.png)

### Chat's Feed- Now, we enter the chat's feed after logging in to the app, here we can create rooms, send or receive messages from other participants, share multimedia, delete chat rooms, see other users typing status, online/offline status, avatar etc. On the top right corner if we click, we go to video call option.
![chat's feed](https://user-images.githubusercontent.com/64857584/125251763-49fbf700-e315-11eb-9656-7ebcfe078d2f.png)

### VideoCall- Create Room- Now, here we can create a room for video calling. 
![video room create](https://user-images.githubusercontent.com/64857584/125252009-8891b180-e315-11eb-97e0-1a4758f85868.png)

### Meet-link Share option- After entering the room, we can share the link with other participants in the chat room and ask them to join the meeting.
![vc](https://user-images.githubusercontent.com/64857584/125316838-1c836d80-e356-11eb-9bb2-65e4b1a807b4.png)

### Join a VideoCall- Other users joining the video call using the link.
![video room create](https://user-images.githubusercontent.com/64857584/125252256-c55da880-e315-11eb-945a-8cf50f60f686.png)

### Video Conversation
![vc](https://user-images.githubusercontent.com/64857584/125252541-1d94aa80-e316-11eb-915c-e6c2ca76d990.png)

### In-call Chat messages
![vc](https://user-images.githubusercontent.com/64857584/125331776-0ed5e400-e366-11eb-82b9-1f1922d13cb3.png)

### Screen-Sharing
![vc](https://user-images.githubusercontent.com/64857584/125253037-9ac01f80-e316-11eb-828f-bccf24c50ac9.png)


