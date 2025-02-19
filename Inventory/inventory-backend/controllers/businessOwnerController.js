const pool = require('../db');

const getAllBusinessOwners = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM business_owners');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

const createBusinessOwner = async (req, res) => {
    const { name, email, contact_details } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO business_owners (name, email, contact_details) VALUES ($1, $2, $3) RETURNING *',
            [name, email, contact_details]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

module.exports = { getAllBusinessOwners, createBusinessOwner };