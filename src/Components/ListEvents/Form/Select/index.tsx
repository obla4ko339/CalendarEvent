import React from 'react';

interface Hte_selectINTERFACE{
    listBuild:any
}

export default class Hte_select extends React.Component<Hte_selectINTERFACE,{}>{



    render(){
        if(!this.props.listBuild) return false
        return(
            <div>
                <select name="" id="">
                    {this.props.listBuild.map((value:any, index:number)=>
                        <option value={value.build_ID}>{value.build_name}</option>                    
                    )}
                </select>
            </div>
        )
    }
}