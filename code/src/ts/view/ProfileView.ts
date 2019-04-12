import {PageView, UserKind} from "./PageView";
import {ProfilePresenter} from "../presenter/ProfilePresenter";

class ProfileView extends PageView{
    private userData : any;
    private profileController :ProfilePresenter;
    constructor(app : any){
        super();
        this.profileController= new ProfilePresenter(this);
        this.profileController.update(app);
        this.userData=undefined;
    }
    public setUserData(obj : any){
        this.userData=obj;
    }
    public getPage() {
        let ret = this.getHead();
            ret +=this.getMenu();
        ret +="<div class=\"container\">" +
            "\t<h1 class ='text-center mb-5'>Informazioni profilo:</h1>\n" +
            "\t<ul class=\"list-group\">\n" +
            "\t<li class=\"list-group-item\">\n" +
            "<form method='post' action='/update'>" +
            "\t\t<div class= \"row\">\n" +
            "\t\t\t<div class = \"col-sm-6\">\n" +
            "\t\t\t\t<p class= \"font-weight-bold\"> Nome:</p> \n" +
            "\t\t\t</div>\n" +
            "\t\t\t<div class = \"col-sm-6\">\n" +
            "\t\t\t\t<input class=\"form-control\" name='name' value='"+this.userData.name+"'/>\n" +
            "\t\t\t</div>\n" +
            "\t\t</div>\n" +
            "\t\t\n" +
            "\t\t<div class= \"row\">\n" +
            "\t\t\t<div class = \"col-sm-6\">\n" +
            "\t\t\t\t<p class= \"font-weight-bold\"> Cognome: </p> \n" +
            "\t\t\t</div>\n" +
            "\t\t\t<div class = \"col-sm-6\">\n" +
            "\t\t\t\t<input class=\"form-control\" name='lastname' value='"+this.userData.lastname+"'/>\n" +
            "\t\t\t</div>\n" +
            "\t\t</div>\n" +
            "\t\t\n" +
            "\t\t<div class= \"row\">\n" +
            "\t\t\t<div class = \"col-sm-6\">\n" +
            "\t\t\t\t<p class= \"font-weight-bold\"> Città: </p> \n" +
            "\t\t\t</div>\n" +
            "\t\t\t<div class = \"col-sm-6\">\n" +
            "\t\t\t\t<input class=\"form-control\" name='city' value='"+this.userData.city+"'/>\n" +
            "\t\t\t</div>\n" +
            "\t\t</div>\n" +
            "\t\t\n" +
            "\t\t<div class= \"row\">\n" +
            "\t\t\t<div class = \"col-sm-6\">\n" +
            "\t\t\t\t<p class= \"font-weight-bold\"> Scuola: </p> \n" +
            "\t\t\t</div>\n" +
            "\t\t\t<div class = \"col-sm-6\">\n" +
            "\t\t\t\t<input class=\"form-control\" name='school' value='"+this.userData.school+"'/>\n" +
            "\t\t\t</div>\n" +
            "\t\t</div>\n";
            if(this.userKind == UserKind.teacher) {
                ret+="\t\t<div class= \"row\">\n" +
                "\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t<p class= \" font-weight-bold\"> Matricola INPS: </p> \n" +
                "\t\t\t</div>\n" +
                "\t\t\t<div class = \"col-sm-6\">\n" +
                "\t\t\t\t<input class=\"form-control\" name='inps' value='"+this.userData.inps+"'/>\n" +
                "\t\t\t</div>\n" +
                "\t\t</div>";
            }
            ret+="" +
                "\t\t\t<div class = \"col-sm-12 text-center mt-3\">\n" +
                "\t\t\t\t<button class='btn btn-primary btn-sm' type='submit'>Modifica</button> \n" +
                "\t\t\t</div>\n" +
                "</form>" +
                "\t</li>\n" +
            "\t</ul>";
            /*if(this.userKind === UserKind.student){
                //TODO controllare questo codice renderlo dinamico
                ret+="<div class=\"row\" style=\"margin-top: 15%; margin-bottom:10%\">\n" +
                    "\t\t<div id= \"progress\" class = \" anchor col-sm-6 mx-auto\">\n" +
                    "\t\t\t<h1 class ='text-center mb-5'>I tuoi progressi:</h1>\n" +
                    "\t\t\t<ul class=\"list-group\">\n" +
                    "\t\t\t\t<li class=\"list-group-item\">\n" +
                    "\t\t\t\t\t<div class= \"row\">\n" +
                    "\t\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t\t<p class= \"font-weight-bold\"> Esercizi svolti:</p> \n" +
                    "\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t\t<p class=\"font-weight-light\"> 10 </p> \n" +
                    "\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t<div class= \"row\">\n" +
                    "\t\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t\t<p class= \"font-weight-bold\"> Media valutazioni:</p> \n" +
                    "\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t\t<p class=\"font-weight-light\"> 6.53 </p> \n" +
                    "\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t\t\t<div class=\"mt-2\" id=\"chartdiv\" style=\"width: 100%; height: 400px; background-color: #FFFFFF;\" ></div>\n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t</li>\n" +
                    "\t\t\t</ul>\n" +
                    "\t\t\t\n" +
                    "\t\t</div>\n" +
                    "\t\t\n" +
                    "\t<div class = \"col-sm-6 mx-auto\">\n" +
                    "\t\t<h1 class ='text-center mb-5'>Media per argomenti trattati:</h1>\n" +
                    "\t\t<ul class=\"list-group\">\n" +
                    "\t\t\t<li class=\"list-group-item\">\n" +
                    "\t\t\t\t<div class= \"row\">\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class= \"font-weight-bold\"> Aggettivi:</p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class=\"font-weight-light\"> 6 </p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t</div>\n" +
                    "\t\t\t\t<div class= \"row\">\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class= \"font-weight-bold\"> Avverbi:</p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class=\"font-weight-light\"> 5.24 </p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t</div>\n" +
                    "\t\t\t\t<div class= \"row\">\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class= \"font-weight-bold\"> Verbi:</p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class=\"font-weight-light\"> 9.3 </p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t</div>\n" +
                    "\t\t\t\t<div class= \"row\">\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class= \"font-weight-bold\"> Nomi:</p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class=\"font-weight-light\"> 6.1 </p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t</div>\n" +
                    "\t\t\t\t<div class= \"row\">\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class= \"font-weight-bold\"> Preposizioni:</p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class=\"font-weight-light\"> 4.2 </p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t</div>\n" +
                    "\t\t\t\t<div class= \"row\">\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class= \"font-weight-bold\"> Articoli:</p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class=\"font-weight-light\"> 7 </p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t</div>\n" +
                    "\t\t\t\t<div class= \"row\">\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class= \"font-weight-bold\"> Congiunzioni:</p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class=\"font-weight-light\"> 6.02 </p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t</div>\n" +
                    "\t\t\t\t<div class= \"row\">\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class= \"font-weight-bold\"> Pronomi:</p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t<div class = \"col-sm-4\">\n" +
                    "\t\t\t\t\t\t<p class=\"font-weight-light\"> 4 </p> \n" +
                    "\t\t\t\t\t</div>\n" +
                    "\t\t\t\t</div>\n" +
                    "\t\t\t</li>\n" +
                    "\t\t</ul>\n" +
                    "\t</div>";
            }*/
            ret+="</div>";
            ret+=this.getFoot("");
            return ret;
    }


