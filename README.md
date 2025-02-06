# b37A

# completions

- model (schema)
- structure, middleware
- seed

- POST auth register
- POST auth login
- GET auth me (protected) token verification
- GET items
- GET items/id
- GET items/id/reviews
- GET items/id/reviews/id
- GET items/id/reviews/id/comments
- POST /api/items/:itemId/reviews
- GET /api/reviews/me PROTECTED view my reviews
- POST /api/items/:itemId/reviews/:reviewId/comments PROTECTED
- GET /api/comments/me PROTECTED = get my comments
- PUT /api/comments/:commentId PROTECTED = edit my comment
- PUT /api/reviews/:reviewId PROTECTED = edit my review

# in progress

- DELETE /api/users/:userId/comments/:commentId PROTECTED = delete my comment

# tasks TODO:

- DELETE /api/users/:userId/reviews/:reviewId PROTECTED = delete my review

# data structure

- user > reviews (1-many) > user can write multiple reviews.
- user > Comments (1-many) > user can write multiple comments.
- product > reviews (1-many) > product can have multiple reviews.
- review > comments (1-many) > review can have multiple comments.
- foreign key (constraints): if user, product, review is deleted, related data CASCADE.

# PUBLIC (guest) routes: login, register
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

- GET /api/items (product)
- GET /api/items/:id
- GET /api/items/:id/reviews

- GET /api/items/:id/reviews/:id
- POST /api/items/:id/reviews
- GET /api/reviews/me
- PUT /api/reviews/:id

- POST /api/items/:id/reviews/:id/comments
- GET /api/comments/me
- PUT / api/comments/:id
- DELETE /api/comments/:id
- DELETE /api/reviews/:id

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
