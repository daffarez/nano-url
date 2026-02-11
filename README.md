# Nano URL
Nano URL is a lightweight URL shortening service built with Node.js, Express, and Prisma. It converts long URLs into short, shareable links and redirects users while tracking usage statistics.

## Features
- Generate short URLs
- Redirect to original URLs
- Click tracking (hit counter)
- Persistent storage using SQLite (via Prisma ORM)
- Clean service-controller architecture

## How it works
The service creates a unique short code for each URL and stores it in the database.
When a user accesses the short link, the server looks up the code, increments the click counter atomically, and redirects the user to the original URL.
