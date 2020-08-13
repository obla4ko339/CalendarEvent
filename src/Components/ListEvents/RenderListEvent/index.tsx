import React from 'react';
import ApiRequest from '../apiRequest'

interface renderListEventINTERFACE{
    list:any
}

interface StateRenderListEventINTERFACE{
    loading:boolean
}

export default class RenderListEvent extends React.Component<renderListEventINTERFACE, StateRenderListEventINTERFACE>{

    dateMonthNode:any

    constructor(props:renderListEventINTERFACE){
        super(props)
        this.state = {loading:true}

        this.dateMonthNode = ""
    }

    productionEvent(data:any){
        
        let trNode = data.currentTarget.parentNode.parentNode
        //уникальный ключ события
        let listId = trNode.dataset.listid
        //уникальный ключ учреждения
        let listbuild = trNode.dataset.listbuild
        //значение 1 означеь событие включаено - изначальнро оно включается
        let isturnon = 1
        
        this.dateMonthNode = document.getElementById("dateStart")
        let cssturnOn = data.currentTarget
        if(cssturnOn.classList.contains("isTurnFalse")){
            cssturnOn.classList.remove("isTurnFalse")
            cssturnOn.classList.add("isTurnTrue")
        }else{
            cssturnOn.classList.add("isTurnFalse")
            cssturnOn.classList.remove("isTurnTrue")
        }
        let splitDate = trNode.dataset.startevent.split(" ")
        let dateMonth = splitDate[0].split("-")[1]
        let dateDay = splitDate[0].split("-")[2]
        let dateYear = splitDate[0].split("-")[0]
        let dateFull = splitDate[0]




        const infoTurnOnEvent = {
            "turnon_event_id":listId,
            "turnon_build_id":listbuild,
            "turnon_is":isturnon,
            "turnon_month":dateMonth,
            "turnon_day":dateDay,
            "turnon_year":dateYear,
            "turnon_date_all":dateFull
        }
        // console.log(infoTurnOnEvent)
        this.fetchRequestTurnEvent(infoTurnOnEvent)



    }

    fetchDBMobile(){
        let urlString = "http://kultura-to.ru/requestcalendar.php"
        
    }

    fetchRequestTurnEvent=(data:any)=>{
        let urlString = "http://event.kultura-to.ru/wp-content/plugins/hach-tag-event/api/request-data.php?getData=eventturnon"
        for(let val in data){
            urlString += `&${val}=${data[val]}`
        }
        let apiObject = new ApiRequest(urlString, "",()=>{}) 
        apiObject.fethJSONget()
    }

    componentDidMount(){
        this.setState({loading:false})
    }


       render(){
        if(!this.props.list) return false

        if(this.state.loading)  return  ( <div> Идет загрузка...</div>)
        

           return(
               <div className="container_Event_list">
                   
                   <div>
                       <table className="tableListEvent wp-list-table widefat  striped users"  >
                       <thead>
                        <tr>
                            <th>№</th>
                            <th>Название</th>
                            <th>Дата начала</th>
                            <th>Дата Окончания</th>
                            <th>Описание</th>
                            <th>Учреждение</th>
                        </tr>
                       </thead>
                       <tbody>
                       {this.props.list.map((v:any, index:any)=>
                       <tr key={index} data-listID={v.list_ID} data-listBuild={v.list_build} data-startEvent={v.list_datetime_start} className="containerListEvents">
                            <td>{index+1}</td>
                            <td >{v.list_title}</td>
                            <td >{v.list_datetime_start}</td>
                            <td >{v.list_datetime_end   }</td>
                            <td >{v.list_desc}</td>
                            <td >{v.build_name}</td>
                            <td><span className="material-icons iconevent list_build_edit">create</span></td>
                            <td><span className="material-icons iconevent list_build_delete">delete_forever</span></td>
                            <td><span className={v.turnon_is == 1 ? "material-icons iconevent list_build_production isTurnTrue" : "material-icons iconevent list_build_production isTurnFalse"} onClick={(e)=>this.productionEvent(e)}>thumb_up</span></td>
                            
                            </tr>
                       )}
                       {this.props.list.length < 1 ? "Данных нет" : ""}
                       </tbody>
                       </table>
                   </div>
               </div>
           )
       } 

}