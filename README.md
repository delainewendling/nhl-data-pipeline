# nhl-data-pipeline

This is partially complete code for the [sportradar-advanced-challenge](https://github.com/sportradarus/sportradar-advanced-challenge/tree/main). Because it is partially complete, it does not run :(

## Database Design

I set up a free tier MySQL database instance in a personal AWS account to hold the NHL data.

Normally I would utilize terraform to create any infrastructure in AWS. However, since I was limited to the free tier and wanted to move quickly, I decided not to set up terraform for this project. The ERD diagram for this database can be found [here](https://lucid.app/lucidchart/8f885212-2855-4e46-b622-e4f3daf8d0dc/edit?viewport_loc=-53%2C-52%2C2385%2C1536%2C.hCJmpJP21mM&invitationId=inv_7f1ef2f4-4e31-4c6f-961c-dbfbe40fae90)

*Assumptions*

Some assumptions I made in the design of the database schema were that `points` should be stored at the game level and that a player's `number`, `position`, and `team` should be associated with the game, rather than the player, since they could change game to game.

### Query Builder (or lack thereof)

I don't have a lot of experience with Node and have never used a query builder or ORM framework with Node. I probably should have spent more time looking into a viable option for this but I ended up spending the same amount of time, or more, building some kind of home grown raw SQL manager instead. If I were to do this again, I would look into a better solution for database queries.

