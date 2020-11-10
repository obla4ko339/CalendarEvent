import React, { FormHTMLAttributes } from 'react';
import ApiRequest from './apiRequest'
import RenderListEvent from './RenderListEvent'
import HteSelect from './Form/Select'
import ListBuild from '../ListBuild'
import './static/style.css'
import { FormatInputPathObject } from 'path';

interface ListEventsINTERFACE {
    listEvent:any,
    dateStart:any,
    dateEnd:any,
    listBuild:any,
    listBild:any,
    buildId_event:string,
    listBuildArray:Array<any>,
    getUserId:any
}




export default class ListEvents extends React.Component<{},ListEventsINTERFACE>{
    
    requestUrl:Object
    startDate:string
    endDate:string
    buildEventID:string
    build_id:string
    objParamsFilter = {}
    

    constructor(props:ListEventsINTERFACE){ 
        super(props)
        this.state = {listEvent:null, dateStart:null, dateEnd:null, listBuild:null, listBild:null,buildId_event:"", listBuildArray:[], getUserId:0 }
        this.renderApi = this.renderApi.bind(this)
        this.renderBuildListApi = this.renderBuildListApi.bind(this)
        this.fetchApi = this.fetchApi.bind(this)
        this.requestUrl = {}
        this.build_id = ""
        this.startDate = ""
        this.endDate = ""
        this.buildEventID = ""
        this.objParamsFilter = {}
    }

    componentDidMount(){
        this.fetchApi()
        this.fetchApiSelectBuild()
        this.FetchGetUserId()
    }

   

    /* Получение списка учреждений*/
    fetchApiSelectBuild(){
        let urlString = "http://event.kultura-to.ru/wp-content/plugins/hach-tag-event/api/request-data.php?getData=listBuild"
        let apiObject = new ApiRequest(urlString, "",this.renderBuildListApi)
        apiObject.fethJSON()
    }
    renderBuildListApi(data:any){
        this.setState({listBild:data})
        
    }
    /* Получение списка учреждений*/


    fetchApi(dateS:any = null, dateE:any = null, buildID:any = null){
        let urlString = "http://event.kultura-to.ru/wp-content/plugins/hach-tag-event/api/request-data.php?getData=allData"
        for(let val in dateS){
            urlString += `&${val}=${dateS[val]}`
        }
        let apiObject = new ApiRequest(urlString, "",this.renderApi)
        apiObject.fethJSON()
        
    }

    
    
    

    renderApi(data:any){
        this.setState({listEvent:data})
    }

    xe=(e:any)=>{
        console.log(e.currentTarget.dataset.datefield)
        let valueFotGet = e.currentTarget.value
        if (e.currentTarget.dataset.datefield == "buildID"){
            valueFotGet = e.currentTarget.dataset.idbuild
        }
        this.objParamsFilter = {
                ...this.objParamsFilter, ...{[e.currentTarget.dataset.datefield]:valueFotGet}
            }
        this.fetchApi(this.objParamsFilter)
    }

    getDateStart=()=>{
        let dateNow = new Date()
        console.log(dateNow.getFullYear()+"-0"+dateNow.getMonth()+"-0"+dateNow.getDay())
        return dateNow.getFullYear()+"-0"+dateNow.getMonth()+"-0"+dateNow.getDay()
    }

    //Получение iD польхователя для отрисовки дерева учреждений
    FetchGetUserId=()=>{
        let urlString = "http://event.kultura-to.ru/wp-content/plugins/hach-tag-event/api/request-data.php?getData=getUserId"
        console.log(urlString)
        let apiObject = new ApiRequest(urlString, "",this.GetUserId)
        apiObject.fethJSON()
    }

    GetUserId=(data:any)=>{
        this.setState({getUserId:data})
        console.log(this.state.getUserId)
    }
    //Получение iD польхователя для отрисовки дерева учреждений
    

    render(){
        return(
            <div className="container_listEvents">
            <div>
                <ListBuild arrayListBuild={[this.state.listBild]} getIdBuild={this.xe} currentUser={this.state.getUserId} />
            </div>
                <div>
                    <form action="">
                        <div className="conainer_filter">
                            <div>
                               <input type="date" name="" id="dateStart" data-datefield="dateStart"  onChange={(e)=>this.xe(e)}/>
                            </div>
                            <div>
                               <input type="date" name="" id="dateEnd" data-datefield="dateEnd" onChange={(e)=>this.xe(e)}/>
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