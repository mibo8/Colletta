import {PageView} from "./PageView";
import {ProfilePresenter} from "../presenter/ProfilePresenter";

class ProfileView extends PageView{

    private profileController :ProfilePresenter;
    constructor(app : any){
        super();
        this.profileController= new ProfilePresenter(this);
        this.profileController.update(app);
    }

    public getPage() {
        let ret = this.getHead();
            ret +=this.getMenu();
        ret +="<div class=\"container\">" +
            "<p>Benvenuto nel tuo profilo</p>" +
            "<a href='/insert'>Inserisci un esercizio</a>" +
            "</div>";
            ret+=this.getFoot("");
            return ret;
    }


    private getMenu() : string {
        let ret ="<nav class=\"navbar navbar-expand-sm bg-dark navbar-dark\">" +
            "    <div class=\"navbar-brand\">Colletta</div>" +
            "    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsibleNavbar\">" +
            "        <span class=\"navbar-toggler-icon\"></span>" +
            "    </button>" +
            "    <div class=\"collapse navbar-collapse\" id=\"collapsibleNavbar\">"+
            "<ul class=\"navbar-nav mr-auto\">";
        for(let i in this.menuList) {
            //si esegue un passaggio alla OttoBit (^o^)
            ret += ""+
                "<li class=\"nav-item\">" +
                ""+
                "   <a class=\"nav-link\" href=\""+this.menuList[i].link+"\">"+this.menuList[i].name+"</a>" +
                "</li>";
        }
        ret+="</ul>";
        //aggiungo login o logout
        ret+=this.getLoginArea();
        ret+="    </div>" +
            "</nav>";
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
                ret+="<p class='red'>username o password invalidi</p>";
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