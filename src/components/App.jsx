import React,{ Component } from 'react';
import ReactDOM from 'react-dom';

import Profile from './github/profile.jsx';
import Search from './github/search.jsx';

class App extends Component{
      
      constructor(props){
           super(props)
           this.state = {
               username:'bradtraversy',
               userData:[],
               userRepos:[],
               perPage:10
           }     
      }
      
    getUserData(){
        $.ajax({
            url:'https://api.github.com/users/'+this.state.username+'?client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret,
            dataType:'json',
            cache:false,
            success:function(data){
                this.setState({userData:data});
            }.bind(this),
            error:function(xhr,status,err){
                this.setState({userName: null});
                alert(err);
            }.bind(this)
        })
    }
    
    getUserRepos(){
        $.ajax({
            url:'https://api.github.com/users/'+this.state.username+'/repos?per_page='+this.state.perPage+'&client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret+'&sore=created',
            dataType:'json',
            cache:false,
            success:function(data){
                this.setState({userRepos:data});
            }.bind(this),
            error:function(xhr,status,err){
                this.setState({userName: null});
                alert(err);
            }.bind(this)
        })
    }
    
    componentDidMount(){
        this.getUserData();
        this.getUserRepos();
    }
    
    handleFormSubmit(username){
        
        this.setState({username:username},function(){
             this.getUserData();
            this.getUserRepos();
        });
        
    }
   render(){
           return(
               <div>
                   <Search  onFormSubmit= {this.handleFormSubmit.bind(this)} />
                   <Profile {...this.state} />
               </div>
           )
       }
}

App.propTypes = {
    clientId:React.PropTypes.string,
    clientSecret:React.PropTypes.string
};

App.defaultProps = {
    clientId :  '3611781a757878c1cae5',
    clientSecret: 'f6eb8898861a100488c67520ab8c71973a5bd00a'
}
export default App;