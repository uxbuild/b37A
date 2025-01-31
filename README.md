# b37A

# data structure

- user > reviews (1-many) > user can write multiple reviews.
- user > Comments (1-many) > user can write multiple comments.
- product > reviews (1-many) > product can have multiple reviews.
- review > comments (1-many) > review can have multiple comments.
- foreign key (constraints): if user, product, review is deleted, related data cascades.

# requirements

- guest: browse and read reviews  (GET /api/products/:id/reviews)
- guest: read details of reviewed item (GET api/products/:id)
- guest: see average score (GET api/products/:id)
- guest: see item info (GET api/products/:id)
- guest: sign up (POST api/auth/register)
- guest: login (POST api/auth/login) + (api/auth/me)

- login user: create review (POST api/products/:id/reviews)
- user: view list of all reviews have written (api/reviews/me)
- user: delete a review have written (DELETE api/reviews/:id)
- user: edit a review have written (PUT/PATCH api/reviews/:id)
- user: write comments on any review (POST api/reviews/:id/comments)
- user: view list of all comments have written (GET api/comments/me)
- user: edit comment have written (PUT api/comments/:id)
- user: delete comment have written (DELETE api/comments/:id)

- engineer
- seed data
- secured user data (protected routes?)

- other
- journal/project plan
- database schema
- base routes (router?) + placeholder endpoints
