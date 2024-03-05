const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "127.0.0.1",
      user: "root",
      password: 'node2023.',
      database: "watering_monitoring",
      port: 3306
    },
    listPerPage: 10,
  };
  module.exports = config; 