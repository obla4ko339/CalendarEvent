import React, { ReactHTMLElement } from 'react';
import ApiRequest from '../apiRequest'
import Pagination from '../pagination'
import Multiselectbtn from '../multiselectbtn'

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
        console.log(infoTurnOnEvent)
        this.fetchRequestTurnEvent(infoTurnOnEvent)



    }

    handlePhone(data:any){
        let trNode = data.currentTarget.parentNode.parentNode
        //уникальный ключ события
        let listId = trNode.dataset.listid
        //уникальный ключ учреждения
        let listbuild = trNode.dataset.listbuild
        //значение 1 означеь событие включаено - изначальнро оно включается
        let isturnon = 1

        // получить выбранное мероприятие 
        


        this.fetchRequestGetEventForMobile(listId)
        
        
        


    }


    deleteEvent=(data:any)=>{
        let trNode = data.currentTarget.parentNode.parentNode
        //уникальный ключ события
        let listId = trNode.dataset.listid
        //уникальный ключ учреждения
        let listbuild = trNode.dataset.listbuild
        //значение 1 означеь событие включаено - изначальнро оно включается
        let isturnon = 1

        const is_delete = window.confirm("Удалить мероприятие?")
        if(is_delete){
            
            let urlString = "http://event.kultura-to.ru/wp-content/plugins/hach-tag-event/api/request-data.php?getData=isdelteevent&isdelte="+data.currentTarget.parentNode.parentNode.dataset.listid
            let apiObject = new ApiRequest(urlString, "",(data:any)=>{
                this.fetchDBMobile(data)
            })
            apiObject.fethJSONget()
        }
    }

    //request for MOBILE
    fetchRequestGetEventForMobile=(listid:any)=>{
        
        let urlString = "http://event.kultura-to.ru/wp-content/plugins/hach-tag-event/api/request-data.php?getData=geteventfoid&idevent="+listid
        let apiObject = new ApiRequest(urlString, "",(data:any)=>{
            this.fetchDBMobile(data)
        })
        apiObject.fethJSON()
       
        
    }

  


    // request MOBILE
    fetchDBMobile=(data:any)=>{
        let urlString = "http://cors-anywhere.herokuapp.com/http://kultura-to.ru/requestcalendar.php?action=putevent&listevent="
        for(let val in data[0]){
            urlString += `&${val}="${data[0][val]}"`
        }

        let apiObject = new ApiRequest(urlString, "",(result:any)=>{
            console.log(result.res)
            if(result.res == 0){
                
                const is_delete = window.confirm("Мероприятие уже существует. Хотите удалить его ?")
                if(is_delete){
                    alert("Мероприятие удалено") 
                    this.fetchDelete(parseInt(data[0]['list_ID']))
                }
            }else{
                alert("Мероприятие добавлено")
            }
            this.fetchDBMobile(result)
        }) 
        apiObject.fethJSON()
    }
    // Delte event MOBILE
    fetchDelete=(data:number)=>{
        alert("Simple")
        let urlString = "http://kultura-to.ru/requestcalendar.php?action=eventdelete&id_event="+data
        let apiObject = new ApiRequest(urlString, "",()=>{}) 
        apiObject.fethJSON()
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
                            <td><span className="material-icons iconevent list_build_delete" onClick={(e)=>this.deleteEvent(e)}>delete_forever</span></td>
                            <td><span className={v.turnon_is == 1 ? "material-icons iconevent list_build_production isTurnTrue" : "material-icons iconevent list_build_production isTurnFalse"} onClick={(e)=>this.productionEvent(e)}>thumb_up</span></td>
                            <td><span className="material-icons  list_build_production iconevent is_phone_api" onClick={(e)=>this.handlePhone(e)}>phone_iphone</span></td>
                            <td><Multiselectbtn /></td> 
                            </tr>
                       )}
                       {this.props.list.length < 1 ? "Данных нет" : ""}
                        
                       </tbody>
                       </table>
                      <div>
                      <Pagination listPage={this.props.list} />
                      </div>
                   </div>
                        
                            
                       
               </div>
           )
       } 

}