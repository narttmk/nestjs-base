export default () => ({
    
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: +(process.env.DATABASE_PORT || 5432),
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    name: process.env.DATABASE_NAME || 'myapp',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiration: process.env.JWT_EXPIRATION || '3600',
  },
});
