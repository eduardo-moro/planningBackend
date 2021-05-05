const MongoClient = require('mongodb').MongoClient;
let client

class Database {

    constructor() {
        console.time("Conexão ao banco de dados realizada com sucesso em")
        const uri = "mongodb+srv://master_user:YzJw5bw2WaszSd8@uplanner.ivyqo.mongodb.net";
        this.connect(uri)
        console.timeEnd("Conexão ao banco de dados realizada com sucesso em")
    }

    connect(uri){
        this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        this.client.connect( err => {
          const collection = this.client.db("test").collection("devices");
          this.client.close();
        });
    }

}

module.exports = Database
