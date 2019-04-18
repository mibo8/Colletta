"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseUserManager_1 = require("../DatabaseManager/DatabaseUserManager");
const Teacher_1 = require("../Data/Teacher");
const Student_1 = require("../Data/Student");
class UserClient {
    constructor() {
        this.passwordHash = require('bcryptjs');
        this.dbUserManager = new DatabaseUserManager_1.DatabaseUserManager();
    }
    insertStudent(username, password, name, surname, city, school) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbUserManager.insert(new Student_1.Student("0", username, password, name, surname, city, school));
        });
    }
    insertTeacher(username, password, name, surname, city, school, inps) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbUserManager.insert(new Teacher_1.Teacher("0", username, password, name, surname, city, school, inps));
        });
    }
    verifyUser(username, insertedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const idUser = yield this.dbUserManager.search(username);
            if (idUser !== "false") {
                const user = yield this.dbUserManager.read(idUser);
                if (user !== null) {
                    const password = user.getPassword();
                    if (this.passwordHash.compareSync(insertedPassword, password)) {
                        //console.log("password match");
                        return true;
                    }
                    else {
                        //console.log("password dont match")
                        return false;
                    }
                }
                else {
                    //console.log("password dont match")
                    return false;
                }
            }
            else {
                return false;
            }
        });
    }
    isTeacher(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield this.dbUserManager.search(username);
            const user = yield this.dbUserManager.read(id);
            console.log(user);
            console.log(user.getUsername());
            return user.isTeacher();
        });
    }
}
exports.UserClient = UserClient;
//# sourceMappingURL=UserClient.js.map