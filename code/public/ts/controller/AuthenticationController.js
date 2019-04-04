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
const PageController_1 = require("./PageController");
const Client_1 = require("../model/Client");
//import {Session} from "inspector";
const session = require('express-session');
class AuthenticationController extends PageController_1.PageController {
    //private fileSystem:any;
    constructor(viewLogin, viewRegistration) {
        super(null);
        this.passwordHash = require('bcryptjs');
        this.viewLogin = viewLogin;
        this.viewRegistration = viewRegistration;
        this.client = (new Client_1.Client.builder()).buildUserClient().build().getUserClient();
        //this.fileSystem = require ('fs');
    }
    update(app) {
        app.get('/profile', (request, response) => {
            response.send("Login avvenuto con successo sei nel tuo profilo" + session.username);
        });
        app.get('/login', (request, response) => {
            if (request.query.mess === "invalidLogin") {
                this.viewLogin.setError("username o password invalidi");
            }
            else {
                this.viewLogin.setError("");
            }
            response.send(this.viewLogin.getPage());
        });
        app.post('/checklogin', (request, response) => __awaiter(this, void 0, void 0, function* () {
            //app.use(session({name:'bortolone',secret: 'ciao',resave: true, saveUninitialized: true}));
            console.log(session);
            if (this.client && request.body.username !== "admin") { //if is not undefined
                if (yield this.client.verifyUser(request.body.username, request.body.password)) {
                    app.use(session({ secret: 'colletta', resave: false, saveUninitialized: true }));
                    session.username = request.body.username;
                    session.password = request.body.password;
                    response.redirect("/profile");
                }
                else {
                    response.redirect("/login?mess=invalidLogin");
                }
            }
        }));
        app.get('/registration', (request, response) => {
            if (request.query.mess === "errUsername") {
                this.viewRegistration.setError("username già utilizzata, scegli un'altra username");
            }
            else {
                this.viewRegistration.setError("");
            }
            response.send(this.viewRegistration.getPage());
        });
        app.post("/saveuser", (req, res) => {
            const hashedPassword = this.passwordHash.hashSync(req.body.username, 10);
            //console.log("hashedPassword:" + hashedPassword);
            console.log("username :" + req.body.username + " role: " + req.body.role + " user : " + this.client);
            if (req.body.username !== "admin" && req.body.role === "student" && this.client !== undefined) {
                this.client.insertStudent(req.body.username, hashedPassword, req.body.name, req.body.surname, "Città", "Scuola");
                console.log("studente registrato con successo");
                res.redirect("/login?mess=regisDone");
            }
            else if (req.body.username !== "admin" && req.body.role === "teacher" && this.client !== undefined) {
                this.client.insertTeacher(req.body.username, hashedPassword, req.body.name, req.body.surname, "Città", "Scuola", "0002");
                console.log("teacher registrato con successo");
                res.redirect("/login?mess=regisDone");
            }
            else {
                console.log("tutto a puttane");
                res.redirect("/registration?mess=errUsername");
            }
        });
    }
}
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=AuthenticationController.js.map