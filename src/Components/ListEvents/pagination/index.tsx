import React, { ReactHTMLElement } from 'react';
import ApiRequest from '../apiRequest'

interface pList{
    listPage:[]
}

export default class Pagination extends React.Component<pList, {} >{

    // свойства по умолчанию
    pageDefault:number

    constructor(props:pList){
        super(props)
        this.pageDefault = 15
        console.log(this.props.listPage.length)
    }

    getPage(){
        let result = this.props.listPage.length
        return result
    }

    handlerListEventPage(){
        let resultPage = 0
        if(this.getPage() > this.pageDefault){
            resultPage = this.getPage() / this.pageDefault
        }
        return Math.ceil(resultPage) 
    }

    handlerPage(){
       
    }



    render(){
        //if(this.props.listPage.length == 0) return false

        return(
           
            <div>
                <div>
                    
                </div>
                {this.props.listPage.map((item:any, index:any)=>(
                    <div key={index}>{index}</div>
                )
                )}
            </div>
           
        )
    }
}