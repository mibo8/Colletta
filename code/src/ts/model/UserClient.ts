import {DatabaseUserManager} from "./DatabaseUserManager";
import {Data} from "./Data";
import {Teacher} from "./Teacher";
import {Student} from "./Student";
import {User} from "./User";

class UserClient{
    private dbUserManager : DatabaseUserManager;
    private passwordHash = require('bcryptjs');
    constructor(){
        this.dbUserManager = new DatabaseUserManager();
    }

    async insertStudent(username : string, password : string, name : string, surname : string, city : string, school : string) : Promise<boolean>{
        return await this.dbUserManager.insert(new Student(username, password, name, surname, city, school));
    }
    async insertTeacher(username : string, password : string, name : string, surname : string, city : string, school : string, inps:string) : Promise<boolean>{
        return await this.dbUserManager.insert(new Teacher(username, password, name, surname, city, school, inps));
    }
    async verifyUser(username: string, insertedPassword : string) : Promise<boolean>{
        const idUser = await this.dbUserManager.search(username);
        if(idUser!=="false") {
            const user: Data | null = await this.dbUserManager.read(idUser);
            if (user !== null) {
                const password = (<User>user).getPassword();
                if (this.passwordHash.compareSync(insertedPassword, password)) {
                    //console.log("password match");
                    return true;
                } else {
                    //console.log("password dont match")
                    return false;
                }
            } else {
                //console.log("password dont match")
                return false;
            }
        }
        else{
            return false;
        }

    }
    async isTeacher(username:string) : Promise<boolean>{
        const id = await this.dbUserManager.search(username);
        const user = await this.dbUserManager.read(id);
        console.log((<User>user));
        console.log((<User>user).getUsername());
        return (<User>user).isTeacher();
    }
}
export{UserClient}