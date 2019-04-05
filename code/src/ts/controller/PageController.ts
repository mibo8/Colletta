//import {PageView} from "../view/PageView";

import {Client} from "../model/Client";

abstract class PageController{
    protected view: any;
    protected client : Client;
    constructor(view : any ){
        this.view=view;
        this.client =  (new Client.builder()).build();
    }
    abstract update(app : any) : void;
    /*
    //forse è un idea
    setView(view:any) : void{
        this.view=view;
    }*/

}
export {PageController};