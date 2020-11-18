import React from 'react';
import ApiRequest from '../apiRequest'


interface pBtnSelect{
    listA:[]
}


interface sBtnSelect{
    list:[]
}

interface btnEvent{
    btn_ID:number,
    btn_title:string,
    btn_alias:string,
    btn_default:string
}




export default class Multiselectbtn extends React.Component<pBtnSelect,sBtnSelect>{

    listData:[]

    constructor(props:any){
        super(props)
        this.listData = []
        this.state = {list:[]}
        
    }

   

   
  


    render(){
        return(
            <div>
                <select multiple name="btnEvent[]" id="btnEvent" defaultValue="1" className="btnEvent" >
                    
                    {
                        this.props.listA.map((item:btnEvent, index)=>(
                            <option value={item.btn_ID}>{item.btn_title}</option>
                        ))
                    }
                </select>
            </div>
        )
    }
}