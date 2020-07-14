import { isString } from "util";

export default class ApiRequest{

    apiURL:string;
    requestData:string
    handler:Function



    constructor(apiURL:string, requestData:string, handler:Function){
        this.apiURL = apiURL
        this.requestData = requestData
        this.handler = handler
    }

    requstPost(){
        if(isString(this.requestData)){
            return this.requestData
        }
    }

    //get
    fethJSONget(){
        fetch(this.apiURL, {
            method:"get",
        })
    }

    //post
    fethJSON(){
        fetch(this.apiURL, {
            method:"post",
            body:this.requstPost()
        })
        .then((response)=>response.json())
        .then((result)=>this.handler(result))

    }
}

