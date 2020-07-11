import React from 'react';

interface renderListEventINTERFACE{
    list:any
}

export default class RenderListEvent extends React.Component<renderListEventINTERFACE>{

    constructor(props:renderListEventINTERFACE){
        super(props)
    }

    productionEvent(data:any){
        let spanNode = data.currentTarget
        let trNode = data.currentTarget.parentNode.parentNode
        
    }


       render(){
        if(!this.props.list) return false

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
                        </tr>
                       </thead>
                       {this.props.list.map((v:any, index:any)=>
                       <tr key={index} data-listID={v.list_ID} data-listBuild={v.list_build} className="containerListEvents">
                            <td>{index+1}</td>
                            <td >{v.list_title}</td>
                            <td >{v.list_datetime_start}</td>
                            <td >{v.list_datetime_end   }</td>
                            <td >{v.list_desc}</td>
                            <td><span className="material-icons iconevent list_build_edit">create</span></td>
                            <td><span className="material-icons iconevent list_build_delete">delete_forever</span></td>
                            <td><span className="material-icons iconevent list_build_production" onClick={(e)=>this.productionEvent(e)}>thumb_up</span></td>
                            
                            </tr>
                       )}
                       {this.props.list.length < 1 ? "Данных нет" : ""}
                       </table>
                   </div>
               </div>
           )
       } 

}