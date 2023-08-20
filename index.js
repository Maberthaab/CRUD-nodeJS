const mysql = require('mysql2/promise')

/*
*/
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'peserta_magang_app'
})

/*Create Data */

async function createUser(username, jenis_kelamin, alamat, tgl_lahir, email) {
    const sql = 'INSERT INTO peserta(username, jenis_kelamin, alamat, tgl_lahir, email) VALUES (?, ?, ?, ?, ?)'
    await pool.query(sql, [username, jenis_kelamin, alamat, tgl_lahir, email])
    console.log("Data user dibuat")
}

async function run() {
   await createUser("Joddy", "Laki-laki", "Jakarta", "2002-07-12", "joddy@gmail.com")
   
}


/* === Read Data ===*/

async function getUser(){
    const sql = 'SELECT * FROM peserta';
    const [rows] = await pool.query(sql);
    return rows;
    }

async function run() {
    const users = await getUser();
        console.log("Data user saat ini:", users);
 
}

/*=== Update ===*/

async function updateUser(id, username, jenis_kelamin, alamat, tgl_lahir, email) {
    const sql = 'UPDATE peserta SET username = ?, jenis_kelamin = ?, alamat = ?, tgl_lahir = ?, email = ? WHERE id = ?';
    await pool.query(sql, [username, jenis_kelamin, alamat, tgl_lahir, email, id]);
    console.log("Data user diperbarui");
}

async function run() {
    await updateUser(7, "Taigor", "Laki-laki", "Bogor", "2000-06-19", "taigorbajigor@gmail.com");

}

/*=== Delete ===*/

async function deleteUser(id) {
    const sql = 'DELETE FROM peserta WHERE id = ?';
    await pool.query(sql, [id]);
    console.log("Data user dihapus");
}
async function run(){
    await deleteUser(8);
}



/* akhir sesi */
run().catch(console.error)