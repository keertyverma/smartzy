# Smartzy
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/ec7eae11accc54bfd29d)

Smart Home Automation system to remotely control devices at home

## Current stack

- **Backend:** NodeJS v12, ExpressJS v4
- **Frontend:** ReactJS v16
- **Db:** MongoDB v4.2

## Current Scenarios

1. Exposed a set of RESTful APIs to control the smart devices remotely, [documented with postman](https://documenter.getpostman.com/view/5352730/Szt5fr7f?version=latest#c4d47328-036b-4668-ab82-8c1e6c237822)
   1. List all smart devices
   2. Add new smart device
   3. Perform an operation on a device
   4. Remove an installed device
2. Built a web console through which one can control and manage the entire system.
3. To talk to devices we mimic it and just log the action it performed.

## Running locally

1. Ensure that you have installed all the dependencies by running the following commands in the root of folder:

   ```bash
   npm install

   cd ui && npm install
   cd ..
   ```

2. Start a MongoDB instance. This can be done by running the [official Docker image of MongoDB](https://hub.docker.com/_/mongo).

   ```bash
   mkdir -p ~/dummy/mongodb
   docker run --name mongodb -v ~/dummy/mongodb:/data/db -p 27017:27017 -d mongo:4.2
   ```

3. Update the MongoDB connection details by creating a file with name `.env` at root of project with following content

   ```yaml
   NODE_ENV=development
   DB_URI=mongodb://localhost:27017/smartzy
   ```

4. Start the backend server by running following command at root of the project

   ```bash
   npm start
   ```

   Keep this running in one terminal. Server will start by default on port no. 5000.

5. Start the UI development server by running following command

   ```bash
   cd ui && npm start-client
   ```

   This will start the React development server and open your browser at `http://localhost:3000`. The UI will connect to backend server via URL `http://locahost:5000`.

6. Head over to [http://localhost:3000](http://localhost:3000) and you would be able to use the app.

## Things to Improve

1. Disconnection of ports between files and use environment variables for the same
2. Deployment support via Docker
3. Deploy live on Heroku
4. Add tests
