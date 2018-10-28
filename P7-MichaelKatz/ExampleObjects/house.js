var grobjects = grobjects || [];

var House = undefined;

function normal(p1, p2, p3){
  	var v3 = twgl.v3;
  	var u = v3.subtract(p2,p1);
  	var v = v3.subtract(p3,p1);
  	var result = v3.cross(u,v);
  	return result;
 };

(function() {
	"use strict";

	var shaderProgram = undefined;
    var baseBuf = undefined;
    var roofBuf1 = undefined;
    var roofBuf2 = undefined;
     

    House = function house(name, size){
    	this.name = name;
    	this.position = [0,0,-2.5];
    	this.size = size || 1.0;
    	this.houseColor = [0,1,1];
    	this.roofColor = [.35,.35,.35];
    }
    House.prototype.init = function(drawingState){
    	var gl=drawingState.gl;
        // create the shaders once - for all cubes
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["cube-vs", "cube-fs"]);
        }
        if (!baseBuf) {
        	var arrays = {
        	    vpos : {numComponents: 3, data: [ 
        			-.5, 0.01,.5,  -.5,1, .5,     .5,1, .5,      .5,0.01,.5,
					.5,1,-.5,      .5,1, .5,      .5,0.01,.5,    .5,0.01,-.5,
					-.5,1,-.5,	   -.5,1, .5,     -.5, 0.01,.5,  -.5,0.01,-.5,
					-.5,0.01,-.5,  -.5,1,-.5,     .5,1,-.5,      .5,0.01,-.5,
					-.5,0.01,-.5,  -.5, 0.01,.5,  .5,0.01,.5,    .5,0.01,-.5,
					-.5,1, .5,     .5,1, .5,      0,1.3,.5,   
					-.5,1, .5,     .5,1, .5,      0,1.3,-.5,
        			
	   	  		]},
	   	  		 vnormal : {numComponents:3, data: [
                   	0,0,1,   0,0,1,   0,0,1,   0,0,1, // front
                   	1,0,0,   1,0,0,   1,0,0,   1,0,0, // right
                   	-1,0,0,  -1,0,0,  -1,0,0,  -1,0,0, // left
                   	0,0,-1,  0,0,-1,  0,0,-1,  0,0,-1, // back
                   	0,-1,0,  0,-1,0,  0,-1,0,  0,-1,0, //bottom
                   	0,0,1,   0,0,1,   0,0,1,
                   	0,0,-1,  0,0,-1,  0,0,-1,
                ]},

                indices : [0,1,2, 0,3,2, // front
                		   4,5,6, 4,7,6, // right
                		   8,9,10, 8,11,10, // left
                		   12,13,14, 12,15,14, // back
                		   16,17,18, 16,19,18,
                		   20, 21,22, 
                		   23,24,25,
                ]
	   	  	};
	   	  	baseBuf = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);
	   	  	var topRight = normal([0,1.3,.6],[.7,.9,.6],[.7,.9,-.6]);
	   	  	var topLeft = normal([0,1.3,.6],[-.7,.9,.6],[-.7,.9,-.6]);
	   	  	var bottomRight = normal([0,1.15,.6],[.7,.75,.6],[.7,.75,-.6]);
	   	  	var bottomLeft = normal([0,1.15,.6],[-.7,.75,.6],[-.7,.75,-.6]);
	   	  	var arrays = {
        			vpos : {numComponents: 3, data: [ 
        									// House base
        			  	  					// Roof Right
	  	  				0,1.3,.6,   .7,.9,.6,    .7,.9,-.6,    0,1.3,-.6, // top right
	  	  				0,1.3,.6,   -.7,.9,.6,   -.7,.9,-.6,   0,1.3,-.6, // top left
	  	  				0,1.15,.6,  .7,.75,.6,   .7,.75,-.6,   0,1.15,-.6, // bottom right
						0,1.15,.6,  -.7,.75,.6,  -.7,.75,-.6,  0,1.15,-.6, // bottom left
						.7,.9,.6,   .7,.9,-.6,   .7,.75,.6,    .7,.75,-.6, // right side
						-.7,.9,.6,  -.7,.9,-.6,  -.7,.75,.6,   -.7,.75,-.6,  // left side
	   	  			]},

	   	  		 	vnormal : {numComponents:3, data: [
                    	topRight[0],topRight[1],topRight[2],
                    	topRight[0],topRight[1],topRight[2],
                    	topRight[0],topRight[1],topRight[2],
                    	topRight[0],topRight[1],topRight[2],
                    	topLeft[0],topLeft[1],topLeft[2],
                    	topLeft[0],topLeft[1],topLeft[2],
                    	topLeft[0],topLeft[1],topLeft[2],
                    	topLeft[0],topLeft[1],topLeft[2],
                    	bottomRight[0],bottomRight[1],bottomRight[2],// top right
                    	bottomRight[0],bottomRight[1],bottomRight[2],
                    	bottomRight[0],bottomRight[1],bottomRight[2],
                    	bottomRight[0],bottomRight[1],bottomRight[2],
                    	bottomLeft[0],bottomLeft[1],bottomLeft[2],
                    	bottomLeft[0],bottomLeft[1],bottomLeft[2],
                    	bottomLeft[0],bottomLeft[1],bottomLeft[2],
                    	bottomLeft[0],bottomLeft[1],bottomLeft[2],
                    	1,0,0,  1,0,0,  1,0,0,  1,0,0, //right side
                    	-1,0,0, -1,0,0, -1,0,0, -1,0,0,//left side

                	]},
                	indices : [0,1,2, 0,3,2, // top right
                			   4,5,6, 4,7,6, // top left
                			   8,9,10, 8,11,10, // bottom right
                			   12,13,14, 12,15,14, // bottom left
                			   16,17,18, 17,18,19, // right side
                			   20,21,22, 21,22,23, // left side
                            ]
	   	  	};
	   	  	roofBuf1 = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);
	   	  	var arrays = {
        			vpos : {numComponents: 3, data: [ 
						0,1.3,.6,   0,1.15,.6,   .7,.9,.6,     .7,.75,.6,
						0,1.3,.6,   0,1.15,.6,   -.7,.9,.6,    -.7,.75,.6,
						0,1.3,-.6,  0,1.15,-.6,  .7,.9,-.6,    .7,.75,-.6,
						0,1.3,-.6,  0,1.15,-.6,  -.7,.9,-.6,   -.7,.75,-.6
	   	  			]},

	   	  		 	vnormal : {numComponents:3, data: [
                    	0,0,1,  0,0,1,  0,0,1,  0,0,1,  
                    	0,0,1,  0,0,1, 0,0,1,   0,0,1,//front 
                    	0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1, 
                    	0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1,//back

                	]},
                	indices : [0,1,2, 1,2,3,
                			   4,5,6, 5,6,7,
                			   8,9,10, 9,10,11,
                			   12,13,14, 13,14,15,
                            ]
	   	  	};
	   	  	roofBuf2 = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);
	   	  }	   	
    };
	
    House.prototype.draw = function(drawingState) {
        // we make a model matrix to place the cube in the world
        var modelM = twgl.m4.scaling([this.size,this.size,this.size]);
        var modelView = twgl.m4.multiply(modelM, drawingState.camera);
        var normalMat = twgl.m4.transpose(twgl.m4.inverse(modelView));
        twgl.m4.setTranslation(modelM,this.position,modelM);
        
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        // Base of house
        twgl.setBuffersAndAttributes(gl,shaderProgram, baseBuf);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.houseColor, model: modelM, normalM:normalMat});
        twgl.drawBufferInfo(gl, gl.TRIANGLES, baseBuf);
        // right side of roof
        twgl.setBuffersAndAttributes(gl,shaderProgram,roofBuf1);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.roofColor, model: modelM, normalM:normalMat});
        twgl.drawBufferInfo(gl, gl.TRIANGLES, roofBuf1);

        twgl.setBuffersAndAttributes(gl,shaderProgram,roofBuf2);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.roofColor, model: modelM, normalM:normalMat});
        twgl.drawBufferInfo(gl, gl.TRIANGLES, roofBuf2);
    };
    House.prototype.center = function(drawingState) {
        return this.position;
    }


    
	
})();

grobjects.push(new House("house", 3.0));