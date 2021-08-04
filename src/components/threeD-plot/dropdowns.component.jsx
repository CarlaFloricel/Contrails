import React from 'react';
import * as d3 from 'd3';
import $, { get } from 'jquery'
import {sliderHorizontal} from 'd3-simple-slider'
import './dropdown-panel.style.css'

import Col from 'react-bootstrap/Col'

import dataRegistry from '../data-component/dataRegistry.json'

import {loader, getMin, getMax, getData, getRawData, getRangeData} from "./dataHandler.js"


class DropDowns extends React.Component {

    constructor(){
        super();
        this.slider = []

        this.filter = ["temp", 'ice', "diameter", "ice_d"]
        // diameter is 10^9
    }  
    
    componentDidMount(){
      const self = this
      if(this.props.area === 'top'){
        loader(1, 2.31, 'temp').then(function(){
          // console.log("data loaded")
          // self.data = getData();

          self.createDropDown(1)
        })
      }else if (this.props.area === 'bottom'){
        loader(6, 1.52, 'temp').then(function(){
          // console.log("data loaded")
          // self.data = getData();

          self.createDropDown(6)
        })

      }
      
    }

    createDropDown = (member) =>{
      // console.log(dataRegistry)
      const self = this;
      let timesteps = dataRegistry[(member - 1)].timeSteps;
      let id = `#${self.props.area}`

      d3.select(id).append("div")
                    .attr("class", "row")
                    .attr("id", `upper${self.props.area}`)

      d3.select(id).append("div")
                    .attr("class", "row")
                    .attr("id", `lower${self.props.area}`)

      let upperID = `#upper${self.props.area}`

      let lowerID = `#lower${self.props.area}`

      d3.select(upperID).append('select')
                        .attr('class', "members form-control-sm form-control")
                        .attr("id", `member${this.props.area}`)
                        .on('change', function(){
                            let member = this.value
                            self.updateDropdown(member)
                            console.log("i am triggered")
                        })
                        .selectAll('option')
                        .data(dataRegistry)
                        .enter()
                        .append('option')
                        .attr('id', function(d){ return d.ensembleMember})
                        .attr("value", function(d){return d.ensembleMember})
                        .property('selected', function(d){
                            if(d.ensembleMember === member){
                                return true;
                            }else{
                                return false;
                            }
                        })
                        .text((d) => {return "Member : "+d.ensembleMember})
      // console.log($(`#member${this.props.area}`))

      d3.select(upperID).append('button')
                        .attr('class', `btn${this.props.area} btn btn-light btn-sm`)
                        .attr("style","margin-left:5px" )
                        .attr('id', "play-pause-btn")
                        .attr('value', 'play')
                        .text('Play')

      self.createSlider(member)

      let keys = Object.keys(this.props.colormaps)
      d3.select(lowerID).append('select')
                      .attr('class', "members form-control-sm form-control")
                      .attr("id", `color${this.props.area}`)
                      .on('change', function(d){
                        // console.log(this.value)
                        // console.log(self.props.selectColormap)
                        self.props.selectColormap(this.value)
                          
                      })
                      .selectAll('option')
                      .data(keys)
                      .enter()
                      .append('option')
                      .attr('id', function(d){ return d})
                      .attr("value", function(d){return d})
                      .text((d) => {return d})


      d3.select(lowerID).append('select')
                      .attr('class', "members form-control-sm form-control")
                      .attr("id", `filter${this.props.area}`)
                      .attr("style","margin-left:5px" )
                      .on('change', function(){
                        let file = +(d3.format('.2f')(self.slider.value()));
                        let folder = +($(`#member${self.props.area}`).val());
                        // console.log(file, folder)
                        self.updateSlider(file, folder);
                      })
                      .selectAll('option')
                      .data(this.filter)
                      .enter()
                      .append('option')
                      .attr('id', function(d){ return d})
                      .attr("value", function(d){return d})
                      .text((d) => {return d})

      

      d3.select(lowerID).append('div')
                      .attr('class', 'slider-svg')
                      .attr("id", `rangeslider${this.props.area}`)

      self.createRangeSlider()   

    }

