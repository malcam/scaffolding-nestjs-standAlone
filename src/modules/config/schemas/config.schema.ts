import * as Joi from 'joi';

export const configSchema = Joi.object({
  APP_NAME: Joi.string().empty('').default('Application'),
  HOST: Joi.string().empty('').default('localhost'),
  PORT: Joi.number().required(),
  MAIN_DB_TYPE: Joi.string().required(),
  MAIN_DB_HOST: Joi.string().required(),
  MAIN_DB_PORT: Joi.number().required(),
  MAIN_DB_USERNAME: Joi.string().required(),
  MAIN_DB_PASSWORD: Joi.string().allow(''),
  MAIN_DB_NAME: Joi.string().required(),
  MAIN_DB_RUN_MIGRATIONS: Joi.number(),
  MAIN_DB_SYNC: Joi.number(),
});
