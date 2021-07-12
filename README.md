# Engage-Microsoft-Teams

## Microsoft Teams Clone

Implementation of Microsoft Teams clone web app in which two participants are able to connect with each other to have a video conversation. The app includes features like in-call chat messages, screen sharing, toggling of video/audio stream, view and send messages, start the conversation before the meeting, continue the conversation after the meeting, Firebase Authentication using google account.

#### App Link- https://engage-ms-teams.herokuapp.com/

## Features and Functionalities
* One to one video calling
* Toggling of video stream (Hide & unhide video)
* Toggling of audio stream (mute & unmute)
* Screen sharing
* Meet-link sharing option
* In-call chat messages
* Pin participants' stream
* Adapt stage Chat feature
    - View & Send messages
    - Continue the conversation after the meeting
    - Start the conversation before the meeting
* Firebase Authentication using google account

## Screenshots

### Login Page
![login page](https://user-images.githubusercontent.com/64857584/125251529-0a350f80-e315-11eb-8618-a301c183b47e.png)

### Chat's Feed
![chat's feed](https://user-images.githubusercontent.com/64857584/125251763-49fbf700-e315-11eb-9656-7ebcfe078d2f.png)

### VideoCall- Create Room 
![video room create](https://user-images.githubusercontent.com/64857584/125252009-8891b180-e315-11eb-97e0-1a4758f85868.png)

### Meet-link Share option
![vc](https://user-images.githubusercontent.com/64857584/125253351-f12d5e00-e316-11eb-97c7-006d408b18c4.png)

### Join a VideoCall
![video room create](https://user-images.githubusercontent.com/64857584/125252256-c55da880-e315-11eb-945a-8cf50f60f686.png)

### Video Conversation
![vc](https://user-images.githubusercontent.com/64857584/125252541-1d94aa80-e316-11eb-915c-e6c2ca76d990.png)

### In-call Chat messages
![vc](https://user-images.githubusercontent.com/64857584/125252810-677d9080-e316-11eb-84a4-c192ecb5376d.png)

### Screen-Sharing
![vc](https://user-images.githubusercontent.com/64857584/125253037-9ac01f80-e316-11eb-828f-bccf24c50ac9.png)


## How to run the app

* Client side
    - cd ClientChatFeature
    - npm start 
* Server side
    - cd MicrosoftTeams
    - nodemon app.js 

## Tech Stack
* WebRTC 
* Node.js
* Socket.io
* Chat engine
* React.js
* Firebase (for authentication)
* Heroku (Hosting)

