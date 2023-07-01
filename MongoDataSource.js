export class MongoDataSource {
  constructor(options) {
    this.dbConnection = this.initializeDBConnection();
    this.token = options.token;
  }
  async initializeDBConnection() {}

  async getBoards() {}
}
