import React from 'react';
import ApiRequest from '../apiRequest'



interface sBtnSelect{
    list:[]
}



export default class Multiselectbtn extends React.Component<{},sBtnSelect>{

    listData:[]

    constructor(props:any){
        super(props)
        this.listData = []
        this.fetchData()
    }

    componentWillMount(){
        console.log("componentWillMount")
    }


    //request get all btn

    fetchData=()=>{
        let urlString = "http://event.kultura-to.ru/wp-content/plugins/hach-tag-event/api/request-data.php?getData=getBtnEvent"
        let apiObject = new ApiRequest(urlString, "",(data:any)=>{
            // this.resultData(data)
            this.listData = data
        })
        apiObject.fethJSON()
    }

    resultData(data:any):Array<any>{
        this.listData = data 
        return data
    }


    render(){

        console.log(this.listData)
        return(
            <div>
                <select name="" id="">
                    <option value=""></option>
                    {
                        this.listData.map((item, index)=>(
                            <option value="">{index}</option>
                        ))
                    }
                </select>
            </div>
        )
    }
}