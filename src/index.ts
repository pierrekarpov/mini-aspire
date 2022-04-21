import app from './app';

import connection from "./db/connection";
const PORT = process.env.PORT || 8000;
const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = process.env.DB_PORT || 3306;

// try {
//     await connection.sync();
//     app.listen(3000, () => {
//         console.log("Server started on port 3000");
//     });
// } catch (error) {
//     console.error(error);
//     process.exit(1);
// }

app.on('ready', () => {
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    });
});

// Only start server if db is alive
connection.sync()
    .then(() => {
        console.log(`Connected to mysql://${DB_HOST}:${DB_PORT}`);
        app.emit('ready');
    })
    .catch(err => {
        console.error(`App Init ${err.stack}`);
        throw err;
    });