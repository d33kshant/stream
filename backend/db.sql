-- Create the database
CREATE DATABASE "react-tube";

-- Table for users
-- id: unique identifer for user
-- username: username of the user
-- email: email of the user
-- password: password of the user
CREATE TABLE users (
	id BIGSERIAL PRIMARY KEY,
	username TEXT UNIQUE NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL
);

-- Table for videos
-- id: unique identifier for video
-- title: title of the video
-- author: user who posted the video
-- url: location of the video
-- created_on: time video was uploaded
CREATE TABLE videos (
	id TEXT PRIMARY KEY,
	title TEXT,
	link TEXT NOT NULL,
	author TEXT NOT NULL,
	created_on TIMESTAMP DEFAULT Now()
);
