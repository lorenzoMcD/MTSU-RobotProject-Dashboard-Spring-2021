// this is code for the home page (dashboard)
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Agechart from '../components/Agechart'
import HighestLvlChart from '../components/HighestLvlChart'



class Home extends Component{


    render(){
        return(
        

            <div className="Home">
            
            <h1 className="display-3">This is the Homepage!</h1>
            
               
            {/* place Bchart and Rankchart in the view*/ }
                                    
            <Agechart/>
            <HighestLvlChart/>

            </div>
             
           
        )
    }


}
export default Home;