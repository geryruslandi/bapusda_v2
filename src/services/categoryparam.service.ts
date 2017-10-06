import { Injectable} from "@angular/core";

@Injectable()
export class catParamServices{
    public param = "";
    setParam(param){
        this.param = param;
    }
    getParam(){
        return this.param
    }
}