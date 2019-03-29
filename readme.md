# Learn Node

![Logo](https://user-images.githubusercontent.com/15032635/55244444-1cb8d700-5239-11e9-98a8-fc99a1219384.png "Learn Node")

Now That's Delicious! - A full-stack restaurant application which users can search, geolocate, review and curate their favourite restaurants from around the world.

The application has three main models — Users, Stores and Reviews — all of which are relational. It is designed to hit upon many of today's application needs such as user authentication, database storage, Ajax REST API, file upload and image resizing.

Check out the [live application here](https://demo.learnnode.com/).

More Info on course can be found [here](https://learnnode.com/).

Course by [wesbos](https://wesbos.com/).

## Usage

### Seeders

Seeders are included which will populate 16 stores with 3 authors and 41 reviews.

To seed the data run the following command in your terminal:
```bash
npm run sample
```

If you have previously loaded data and want to remove it, you can wipe your database clean with:
```bash
npm run blowitallaway
```

### Sample Users

These are some sample users which the seeder will add and can be used to navigate the app

|Name|Email (login)|Password|
|---|---|---|
|Wes Bos|wes@example.com|wes|
|Debbie Downer|debbie@example.com|debbie|
|Beau|beau@example.com|beau|
