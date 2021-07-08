
import React, { Component } from "react";
import "./index.css";
const classNames = require('classnames');

export default class FootballMatchesData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedYear: null,
      totalMatches: null,
      data: [] 
    };
  }


  onClick = (year) => async (e) => {
    // Code written in next line is to take care of adding active class to selected year for css purpose.
    console.log(year, 'year');
    const response = await fetch("https://jsonmock.hackerrank.com/api/football_competitions?year="+year);
    const dataMatches = await response.json();
    console.log(dataMatches, 'dataMatches::');
    console.log(dataMatches.data.length, 'TotalMatches');
    this.setState({
      selectedYear: year,
      totalMatches: dataMatches.data.length,
      data: dataMatches.data
    })
  }

  render() {
    var years= [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    const totalMatches = this.state.totalMatches?this.state.data.length:this.state.totalMatches;
    const listMatches = []    
    if (totalMatches && totalMatches > 0 && this.state.data) {
      let i = 0;
      this.state.data.forEach(dataObject => {
        const keyStr = "key_"+i;
        listMatches.push(<li 
          className="slide-up-fade-in"
          key={keyStr}
          >
            Match {dataObject.name} won by {dataObject.winner}
          </li>);
          i++;
      });      
    }
    return (
      <div className="layout-row">
        <div className="section-title">Select Year</div>
        <ul className="sidebar" data-testid="year-list">
          {years.map((year, i) => {
            return (
              <li className={
                classNames({
                  'sidebar-item': true,
                  'active': this.state.selectedYear === year
                })
              }
              onClick={this.onClick(year)}
              key={year}>
                <a>{year}</a>
              </li>
            )
          })}
        </ul>
        <section className="content">
          { totalMatches > 0 && 
            <section>
                <div className="total-matches" data-testid="total-matches">Total matches: {this.state.totalMatches}</div>
              
                <ul className="mr-20 matches styled" data-testid="match-list">
                  {listMatches}
                </ul>            
            </section>
          }

          { totalMatches === 0 && 
            <div data-testid="no-result" className="slide-up-fade-in no-result">No Matches Found</div>
          }
        </section>
      </div>
    );
  }
}