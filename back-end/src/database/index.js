import Sequelize from 'sequelize';
import config from './config';

const sequelize = new Sequelize(config.development);

export default sequelize;
