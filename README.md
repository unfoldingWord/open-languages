## About 
Developed for Unfolding word by SevenX https://sevenxhq.com  in Collaboration with UnfoldingWord 
- Danny Weiss : Product Manager and Data scientist
- Binu Alexander :  Research and  Geolinguistics 
- Arpit Jacob : Technical Architecture, UX/UI Design, Project Managment 
- Samuel John : Full stack developer, Leaflet, Language Data Visualization
- Kalisa  : Full stack web and gis developer 

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


# Database Setup Guide

### Extract Database Dump
The database dumps are compressed in a tar.gz file. Extract them before proceeding:
```bash
cd data
tar -xzf db_backup.tar.gz
```

## Prerequisites
- PostgreSQL installed on your system
- PostGIS extension available
- The extracted directory will have two files `ol_schema.sql`(schema) and `ol_data.sql`(data).

## Step-by-Step Setup Instructions

### 1. Create New Database
```bash
psql -U postgres
CREATE DATABASE your_database_name;
\c your_database_name
```

### 2. Restore Database Schema and Data
```bash
psql -d your_database_name -f schema.sql -f data.sql
```


### Disclaimer There's a feature implemented to format the minor language in a specific format

The following instructions are related to the issue #324

#### How to use it

1. Get an http rest client like [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/) or ThunderClient or any other

2. Make a POST request to the following endpoint: `{url of openlanguages}/api/automation/minorLanguages`
3. Pass in the minor & major languages csv file as a form-data with the key `minorLanguages` and the value as the csv file and with the key `majorLanguages` and the value as the csv file.
4. You can format the outup of the key by passing in `json_key_format` with the following syntax `{mjl} ({mjl_id})` anything in the curly braces will be replaced with the value. In the code example above, the output will be `English (en)`. You can change it to `English - en` by just changing the value of the `json_key_format` to `{mjl} - {mjl_id}`

