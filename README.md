# nodeTask
# My Assumption steps saken to run this task
1. First I created a boilerplate for node.js then I wrote a structured and optimized code.
2. Second, I drawn a sample picture in my notebook like the workflow to achieve this task.
3. Then, I wrote a register api for signup using either manual or google oauth.
4. Then, in register api I wrote conditions or functions like first whenever a new user submitted his details then his details will store in the db and he gets logged in automatically by using JWT token.
5. Again if he logout and if he gave his email and password or if he tries to logging with gmail api then he can login into his account but his details will not be stored in the database again.
6. Once, he logged in he will redirect to his dashboard. 
7. In his dashboard he will get his currentInteger, nextInteger with two buttons Update Integer and Generate Next Integer.
8. When he clicks on Update Integer then he will be able to update his currentInteger and automatically based on updated currentInteger, next sequence integer will be generated in his dashboard.
9. When he clicks on logout he will redirect to the home page or landing page.

# How to run this task
1. Once you clone the code, do npm i.
2. Once node modules installed if you have mongodb locally then run npm start.
3. Automatically it will connect to the mongodb and we can run our apis.

# To test apis in postman
1. http://localhost:3000/user/signup, this is for register api the sample json data is 
{
                name: "user",
                email: "user@gmail.com,
                password: "12345",
                currentInteger: 10,
                ProviderId: "Manual",
                status: "active
}
2. http://localhost:3000/user/current, this is for fetching current integer, just pass token in headers.
3. http://localhost:3000/user/update, this is for updating current integer, pass token in headers along with this body data
{ currentInteger: 12 }
