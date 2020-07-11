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




    build_tree(arrayList:Array<any>, parent_id:number){
        let tree = ""
        if( isArray(arrayList) && (typeof(arrayList[parent_id]) != "undefined" && arrayList[parent_id] !== null) ){ 
            tree += "<ul  class='treeCSS'>";
            for(let val in arrayList){
                    // tree += "<li><span class='build_name' data-idbuild='"+val.build_ID+"' data-idparent='"+val.build_PARENT_ID+"'><span id='title_build'>"+val.build_name+"</span></span>";
                    
                    // tree += this.build_tree(arrayList, val.build_ID);  
                    // tree += "</li>";
                   
                        console.log(val)
                   
                }
           
                tree +="</ul>";
        }
        return tree;
    }




    render(){
        return(
            <div>
            <div></div>
                
                {this.build_tree(this.props.arrayListBuild, 0)}
            </div>
        )
    }
}