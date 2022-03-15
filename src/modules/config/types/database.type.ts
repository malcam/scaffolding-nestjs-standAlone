export type DatabaseConfigType = {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  autoLoadEntities: boolean;
  migrationsTableName: string;
  logging?: boolean;
};
