# nhl-data-pipeline

This is partially complete code for the [sportradar-advanced-challenge](https://github.com/sportradarus/sportradar-advanced-challenge/tree/main). Because it is partially complete, it does not run :(

## Running unit tests

While inside of the `data-pipeline` directory, run `npm test` to run the full test suite.

Unfortunately, I did not create the code for this challenge using test-driven development. I was limited on time so I ended up prioritizing working code over testing said code. Some tests in uploadGameData.test.ts are failing because the spy I created doesn't seem to be mocking the implementation correctly, therefore it's trying to actually connect to the database and getting an access denied error. I am either not implementing the spy correctly or don't have my jest configuration set up properly. I also don't have 100% code coverage due to time constraints.

## Database Design

I set up a free tier MySQL database instance in a personal AWS account to hold the NHL data.

Normally I would utilize terraform to create any infrastructure in AWS. However, since I was limited to the free tier and wanted to move quickly, I decided not to set up terraform for this project. The ERD diagram for this database can be found [here](https://lucid.app/lucidchart/8f885212-2855-4e46-b622-e4f3daf8d0dc/edit?viewport_loc=-53%2C-52%2C2385%2C1536%2C.hCJmpJP21mM&invitationId=inv_7f1ef2f4-4e31-4c6f-961c-dbfbe40fae90) or in the image below.

![](assets/nhl_database_erd.png)

*Assumptions*

Some assumptions I made in the design of the database schema were that `points` should be stored at the game level and that a player's `number`, `position`, and `team` should be associated with the game, rather than the player, since they could change game to game.

### Query Builder (or lack thereof)

I don't have a lot of experience with Node and have never used a query builder or ORM framework with Node. I probably should have spent more time looking into a viable option for this but I ended up spending the same amount of time, or more, building some kind of home grown raw SQL manager instead. If I were to do this again, I would look into a better solution for database queries.

### Multi-threading

Some of the code in the second process that runs while a game is live is CPU intense. Therefore, it's going to block the main-thread and cause issues with the first process and any subsequent live game processes. If I had more time I would look into a way of spawning more workers or use libraries to make sure multi-threading was being implemented.  
