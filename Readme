1. Download mysql 
2. Make sure the mysql server is running
3. In terminal run following commands
    i. ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
    ii. flush privileges;       
    iii. /usr/local/mysql/bin/mysql -u root -p
    iv. CREATE DATABASE flatmatefinder;
    v. use flatmatefinder;
    vi. CREATE TABLE user (
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        gender VARCHAR(20),
        email_id VARCHAR(100) not null,
        d_o_b VARCHAR(15),
        university_name VARCHAR(100),
        university_program VARCHAR(100),
        password VARCHAR(200),
        nationality VARCHAR(100),
        dietary VARCHAR(100),
        language VARCHAR(200),
        shared_occupancy VARCHAR(50),
        pet_preference VARCHAR(50),
        smoking_habit VARCHAR(50),
        drinking_habit VARCHAR(50),
        created_at TIMESTAMP,
        PRIMARY KEY (email_id)
        );

4. Navigate to the project folder, run npm install and then npm start
5. open in chrome - localhost:3000        