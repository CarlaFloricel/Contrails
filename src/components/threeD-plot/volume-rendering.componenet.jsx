import React from 'react';
import * as d3 from 'd3'

import {vec2, vec3, mat4} from 'gl-matrix'

import {vertShader, fragShader} from "./shader-srcs.js"

import {Shader,ArcballCamera,Controller} from "./webgl-util.js"

import DropDowns from './dropdowns.component'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

class VolumeRendering extends React.Component {
    constructor(){
        super();

        this.cubeStrip = [
          1, 1, 0,
          0, 1, 0,
          1, 1, 1,
          0, 1, 1,
          0, 0, 1,
          0, 1, 0,
          0, 0, 0,
          1, 1, 0,
          1, 0, 0,
          1, 1, 1,
          1, 0, 1,
          0, 0, 1,
          1, 0, 0,
          0, 0, 0
        ];

        this.canvas = null;
        this.gl = null;
        this.shader = null;
        this.volumeTexture = null;
        this.colormapTex = null;

        this.proj = null;
        this.camera = null;
        this.projView = null;
        this.tabFocused = true;
        this.newVolumeUpload = true;
        this.targetFrameTime = 32;
        this.samplingRate = 1.0;
        this.WIDTH = 640;
        this.HEIGHT = 480;

        this.defaultEye = vec3.set(vec3.create(), 0.5, 0.5, 1.7);
        this.center = vec3.set(vec3.create(), 0.5, 0.5, 0.5);
        this.up = vec3.set(vec3.create(), 0.0, 1.0, 0.0);


        this.colormaps = {
          "Cool_Warm": "https://raw.githubusercontent.com/CarlaFloricel/Contrails/master/src/components/threeD-plot/colormaps/cool-warm-paraview.png",
          "Matplotlib_Plasma": "https://raw.githubusercontent.com/CarlaFloricel/Contrails/master/src/components/threeD-plot/colormaps/matplotlib-plasma.png",
          "Matplotlib_Virdis": "https://raw.githubusercontent.com/CarlaFloricel/Contrails/master/src/components/threeD-plot/colormaps/matplotlib-virdis.png",
          "Rainbow": "https://raw.githubusercontent.com/CarlaFloricel/Contrails/master/src/components/threeD-plot/colormaps/rainbow.png",
          "Samsel_Linear_Green": "https://raw.githubusercontent.com/CarlaFloricel/Contrails/master/src/components/threeD-plot/colormaps/samsel-linear-green.png",
          "Samsel_Linear_YGB_1211G": "https://raw.githubusercontent.com/CarlaFloricel/Contrails/master/src/components/threeD-plot/colormaps/samsel-linear-ygb-1211g.png",
        };

        this.canvas = React.createRef();
    }  
    
    componentDidMount(){
      this.onLoad()
      this.selectVolume(this.props.data)
      
    }

