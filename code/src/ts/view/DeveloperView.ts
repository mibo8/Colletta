import {PageView} from "./PageView";
import {DeveloperPresenter} from "../presenter/DeveloperPresenter";

class DeveloperView extends PageView {
    private devPresenter :DeveloperPresenter;
    constructor(app : any) {
        super();
        this.devPresenter= new DeveloperPresenter(this);
        this.devPresenter.update(app);
    }

    async getPage() {
        let ret = "" +
            "<!DOCTYPE html>\n" +
            "<html lang=\"it\">\n" +
            "\t<head>\n" +
            "\t\t<meta charset=\"UTF-8\">\n" +
            "\t\t<title>"+this.title+"</title>\n" +
            "\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"/style.css\">\n" +
            "\t\t<!--bootstrap-->" +
            "\t\t<link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\">" +
            "\t\t<link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.7.0/css/all.css\" integrity=\"sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ\" crossorigin=\"anonymous\">" +
            "\t\t<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script>\n" +
            "\t\t<script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js\"></script>\n" +
            "\t\t<script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js\"></script>\n" +
            "\t</head>\n" +
            "<body>\n";
        ret += this.getMenu();
        ret += "" +
            "\t<div class='row container mx-auto'>\n"+
            "\t\t<div class=\"col-sm-8 mx-auto text-center\">";
        if(!this.devPresenter.isLoggedIn()) {
            let s = this.devPresenter.getMessage();
            if (s) {
                ret += "<p class='text-danger'>Password inserita non corretta</p>";
            }
            ret += "\t\t\t<form action='checkdeveloper' method='post'>" +
                "\t\t\t\t<input type=\"password\" class='form-control my-2' name=\"password\" placeholder=\"Inserisci la password dello sviluppatore\" required/>\n" +
                "\t\t\t\t<button type=\"submit\" class=\"btn btn-primary my-2 my-sm-0 w-25\">Invia</button>\n" +
                "\t\t\t</form>" +
                "\t\t</div>\n\t</div>\n";
        }
        else{//developer is loggedIn
            // @ts-ignore
            let annot = await this.devPresenter.getAllAnnotation("");
            let csv = await this.devPresenter.createCsvFromAnnotations(annot);
            //let csvContent =
            //let s=(JSON.stringify(annot)).replace(/"/g,'\\"');
            //let s='ciao"gino"ciao';
            //let s=csv.replace(/"/g,'\\"');
            let s=escape(csv);
            ret+="<button onclick='download_csv(\""+s+"\")' class=\"btn btn-primary my-2 my-sm-0 w-25\">Download</button>";
        }

        ret+=this.getFoot(this.getScript());

        return ret;
    }
    private getScript(){
        return"" +
            "function download_csv(csvContent){" +
            "alert(csvContent);"+
            "csvContent=unescape(csvContent);"+
            "var downloadLink = document.createElement(\"a\");\n" +
            "var blob = new Blob([\"\ufeff\", csvContent]);\n" +
            "var url = URL.createObjectURL(blob);\n" +
            "downloadLink.href = url;\n" +
            "downloadLink.download = \"annotations.csv\";\n" +
            "\n" +
            "document.body.appendChild(downloadLink);\n" +
            "downloadLink.click();\n" +
            "document.body.removeChild(downloadLink);"+



            /*
                "var encodedUri = encodeURI(csvContent);\n" +
                "var link = document.createElement(\"a\");\n" +
                "link.setAttribute(\"href\", encodedUri);\n" +
                "link.setAttribute(\"download\", \"my_data.csv\");\n" +
                "document.body.appendChild(link);\n" +
                "\n" +
                "link.click();"+
                */
            "}";
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
            ret += ""+
                "<li class=\"nav-item\">" +
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
        if(this.devPresenter.isLoggedIn()){
            return "" +
                "        <form class='form-inline my-2 my-lg-0' action='/logout'>\n" +
                "           <div class=\"form-group\">" +
                "               <a class=\"btn btn-default btn-circle btn-sm mr-4 pt-2\" href=\"/profile\" role=\"button\"><i class=\"fas fa-user-circle\" style=\"color: white; font-size:26px\"></i></a>\n" +
                "               <button type=\"submit\" class=\"btn-sm btn btn-primary my-2 my-sm-0\">Logout</button>\n" +
                "           </div>\n" +
                "        </form>\n";
        }
        return"";
    }
}

export {DeveloperView};