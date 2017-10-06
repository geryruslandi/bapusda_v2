import { Injectable} from "@angular/core";

@Injectable()
export class tokenService{
    public token = "";

    setToken(token){
        this.token = token;
    }

    getToken(){
        return this.token;
    }
}