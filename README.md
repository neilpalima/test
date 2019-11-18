# Service

## Installation and Setup

To install this:

1. RUN `npm i`
2. Rename `.env.example` to `.env`, and update the values accordingly.

## Build

Run `npm run build` to build the code.
Run `npm run scripts:seeder` to create needed tables and seed data.

## Starting the Service

To run this service:

Run this command: `docker-compose up --build`

## Stopping the Service

To stop this service:

Run this command: `docker-compose down`

## Running the Unit Tests or Seeder

1. SSH into docker container using Kitematic or run: `docker exec -ti {node_container_name} /bin/sh` through commandline
2. Run the command `npm run scripts:seeder` (can be skipped if tables and their data were already initialized)
3. Run the command `npm test`

### Endpoints

#### `GET` /orgs/{org-name}/comments

**Response:**

```json
{
  "message": "Here are the comments",
  "data": ["Test", "New Comment"]
}
```

#### `POST` /orgs/{org-name}/comments

**Request Body:**

```json
{
  "comment": "New comment"
}
```

**Response:**

```json
{
  "message": "Successfully added new comment",
  "data": null
}
```

#### `DELETE` /orgs/{org-name}/comments

**Response:**

```json
{
  "message": "Successfully soft deleted comments",
  "data": null
}
```

#### `GET` /orgs/{org-name}/members

**Response:**

```json
{
  "message": "Here are the members",
  "data": [{
    "user_id": 1,
    "user": {
      "name": "Yun Lang",
      "email": "y.lang@gmail.com",
      "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/thehacker/128.jpg",
      "followers_count": 2,
      "following_count": 0
    }
  },
  {
    "user_id": 2,
    "user": {
      "name": "Wag Yan",
      "email": "w.yan@gmail.com",
      "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/thehacker/128.jpg",
      "followers_count": 1,
      "following_count": 0
    }
  }]
}
```