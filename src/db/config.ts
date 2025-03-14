import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [
        process.env.NODE_ENV === 'production'
            ? 'dist/models/*.js'
            : 'src/models/*.ts',
    ],
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV !== 'production',
    driver: require('mysql'),
});
