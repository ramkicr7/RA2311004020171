# Smart Notification System

## Overview

This project is a web-based notification system that fetches campus-related alerts from a protected API and displays them in a prioritized format. The system focuses on organizing notifications such as placements, events, and results into a clean and structured dashboard.

## Features

* Token-based authentication using API
* Fetching notifications from a protected endpoint
* Priority-based sorting (Placement > Event > Result)
* Top N filtering (Top 5, Top 10, etc.)
* Logging middleware for tracking API calls
* Responsive user interface using Tailwind CSS

## Tech Stack

* React (Vite)
* Tailwind CSS
* Axios
* JavaScript

## Project Structure

* notification_app_fe : Frontend application
* logging_middleware : Logging functionality
* notification_system_design.md : System design document

## Demo Video

The working demo video has been uploaded and included in the submission.

## How to Run

cd notification_app_fe
npm install
npm run dev

## Notes

The system requires successful authentication before fetching notifications.
All notifications are processed and displayed based on priority logic.