    createRangeSlider = () =>{
      // Range
      const self = this;
      let member = +($(`#member${self.props.area}`).val());
      let timestep = +(d3.format('.2f')(self.slider.value()));
      let filter = $(`#filter${self.props.area}`).val();
      let dataRange;
      // change this line later
      if(member === 14 || member === 15 || member === 16){
        dataRange = getRangeData(member, timestep, filter);
      }else{
        dataRange = [getMin(), getMax()];
        console.log(dataRange)
      }
      // let min = getMin()
      // let max = getMax()
      // console.log(min, max)
      let sliderRange = sliderHorizontal()
                      .min(dataRange[0])
                      .max(dataRange[1])
                      .width(100)
                      .tickFormat(d3.format('0.2f'))
                      .ticks(3)
                      .default([dataRange[0], dataRange[1]])
                      .fill('#2196f3')
                      .on('onchange', val => {
                        // d3.select('p#value-range').text(val.map(d3.format('.2%')).join('-'));
                        // console.log(val)
                      });

      d3.select(`#rangeslider${this.props.area}`)
                      .append('svg')
                      .attr('width', 150 )
                      .attr('height', 70)
                      .append('g')
                      .attr('transform', 'translate(30, 30)')
                      .call(sliderRange)

      d3.select(`#lower${self.props.area}`).append('button')
                      .attr('class', `filter${this.props.area} btn btn-light btn-sm`)
                      .attr('id', "play-pause-btn")
                      .attr('value', 'filter')
                      .text('Filter')
                      .on('click', function(){
                        
                        let range = sliderRange.value();
                        console.log(range)
                        let timestep = +(d3.format('.2f')(self.slider.value()));
                        // console.log(timestep)
                        let member = +($(`#member${self.props.area}`).val());
                        // console.log(member)
                        let filter = $(`#filter${self.props.area}`).val()
                        // console.log(filter)
                       
                        loader(member, timestep, filter).then(function(){
                          let rawData = getRawData()
                          let rawFilteredData = []
                          let create8bit = d3.scaleLinear()
                                            .range([0,255])
                                            .domain([d3.min(rawData), d3.max(rawData)])
                          // console.log(d3.min(rawData), d3.max(rawData)) 

                          let converRangeToRawData = d3.scaleLinear()
                                                        .range([d3.min(rawData), d3.max(rawData)])
                                                        .domain(dataRange)
                          // console.log(converRangeToRawData(range[0]), converRangeToRawData(range[1]))
                          rawData.forEach(d =>{
                          // console.log(d)
                            if(d >= converRangeToRawData(range[0]) && d <= converRangeToRawData(range[1])){
                              // console.log(d)
                              rawFilteredData.push(create8bit(d))
                              // count++
                            }else{
                              rawFilteredData.push(0)
                            }
                          })
                          let filteredData = new Uint8Array(rawFilteredData)
                          self.props.volumeRender(filteredData)                       
                          
                        })                         
                      })

    }

    createSlider = (member) =>{

      const self = this
      let container = d3.select(`#${this.props.area}`).node().parentNode.clientWidth;
      let select = d3.select(`#member${self.props.area}`).node().clientWidth;
      let button = d3.select(`.btn${this.props.area}`).node().clientWidth;
      let margin = select + button
      let width = container - margin * 1.75

      let list = dataRegistry[(member - 1)].timeSteps;

      self.slider = sliderHorizontal()
                      .min(d3.min(list))
                      .max(d3.max(list))
                      .default(list[0])
                      .ticks(list.length)
                      .tickValues(list)
                      .step(list[1] - list[0])
                      .tickPadding(0)
                      .width(width - 50)
                      .on('onchange', function(){
                          // let number = self.slider.value().toString()
                          // console.log(number)
                          let file = +(d3.format('.2f')(self.slider.value()));
                          let folder = +($(`#member${self.props.area}`).val());
                          // console.log(file, folder)
                          self.updateSlider(file, folder);
                          setTimeout(() => {
                            self.animation(self.slider)
                        }, 2000);
                          
                          
                      })

      d3.select(`.btn${self.props.area}`).on('click', function(d){
              if(this.value === 'play'){
                  d3.select(`.btn${self.props.area}`).attr('value', 'pause')
                                      .text('Pause')
                  setTimeout(() => {
                      self.animation(self.slider);                
                  }, 2000);
              }else if(this.value === 'pause'){
                  d3.select(`.btn${self.props.area}`).attr('value', 'play')
                                      .text('Play')
              }
              
          })

      d3.select(`#upper${self.props.area}`).append('svg')
                          .attr('class', 'slider-svg')
                          .attr("id", `slider${this.props.area}`)
                          .attr('width', width )
                          .attr('height', 70)
                          .append('g')
                          .attr('transform', 'translate(30, 30)')
                          .call(self.slider)
          
      
      }

  updateDropdown = ( member) => {
      const self= this
      let list = dataRegistry[member - 1].timeSteps;
      d3.select(`#slider${self.props.area}`).remove()
      this.createSlider(member)

      d3.select(`.btn${self.props.area}`).attr('value', 'play')
                                      .text('Play')

      loader(member, list[0], 'temp').then(function(){
        let data = getData();
        // self.data = data;
        self.props.volumeRender(data)
        d3.select(`#rangeslider${self.props.area}`).select('svg').remove()
        d3.select(`#lower${self.props.area}`).select('button').remove()
        self.createRangeSlider()
        
      })  

  }


  updateSlider = (file, folder) =>{
    const self = this;
    // console.log(file, folder)

    let filter = $(`#filter${self.props.area}`).val()
    // console.log(filter)

    loader(folder, file, filter).then(function(){
      let data = getData();
      // self.data = data;
      self.props.volumeRender(data)
      // console.log(getMax(), getMin())
      d3.select(`#rangeslider${self.props.area}`).select('svg').remove()
      d3.select(`#lower${self.props.area}`).select('button').remove()
      self.createRangeSlider()
      
    })

  }



  animation = (slider) =>{
    // console.log('animation slider is called')
      const self = this
      if( $(`.btn${self.props.area}`).val() === 'pause'){
          // setTimeout(() => {
              let currentValue = +(d3.format('.2f')(slider.value()))
              let folder = +($(`#member${self.props.area}`).val());
              // console.log("file ", currentValue, " folder", folder)
              // console.log("folder ", folder)
              let list = dataRegistry[folder - 1].timeSteps;
              let index = list.indexOf(currentValue)
              // console.log(list)
              let nextValue;
              if(index + 1 === list.length){
                  nextValue = list[0]
              }else{
                  nextValue = list[index + 1]
              }
              // console.log(currentValue, index, nextValue)
              slider.value(nextValue)
              // console.log("set time out")
          // }, 2500)
      }

  }



      render(){
        return(
          <Col xs={12} style={{height:'20vh', backgroundColor:'#31393F'}} id={`${this.props.area}`} >
                             
          </Col>
        )
      }

    }

    

export default DropDowns;