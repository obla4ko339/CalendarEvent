import React from 'react';
import ApiRequest from './apiRequest'
import RenderListEvent from './RenderListEvent'
import HteSelect from './Form/Select'
import ListBuild from '../ListBuild'
import './static/style.css'

interface ListEventsINTERFACE {
    listEvent:any,
    dateStart:any,
    dateEnd:any,
    listBuild:any,
    listBild:any,
    buildId_event:string,
    listBuildArray:Array<any>
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
        this.state = {listEvent:null, dateStart:null, dateEnd:null, listBuild:null, listBild:null,buildId_event:"", listBuildArray:[] }
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
        console.log(urlString)
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
    

    render(){
        return(
            <div className="container_listEvents">
            <div>
                <ListBuild arrayListBuild={[this.state.listBild]} getIdBuild={this.xe} />
            </div>
                <div>
                    <form action="">
                        <div className="conainer_filter">
                            <div>
                               <input type="date" name="" id="" data-datefield="dateStart" onChange={(e)=>this.xe(e)}/>
                            </div>
                            <div>
                               <input type="date" name="" id="" data-datefield="dateEnd" onChange={(e)=>this.xe(e)}/>
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