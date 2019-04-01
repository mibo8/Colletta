"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserClient_1 = require("./UserClient");
const ExerciseClient_1 = require("./ExerciseClient");
const ClassClient_1 = require("./ClassClient");
class Client {
    constructor(userClient, exerciseClient, classClient) {
        this.userClient = userClient;
        this.exerciseClient = exerciseClient;
        this.classClient = classClient;
    }
    getUserClient() {
        return this.userClient;
    }
    getExerciseClient() {
        return this.exerciseClient;
    }
    getClassClient() {
        return this.classClient;
    }
}
exports.Client = Client;
(function (Client) {
    class ClientBuilder {
        buildClassClient() {
            this.dbClassManager = new ClassClient_1.ClassClient();
            return this;
        }
        buildExerciseClient() {
            this.dbExerciseManager = new ExerciseClient_1.ExerciseClient();
            return this;
        }
        buildUserClient() {
            this.dbUserManager = new UserClient_1.UserClient();
            return this;
        }
        build() {
            // @ts-ignore
            return new Client(this.dbClassManager, this.dbExerciseManager, this.dbUserManager);
        }
    }
    Client.ClientBuilder = ClientBuilder;
})(Client || (Client = {}));
exports.Client = Client;
//# sourceMappingURL=Client.js.map