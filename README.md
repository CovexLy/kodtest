# kodtest

/web/index.html /should/ be runnable as is.
/web/ is built using Onsen UI and XMLHttpRequest.

/backend/ is built using Eclipse/maven and comes with compile/server batch files (Maven) as well as one for test.
The files Need to be compiled before running, but test.bat builds the project enough to be able to run.
After the backend is up: a web database console is made available at http://localhost:8080/h2 with settings according to
/Backend/src/main/resources/application.properties.

The project is currently halted at create/update from the frontend due to issues with CORS, possibly related to the in-memory database, local html ("file://") etc.
