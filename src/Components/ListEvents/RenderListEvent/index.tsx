import React from 'react';

interface renderListEventINTERFACE{
    list:any
}

export default class RenderListEvent extends React.Component<renderListEventINTERFACE>{

    constructor(props:renderListEventINTERFACE){
        super(props)
    }


       render(){
        if(!this.props.list) return false

           return(
               <div>
                   <div></div>
                   {console.log(this.props.list)}
                   <div>
                       <table className="tableListEvent">
                       {this.props.list.map((v:any, index:any)=>
                       <tr key={index} data-listID={v.list_ID} data-listBuild={v.list_build} className="containerListEvents">
                            <td >{v.list_adress}</td>
                            <td >{v.list_cat}</td>
                            <td >{v.list_city}</td>
                            <td >{v.list_datetime_end   }</td>
                            <td >{v.list_datetime_start}</td>
                            <td >{v.list_desc}</td>
                            <td >{v.list_duration}</td>
                            <td >{v.list_email}</td>
                            <td >{v.list_old}</td>
                            <td >{v.list_person}</td>
                            <td >{v.list_telephone}</td>
                            <td >{v.list_title}</td>
                            <td >{v.list_web}</td>
                            </tr>
                       )}
                       </table>
                   </div>
               </div>
           )
       } 

}