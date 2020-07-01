import React, { FormHTMLAttributes } from 'react';
import ApiRequest from './apiRequest'
import RenderListEvent from './RenderListEvent'
import './static/style.css'

interface ListEventsINTERFACE {
    listEvent:any,
    dateStart:any,
    dateEnd:any 
    

}

export default class ListEvents extends React.Component<{},ListEventsINTERFACE>{
    
    requestUrl:Object

    constructor(props:ListEventsINTERFACE){ 
        super(props)
        this.state = {listEvent:null, dateStart:null, dateEnd:null}
        this.renderApi = this.renderApi.bind(this)
        this.requestUrl = {}
        // let apiObject = new ApiRequest("http://event.kultura-to.ru/wp-content/plugins/hach-tag-event/api/request-data.php?getData=allData", "", this.renderApi )
        // let apiObject = new ApiRequest("http://event.kultura-to.ru/wp-content/plugins/hach-tag-event/api/request-data.php?getData=allData&dateStart=%222020-06-30%22&dateEnd=%222020-07-08%2015:00:00%22&build=121", "", this.renderApi )
        // apiObject.fethJSON()
        console.log("constructor")
    }

    componentDidMount(){
        let apiObject = new ApiRequest("http://event.kultura-to.ru/wp-content/plugins/hach-tag-event/api/request-data.php?getData=allData", "", this.renderApi )
        // let apiObject = new ApiRequest("http://event.kultura-to.ru/wp-content/plugins/hach-tag-event/api/request-data.php?getData=allData&dateStart=%222020-06-30%22&dateEnd=%222020-07-08%2015:00:00%22&build=121", "", this.renderApi )
        apiObject.fethJSON()
    }


    componentWillUpdate(){
        console.log("componentWillUpdate")
        let urlString = "http://event.kultura-to.ru/wp-content/plugins/hach-tag-event/api/request-data.php?getData=allData"
        if(this.state.dateStart){
            urlString += `&dateStart=${this.state.dateStart}`
        }
        if(this.state.dateEnd){
            urlString += `&dateEnd=${this.state.dateStart}`
        }
        // let apiObject = new ApiRequest(urlString, "",this.renderApi)
        // apiObject.fethJSON()
        console.log(urlString)
    }

    renderApi(data:any){
        this.setState({listEvent:data})
    }

    startDate(e:any){
        // let nameField = e.currentTarget.dataset.datefield
        let valueField = e.currentTarget.value
        this.setState({"dateStart":valueField})
    }

    endDate(e:any){
        let valueField = e.currentTarget.value
        this.setState({"dateEnd":valueField})
    }

    
    

    render(){

       console.log(this.state)
        return(
            <div className="container_listEvents">
                <div>
                    <form action="">
                        <div className="conainer_filter">
                            <div>
                               <input type="date" name="" id="" data-datefield="dateStart" onChange={(e)=>this.startDate(e)}/>
                            </div>
                            <div>
                               <input type="date" name="" id="" data-datefield="dateEnd" onChange={(e)=>this.endDate(e)}/>
                            </div>
                            <div>
                                <select name="" id="">
                                    <option value="">1</option>
                                    <option value="">1</option>
                                    <option value="">1</option>
                                    <option value="">1</option>
                                    <option value="">1</option>
                                </select>
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