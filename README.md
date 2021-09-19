# moodMojo

Custom playlist generator. Allows users to create playlists that match their mood by selecting 1-5 songs that match their current mood and tweaking music characteristic settings.

## To Use This Repo

1. Clone the repo
2. In the terminal, navigate to the project folder and run `npm i`
3. Create a 'config.js' file in the back folder (It is already ignored).
```javascript
module.exports = {
    client_id: '<your_key_here>',
    client_secret: '<your_secret_here>'
}
```

4. For development - Run `npm run dev` and that'll start the live development server and the backend express server.
5. For production - Run `npm run build` and the production ready bundles will be output to the dist folder. Then run `npm run prod` to serve up the bundles and start the backend express server.