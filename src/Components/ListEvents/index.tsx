import React, { FormHTMLAttributes } from 'react';
import ApiRequest from './apiRequest'
import RenderListEvent from './RenderListEvent'
import Hte_select from './Form/Select'
import './static/style.css'

interface ListEventsINTERFACE {
    listEvent:any,
    dateStart:any,
    dateEnd:any,
    listBuild:any,
    listBild:any
    

}

export default class ListEvents extends React.Component<{},ListEventsINTERFACE>{
    
    requestUrl:Object
    startDate:string
    endDate:string
    

    constructor(props:ListEventsINTERFACE){ 
        super(props)
        this.state = {listEvent:null, dateStart:null, dateEnd:null, listBuild:null, listBild:null}
        this.renderApi = this.renderApi.bind(this)
        this.renderBuildListApi = this.renderBuildListApi.bind(this)
        this.fetchApi = this.fetchApi.bind(this)
        this.requestUrl = {}
        this.startDate = ""
        this.endDate = ""

        // let apiObject = new ApiRequest("http://event.kultura-to.ru/wp-content/plugins/hach-tag-event/api/request-data.php?getData=allData&dateStart=%222020-06-30%22&dateEnd=%222020-07-08%2015:00:00%22&build=121", "", this.renderApi )
        // apiObject.fethJSON()
        console.log("constructor")
    }

    componentDidMount(){
        this.fetchApi()
        this.fetchApiSelectBuild()
    }

    /* Получение списка учреждений*/
    fetchApiSelectBuild(){
        let urlString = "http://event.kultura-to.ru/wp-content/plugins/hach-tag-event/api/request-data.php?getData=listBuild"
        let apiObject = new ApiRequest(urlString, "",this.renderBuildListApi)
        apiObject.fethJSON()
    }
    renderBuildListApi(data:any){
        this.setState({listBild:data})
        console.log("renderApi")
    }
    /* Получение списка учреждений*/


    fetchApi(dateS:any = null, dateE:any = null){
        let urlString = "http://event.kultura-to.ru/wp-content/plugins/hach-tag-event/api/request-data.php?getData=allData"
        if(dateS){
            urlString += `&dateStart='${dateS}'`
        }
        if(dateE){
            urlString += `&dateEnd='${dateE}'`
        }
        let apiObject = new ApiRequest(urlString, "",this.renderApi)
        apiObject.fethJSON()
        console.log(urlString)
    }

    

    

    startDates(e:any){
        let nameField = e.currentTarget.dataset.datefield
        if(nameField === "dateStart"){
            this.startDate = e.currentTarget.value
        }
        if(nameField === "dateEnd"){
            this.endDate = e.currentTarget.value
        }
        this.fetchApi(this.startDate,this.endDate )
    }

  
    renderApi(data:any){
        this.setState({listEvent:data})
        console.log("renderApi")
    }
    

    render(){

       console.log(this.state)
        return(
            <div className="container_listEvents">
                <div>
                    <form action="">
                        <div className="conainer_filter">
                            <div>
                               <input type="date" name="" id="" data-datefield="dateStart" onChange={(e)=>this.startDates(e)}/>
                            </div>
                            <div>
                               <input type="date" name="" id="" data-datefield="dateEnd" onChange={(e)=>this.startDates(e)}/>
                            </div>
                            <div>
                                <Hte_select listBuild={this.state.listBild} />
                            </div>
                        </div>

                        <div className="containerRenderListEvent">
                            <RenderListEvent list={this.state.listEvent} />
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}