    onLoad = () =>{
      const self = this;
      // get container dimensions and use them for scene sizing
      const width = d3.select(`.threeContainer${this.props.area}`).node().clientWidth;
      const height = d3.select(`.threeContainer${this.props.area}`).node().clientHeight;

      d3.select(`.threeContainer${this.props.area}`).append('canvas')
                            .attr('width', width)
                            .attr('height', height)
                            .attr('id', `glcanvas${this.props.area}`)

      this.canvas = document.getElementById(`glcanvas${this.props.area}`)
      this.gl = this.canvas.getContext("webgl2")

      if(!this.gl){
        console.log("Unable to initialize WebGL2. Your browser may not support it");
		    return;
      }

      this.WIDTH = this.canvas.getAttribute("width");
      this.HEIGHT = this.canvas.getAttribute("height");

      // console.log(this.WIDTH, this.HEIGHT)

      this.proj = mat4.perspective(mat4.create(), 60 * Math.PI / 180.0,
        this.WIDTH / this.HEIGHT, 0.1, 100);
      // console.log(this.proj)

      this.camera = new ArcballCamera(this.defaultEye, this.center, this.up, 2, [this.WIDTH, this.HEIGHT]);
      this.projView = mat4.create();

      // Register mouse and touch listeners
      let controller = new Controller();
      controller.mousemove = function(prev, cur, evt) {
        if (evt.buttons == 1) {
          self.camera.rotate(prev, cur);

        } else if (evt.buttons == 2) {
          self.camera.pan([cur[0] - prev[0], prev[1] - cur[1]]);
        }
      };
      controller.wheel = function(amt) { self.camera.zoom(amt); };
      controller.pinch = controller.wheel;
      controller.twoFingerDrag = function(drag) { this.camera.pan(drag); };

      controller.registerForCanvas(this.canvas);


      // Setup VAO and VBO to render the cube to run the raymarching shader
      let vao = this.gl.createVertexArray();
      this.gl.bindVertexArray(vao);

      let vbo = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.cubeStrip), this.gl.STATIC_DRAW);

      this.gl.enableVertexAttribArray(0);
      this.gl.vertexAttribPointer(0, 3, this.gl.FLOAT, false, 0, 0);

      this.shader = new Shader(this.gl, vertShader, fragShader);
      this.shader.use(this.gl);

      this.gl.uniform1i(this.shader.uniforms["volume"], 0);
      this.gl.uniform1i(this.shader.uniforms["colormap"], 1);
      this.gl.uniform1f(this.shader.uniforms["dt_scale"], 1.0);

      // Setup required OpenGL state for drawing the back faces and
      // composting with the background color
      this.gl.enable(this.gl.CULL_FACE);
      this.gl.cullFace(this.gl.FRONT);
      this.gl.enable(this.gl.BLEND);
      this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);

      // See if we were linked to a datset
      // if (window.location.hash) {
      // 	console.log(window.location.hash)
      // 	var linkedDataset = decodeURI(window.location.hash.substr(1));
      // 	if (linkedDataset in volumes) {
      // 		document.getElementById("volumeList").value = linkedDataset;
      // 	}
      // }

      // Load the default colormap and upload it, after which we
      // load the default volume.
      let colormapImage = new Image();
      colormapImage.onload = function() {
        // console.log("colormapImage")
        let colormap = self.gl.createTexture();
        self.gl.activeTexture(self.gl.TEXTURE1);
        self.gl.bindTexture(self.gl.TEXTURE_2D, colormap);
        self.gl.texStorage2D(self.gl.TEXTURE_2D, 1, self.gl.SRGB8_ALPHA8, 180, 1);
        self.gl.texParameteri(self.gl.TEXTURE_2D, self.gl.TEXTURE_MIN_FILTER, self.gl.LINEAR);
        self.gl.texParameteri(self.gl.TEXTURE_2D, self.gl.TEXTURE_WRAP_R, self.gl.CLAMP_TO_EDGE);
        self.gl.texParameteri(self.gl.TEXTURE_2D, self.gl.TEXTURE_WRAP_S, self.gl.CLAMP_TO_EDGE);
        self.gl.texSubImage2D(self.gl.TEXTURE_2D, 0, 0, 0, 180, 1,
          self.gl.RGBA, self.gl.UNSIGNED_BYTE, colormapImage);

        // self.selectVolume();
      };

      colormapImage.crossOrigin = "anonymous";
      colormapImage.src = 'https://raw.githubusercontent.com/CarlaFloricel/Contrails/nafiul-testing/src/components/threeD-plot/colormaps/cool-warm-paraview.png';

      // console.log(colormapImage)

    }

    selectVolume = (data) =>{
      // console.log(this.props.data)
      const self = this;
      let dataBuffer = data;

      //our data dimension is 100 can change later
      let volDims = [100,100,100];

      let tex = this.gl.createTexture();
      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.bindTexture(this.gl.TEXTURE_3D, tex);
      this.gl.texStorage3D(this.gl.TEXTURE_3D, 1, this.gl.R8, volDims[0], volDims[1], volDims[2]);
      this.gl.texParameteri(this.gl.TEXTURE_3D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
      this.gl.texParameteri(this.gl.TEXTURE_3D, this.gl.TEXTURE_WRAP_R, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_3D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_3D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
      this.gl.texSubImage3D(this.gl.TEXTURE_3D, 0, 0, 0, 0,
        volDims[0], volDims[1], volDims[2],
        this.gl.RED, this.gl.UNSIGNED_BYTE, dataBuffer);

      let longestAxis = Math.max(volDims[0], Math.max(volDims[1], volDims[2]));
      let volScale = [volDims[0] / longestAxis, volDims[1] / longestAxis,
        volDims[2] / longestAxis];

      this.gl.uniform3iv(this.shader.uniforms["volume_dims"], volDims);
      this.gl.uniform3fv(this.shader.uniforms["volume_scale"], volScale);

      this.newVolumeUpload = true;
      if (!this.volumeTexture) {
        this.volumeTexture = tex;
        setInterval(function() {
          // Save them some battery if they're not viewing the tab
          if (document.hidden) {
            return;
          }
          var startTime = performance.now();
          self.gl.clearColor(0.192, 0.223, 0.247, 1.0);
          self.gl.clear(self.gl.COLOR_BUFFER_BIT);

          // Reset the sampling rate and camera for new volumes
          if (self.newVolumeUpload) {
            self.camera = new ArcballCamera(self.defaultEye, self.center, self.up, 2, [self.WIDTH, self.HEIGHT]);
            self.samplingRate = 1.0;
            self.gl.uniform1f(self.shader.uniforms["dt_scale"], self.samplingRate);
          }
          self.projView = mat4.mul(self.projView, self.proj, self.camera.camera);
          self.gl.uniformMatrix4fv(self.shader.uniforms["proj_view"], false, self.projView);

          let eye = [self.camera.invCamera[12], self.camera.invCamera[13], self.camera.invCamera[14]];
          self.gl.uniform3fv(self.shader.uniforms["eye_pos"], eye);

          self.gl.drawArrays(self.gl.TRIANGLE_STRIP, 0, self.cubeStrip.length / 3);
          // Wait for rendering to actually finish
          self.gl.finish();
          let endTime = performance.now();
          let renderTime = endTime - startTime;
          let targetSamplingRate = renderTime / self.targetFrameTime;


          // If we're dropping frames, decrease the sampling rate
          if (!self.newVolumeUpload && targetSamplingRate > self.samplingRate) {
            self.samplingRate = 0.8 * self.samplingRate + 0.2 * targetSamplingRate;
            self.gl.uniform1f(self.shader.uniforms["dt_scale"], self.samplingRate);
          }

          self.newVolumeUpload = false;
          startTime = endTime;
        }, self.targetFrameTime);
      
      } else {
        this.gl.deleteTexture(this.volumeTexture);
        this.volumeTexture = tex;
      }

    }

    selectColormap = (selection) => {
      const self = this;
      let colormapImage = new Image();
      colormapImage.onload = function() {
        self.gl.activeTexture(self.gl.TEXTURE1);
        self.gl.texSubImage2D(self.gl.TEXTURE_2D, 0, 0, 0, 180, 1,
        self.gl.RGBA, self.gl.UNSIGNED_BYTE, colormapImage);
      };
      colormapImage.crossOrigin = "anonymous";
      colormapImage.src = self.colormaps[selection];
    }

      render(){
        return(
          <Col xs={12}>
            <Row>
              <DropDowns
                area={this.props.area}
                colormaps={this.colormaps}
                selectColormap={this.selectColormap}
                data={this.props.data}
                dataLoader={this.props.dataloader}
                volumeRender={this.selectVolume}
              /> 
            </Row>
            <Row>
                <Col xs={12} style={{height:'55vh', backgroundColor:'#31393F'}} className={`threeContainer${this.props.area}`}>
                </Col>                                    
            </Row>
        </Col>
        )
      }

    }

    

export default VolumeRendering;