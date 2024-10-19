import pkg from 'pg';
const { Pool } = pkg; // Import Pool from pg
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.SUPABASE_CONNECTION_STRING,
});

export const query = async (text, params) => {
  try {
    console.log('Executing query:', text, params); // Log the query for debugging
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error); 
    throw error;
  }
};
