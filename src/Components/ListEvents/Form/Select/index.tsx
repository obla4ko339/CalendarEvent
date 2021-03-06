import React, { ChangeEvent } from 'react';

interface Hte_selectINTERFACE{
    listBuild:any,
    ChangheSeleBuild(e:{}):any
}

interface StateHte_selectInterface{
    idBuild:string
}

export default class HteSelect extends React.Component<Hte_selectINTERFACE,StateHte_selectInterface>{

    objParamsFilter:{}

    constructor(props:Hte_selectINTERFACE){
        super(props)
        this.state={idBuild:""}
        this.objParamsFilter = {}
    }

    render(){
        if(!this.props.listBuild) return false
        return(
            <div>
                <select name="" id="" data-datefield="buildID" onChange={(e)=>{return this.props.ChangheSeleBuild(e)}} >
                <option >-</option>  
                    {this.props.listBuild.map((value:any, index:number)=>
                        <option value={value.build_ID}>{value.build_name}</option>                    
                    )}
                </select>
            </div>
        )
    }
}