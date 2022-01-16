const db = require("../config/mysql2/db");

exports.execute = async (statement, params) => {
    try {
        if (params === undefined) {
            params = [];
        }
        return await db.promise().execute(statement, params);
    } catch (err) {
        throw Error('Failed to execute ' + statement + ' with params ' + params.toString());
    }
};

exports.query = async (statement, values) => {
    try {
        if (values === undefined) {
            values = [];
        }
        return (await db.promise().query(statement, values))[0];
    } catch (err) {
        throw Error('Failed to query ' + statement + ' with params ' + values.toString());
    }
}