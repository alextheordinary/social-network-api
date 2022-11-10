# social-network-api

The contents of this repository is a back-end framework for a social network API. The API is built on MongoDB and thus requires a functional deployment of MongoDB.

This is the basic structure of the API:

There are users that can have friends, thoughts, and reactions to thoughts. Users and thoughts are independent collections. Friends are a reference to other Users. Reactions are subdocuments of Thoughts.

The following API calls exists:

GET: 
* All users with references to thoughts and friends
* A single user with with their thoughts and friends fully populated
* All thoughts
* A single thought

POST:
* Add a user
* Add a thought
* Add a friend
* Add a reaction

PUT:
* Update a user
* Update a thought

DELETE:
* Delete a user (and associated thoughts)
* Delete a thought
* Remove a friend
* Remove a reaction

Demonstration video found at this link: 

