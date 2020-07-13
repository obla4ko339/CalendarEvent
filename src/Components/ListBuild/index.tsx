import React from 'react'
import { isArray } from 'util';


interface PropsListBuild{
    arrayListBuild:Array<any>,
    getIdBuild:any
}

export default class ListBuild extends React.Component<PropsListBuild, {}>{

    
    constructor(props:any){
        super(props)

        this.build_tree = this.build_tree.bind(this)
    }

    componentDidUpdate=()=>{
        
        let ul = document.querySelectorAll('.treeCSS > li:not(:only-child) ul, .treeCSS ul ul');
        
        for (let i = 0; i < ul.length; i++) {
            let div = document.createElement('div');
            
            div.className = 'drop';
            div.innerHTML = '+'; // картинки лучше выравниваются, т.к. символы на одном браузере ровно выглядят, на другом — чуть съезжают 
            ul[i].parentNode?.insertBefore(div, ul[i].previousSibling);
            
            
            div.onclick = function() {
                
                div.innerHTML = (div.innerHTML === "+" ? "−" : "+");
                div.className = (div.className === 'drop' ? 'drop dropM' : 'drop');
            }
        }
    } 



    build_tree_Recurs=(arrayList:any, parent_id:any)=>{
        if(arrayList == null) return false
        return(
            <>
                {
                   (typeof(arrayList[parent_id]) !== "undefined" && arrayList[parent_id] != null) ?
                       <ul  className='treeCSS'>
                       {arrayList[parent_id].map((val:any, index:number)=>(
                               <li><span className='build_name' data-idbuild={val.build_ID} data-idparent={val.build_PARENT_ID} data-datefield="buildID" onClick={(e)=>{return this.props.getIdBuild(e)}}><span id='title_build'>{val.build_name}</span></span>
                               {this.build_tree_Recurs(arrayList, parseInt(val.build_ID)) }
                               </li>
                       ))}
                      
                           </ul>
                    : ""
                }   

                
            </>

            
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
                
                {this.build_tree_Recurs(this.props.arrayListBuild[0], 0)}
            </div>
        )
    }
}