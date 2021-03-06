# gamedev-connect
This website allows users to connect with others who share a common passion; game development. Users can login to create a profile outlining their academic and professional experience as well as their Github projects. Profiles are publicly available to everyone and existing users can connect with each other through comments and posts. 

### Tech Stack
This application uses the MongoDB-Express-React-Nodejs (MERN) stack. 

### Authentication & Authorization
Site-wide authentication and authorization employs the JSON Web Token standard; API endpoints on the backend related to authentication send JWTs in the response or check for them in the response headers. The frontend stores the JWT retrieved from the backend and appends it to the global headers for axios. 

### Testing
The full backend API functionality was tested using Postman. 

### Design and Styling
Individual pages of the website were designed using Figma. The website was styled using Tailwindcss, a lower level CSS framework designed to primarily provide utility classes. 

### Frontend State Management 
Redux and the Redux Thunk middleware were used for state management on the frontend. All asynchronous API requests with axios are encapsulated within the corresponding 'thunk' that is decoupled from the JSX rendering code to keep the components reusable.

### How to Start the Application
Clone the repository then run the 'dev' npm script. This starts both the backend and frontend. On the backend, it merely runs the 'server.js' file which starts the Express server. Meanwhile, on the frontend, it 1) builds tailwindcss, 2) runs chokidar to watch any css files so that we rebuild Tailwindcss, and 3) runs the React scripts generated by CRA.
