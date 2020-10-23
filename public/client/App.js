import React from 'react';
import axios from 'axios';
import Rss from './Rss';
import './App.css';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      data : [],//array
    }
    this.getData = this.getData.bind(this);
    this.displayData = this.displayData.bind(this);
  }

  componentDidMount(){
    this.getData();
  }
  
  getData(){
      axios.get(`/recipients`)
      .then((res) => res.data)
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((dom) => {
        console.log(dom);
        const items = dom.querySelectorAll("item");
        console.log(items)
        var arr = []
        items.forEach(el => {
          arr.push(el)
        });
        this.setState({data : arr})
      });
    };
  
  displayData(){
    axios.post('/recipients')
  }

  render(){
    return(
      <div>
        <Rss items = {this.state.data}/>
      </div>
    )
  }
}

export default App;
