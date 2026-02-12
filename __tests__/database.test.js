const {db, closeDB}  = require('../db/index');

describe('Ping', () => {
    let connection;
    beforeAll(async () => {
        connection = await db;
    });

    afterAll(async () => {{
        await closeDB();
    }})

    test('Ping', async () => {
        const result = await connection.command({ ping: 1 });
        expect(result.ok).toBe(1);
    });
});