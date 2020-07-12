import React from 'react'
import { isArray } from 'util';

interface PropsListBuild{
    arrayListBuild:Array<any>
}

export default class ListBuild extends React.Component<PropsListBuild, {}>{

    constructor(props:any){
        super(props)

        this.build_tree = this.build_tree.bind(this)
    }


    build_tree_Recurs=(arrayList:Array<any>, parent_id:number)=>{
        console.log(arrayList)
        return(
            <div>
                {
                   isArray(arrayList) && (typeof(arrayList[parent_id]) != "undefined" && arrayList[parent_id] !== null) ?
                       <ul  className='treeCSS'>
                       {arrayList[0][parent_id].map((val:any, index:number)=>(
                               <li><span className='build_name' data-idbuild={val.build_ID} data-idparent={val.build_PARENT_ID}><span id='title_build'>{val.build_name}</span></span>
                               {this.build_tree_Recurs(arrayList, val.build_ID) }
                               </li>
                       ))}
                      
                           </ul>
                    : ""
                }   
            </div>
        )
    }



    build_tree(arrayList:Array<any>, parent_id:number){
        let tree = ""
        if( isArray(arrayList) && (typeof(arrayList[parent_id]) != "undefined" && arrayList[parent_id] !== null) ){ 
            tree += "<ul  class='treeCSS'>";
            arrayList[0][parent_id].map((val:any, index:number)=>{
                    tree += "<li><span class='build_name' data-idbuild='"+val.build_ID+"' data-idparent='"+val.build_PARENT_ID+"'><span id='title_build'>"+val.build_name+"</span></span>";
                    
                    tree += this.build_tree(arrayList, val.build_ID);  
                    tree += "</li>";
            })
           
                tree +="</ul>";
        }
    }




    render(){
        return(
            <div>
            <div></div>
                {this.build_tree_Recurs(this.props.arrayListBuild, 0)}
            </div>
        )
    }
}