    private getMenu() : string {
        let ret =""+
            "<nav class=\"navbar navbar-expand-sm bg-dark navbar-dark\">" +
            "\t<div class=\"navbar-brand\">Colletta</div>" +
            "\t\t<button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsibleNavbar\">" +
            "\t\t\t<span class=\"navbar-toggler-icon\"></span>" +
            "\t\t</button>" +
            "\t<div class=\"collapse navbar-collapse\" id=\"collapsibleNavbar\">"+
            "\t\t<ul class=\"navbar-nav mr-auto\">";
            if(this.userKind===UserKind.student) {
                ret += ""+
                    "\t\t\t<li class=\"nav-item\">\n" +
                    "\t\t\t\t<a id=\"toProgress\" href= \"#progress\" class=\"nav-link\" >I tuoi progressi</a>\n" +
                    "\t\t\t</li>\n";
            }
            else{//insegnante
                ret += ""+
                    "\t\t\t<li class=\"nav-item\">\n" +
                    "\t\t\t\t<a href= \"#\" class=\"nav-link\" >Area classi</a>\n" +
                    "\t\t\t</li>\n"+
                    "<li class=\"nav-item\">\n" +
                    //href= "/exercise/insert" credo
                    "\t\t\t\t<a href= \"#\" class=\"nav-link\" onclick='document.getElementById(\"insertExerciseForm\").classList.toggle(\"d-none\")'>Crea esercizio</a>\n" +
                    "\t\t\t</li>\n";
            }
        ret+="\t\t</ul>";
        //aggiungo login o logout
        ret+=this.getLoginArea();
        ret+="\t</div>" +
            "</nav>";
        ret +=
            "<form method='post' action='/exercise/insert' id='insertExerciseForm' class='d-none'>" +
            "   <div>" +
            "       <input type='text' name='sentence'/>" +
            "       <button type='submit'>Invia</button>" +
            "   </div>" +
            "</form>";
        return ret;
    }

    private getLoginArea() : string {

        if(this.profileController.isLoggedIn()){
            return "" +
                "        <form class='form-inline' action='/logout'>" +
                "           <div class=\"form-group\">" +
                "               <button type=\"submit\" class=\"btn btn-primary btn-block\">Logout</button>" +
                "           </div>" +
                "        </form>";
        }
        else{
            let ret ="";
            ret += "" +
                "        <form class='form-inline my-2 my-lg-0' method ='post' action='/checklogin'>";
            if(this.profileController.isLoginInvalid()){
                ret+="<p class='text-danger m-1 p-1'>username o password invalidi</p>";
            }
            ret+="           <div class=\"form-group\">" +
                "               <input type=\"text\" class=\"form-control mr-sm-2\" name='username' placeholder=\"Username\" required=\"required\">" +
                "           </div>" +
                "           <div class=\"form-group\">" +
                "               <input type=\"password\" class=\"form-control mr-sm-2\" name='password' placeholder=\"Password\" required=\"required\">" +
                "           </div>" +
                "           <div class=\"form-group\">" +
                "               <button type=\"submit\" class=\"btn btn-outline-success my-2 my-sm-0\">Login</button>" +
                "           </div>" +
                "        </form>";
            return ret;
        }
    }
}
export {ProfileView};