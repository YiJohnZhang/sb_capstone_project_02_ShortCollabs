const bcrypt = require('bcrypt');

const db = require('../database/db');
const { BCRYPT_WORK_FACTOR } = require('../config');

async function commonBeforeAll() {

	// leave `role_users_join` and `roles` Alone: seed first with `testSeed.sql`
	// await db.query("TRUNCATE TABLE roles_users_join RESTART IDENTITY CASCADE;");
	await db.query("TRUNCATE TABLE contents_users_join RESTART IDENTITY CASCADE;");
		// restart serial at 1

	// noinspection SqlWithoutWhere
	await db.query("TRUNCATE TABLE contents RESTART IDENTITY CASCADE;");
	await db.query("DELETE FROM contents");
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM users");
	
	await db.query(`
	INSERT INTO users ("username","first_name","last_name","birthdate","verified","account_status","email","password","picture","description","is_elevated")
		VALUES
			('testuser1', 'Test', 'uSER1', '1990-01-01', TRUE, 'active', 'testUser@test.com', $1, 'xsgamesm-33.jpg', 'afsd2', FALSE),
			('testuser2', 'Test', 'uSER2', '1990-01-01', TRUE, 'active', 'testUser@test.net', $1, 'xsgamesm-49.jpg', 'fasd1', FALSE),
			('adminUser1', 'Admin', 'USER1', '1990-10-23', TRUE, 'active', 'admin@amail.com', $2, 'xsgamesm-23.jpg', 'asdfz', TRUE);`,[
			await bcrypt.hash('password', BCRYPT_WORK_FACTOR),
			await bcrypt.hash('admin', BCRYPT_WORK_FACTOR)
		]);
	
	await db.query(`
	INSERT INTO contents(title,summary,description,link,status,owner,contract_type,participants,contract_details,contract_signed,date_created,date_standby,date_published)
		VALUES
			('test content', 'temporarySummary', 'default_description', 'https://youtu.be/nhVJhRhJbJE', 'published', 'testuser1', 'solo', '["testuser1"]', '{"views":[{"username":"testuser1","share":1}], "engagement":[{"username":"testuser1","share":1}]}', '["testuser1"]', '2022-12-29', '2022-12-29', '2022-12-30'),
			('test content2', 'temporarySummary', 'default_description', 'https://youtu.be/FTvLFlNbSQQ', 'published', 'testuser1', 'byview', '["testuser1","testuser2"]', '{"views":[{"username":"testuser1","share":0}, {"username":"testuser2","share":0}], "engagement":[{"username":"testuser1","share":0}, {"username":"testuser2","share":0}]}', '["testuser1","testuser2"]', '2022-12-29', '2022-12-29', '2022-12-30'),
			('test content3', 'temporarySummary', 'default_description', '', 'open', 'testuser1', 'presplit', '["testuser1","testuser2"]', '{"views":[{"username":"testuser1","share":0.7}, {"username":"testuser2","share":0.3}], "engagement":[{"username":"testuser1","share":0.4}, {"username":"testuser2","share":0.6}]}', '["testuser1"]', '2022-12-30', '2022-12-30', NULL);
	`);

	await db.query(`
	INSERT INTO contents_users_join(user_id,content_id,description)
		VALUES
			('testuser1', 1, 'mw1'),
			('testuser1', 2, 'mw2'),
			('testuser2', 2, 'mw2'),
			('testuser1', 3, 'afsd'),
			('testuser2', 3, 'afsd')
	`);

}

async function commonBeforeEach() {
	await db.query('BEGIN');
}

async function commonAfterEach() {
	await db.query('ROLLBACK');
}

async function commonAfterAll() {
	await db.end();
}

test('dummy test so that \'jest\' isn\'t screaming that \"Your test suite must contain at least one test.\"', () => {
	// console.log(BCRYPT_WORK_FACTOR);
	expect(1).toEqual(1);
});

module.exports = {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
};