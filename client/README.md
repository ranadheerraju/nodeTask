This React app is created by using webpack to optimize the code and application performance.
# reactTask
1. This is ui service to check the work.
2. Including integrations to backend and everything done on this end.
3. Any user can have an option to register himself through manual registration by giving email and password or login with google option(He can use either of one).
4. For the first time when he entered his details then his details will be stored in the backend database and jwt token will be generated then he will redirect to his dashboard.
5. Next time again when he gave his details instead of storing his details in the backend again directly he will get logged into his dashboard based on details provided by the user.
6. Once he logged in, in his dashboard he will able to see currentInteger which is fetched from the backend and nextInteger and two buttons Update Current Integer and Generate Next Integer.
7. Once he clicked on update current integer, then he will be asked to give an valid positive current integer. Once the current integer is submitted then update api will be called.
8. Based on the currentInteger automatically nextInteger will be generated.
9. When he click on generate nextInteger then the currentInteger will be incremented by 1 and gets stored into the database. Oncethe current integer is incremented then automatically nextInteger will be incremented by 1 based on the current integer.

# How to run this task
1. Once you cloned this repo, do npm i to install node_modules.
2. Once node_modules installed then do npm start.
3. This task will run on http://localhost:5001.
