var grobjects = grobjects || [];

var MailBox = undefined;


(function () {
    "use strict";

    var shaderProgram = undefined;
    var bodyBuffers = undefined;
    var postBuffers = undefined;
    MailBox = function MailBox(name) {
        this.name = name;
        this.position =  [.5,0,4];
        this.size = 1.0;    
        this.color = [.9,.3,.4];
    }
    MailBox.prototype.init = function(drawingState){
    	var gl=drawingState.gl;
    	if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["cube-vs", "cube-fs"]);
        }

        if(!bodyBuffers){
            var px = .2;
            var py = .95;
            var pz = .3;
            var nx = -.2;
            var ny = .6;
            var nz = -.3;
        	var arrays = {
                 vpos : { numComponents: 3, data: [
                    nx,ny,pz,  nx,py, pz,  px,py,pz,  px, ny,pz, //front body
					nx,ny,nz,  nx,py, nz,  px,py,nz,  px, ny,nz, // Back body
					px,ny,pz,  px,py, pz,  px,py,nz,  px, ny,nz,
					nx,ny,pz,  nx,py, pz,  nx,py,nz,  nx, ny,nz,
					px,py,nz,  px,py, pz,  nx,py,pz,  nx, py,nz,
					px,ny,nz,  px,ny, pz,  nx,ny,pz,  nx, ny,nz,

                ]},
                vnormal : {numComponents:3, data: [
                   	0,0,1, 0,0,1, 0,0,1, 0,0,1, // front body
                   	0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1, // back body
                   	1,0,0, 1,0,0, 1,0,0, 1,0,0,
                   	-1,0,0, -1,0,0, -1,0,0, -1,0,0,
                   	0,1,0, 0,1,0, 0,1,0, 0,1,0,
                   	0,-1,0, 0,-1,0, 0,-1,0, 0,-1,0,
                ]},
                indices : [ 0,1,2, 0,3,2, //front body
                			4,5,6, 4,7,6, //back body
                			8,9,10, 8,11,10, // right side
                			12,13,14, 12,15,14,
                			16,17,18, 16,19,18,
                			20,21,22, 20,23,22,
                				]
            };
            bodyBuffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);
            px = .1;
            py = .6;
            pz = .1;
            nx = -.1;
            ny = .01;
            nz = -.1;
            var arrays = {
                 vpos : { numComponents: 3, data: [
                    nx,ny,pz,  nx,py, pz,  px,py,pz,  px, ny,pz, //front body
                    nx,ny,nz,  nx,py, nz,  px,py,nz,  px, ny,nz, // Back body
                    px,ny,pz,  px,py, pz,  px,py,nz,  px, ny,nz,
                    nx,ny,pz,  nx,py, pz,  nx,py,nz,  nx, ny,nz,
                    px,py,nz,  px,py, pz,  nx,py,pz,  nx, py,nz,
                    px,ny,nz,  px,ny, pz,  nx,ny,pz,  nx, ny,nz,

                ]},
                vnormal : {numComponents:3, data: [
                    0,0,1, 0,0,1, 0,0,1, 0,0,1, // front body
                    0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1, // back body
                    1,0,0, 1,0,0, 1,0,0, 1,0,0,
                    -1,0,0, -1,0,0, -1,0,0, -1,0,0,
                    0,1,0, 0,1,0, 0,1,0, 0,1,0,
                    0,-1,0, 0,-1,0, 0,-1,0, 0,-1,0,
                ]},
                indices : [ 0,1,2, 0,3,2, //front body
                            4,5,6, 4,7,6, //back body
                            8,9,10, 8,11,10, // right side
                            12,13,14, 12,15,14,
                            16,17,18, 16,19,18,
                            20,21,22, 20,23,22,
                                ]
            };
            postBuffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);
        }
    };

    MailBox.prototype.draw = function(drawingState) {
        //advance(this,drawingState);
       var modelM = twgl.m4.scaling([this.size,this.size,this.size]);
        twgl.m4.setTranslation(modelM,this.position,modelM);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        // Base of house
        twgl.setBuffersAndAttributes(gl,shaderProgram, bodyBuffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelM });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, bodyBuffers);
        twgl.setBuffersAndAttributes(gl,shaderProgram, postBuffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelM });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, postBuffers);
        
    };
    MailBox.prototype.center = function(drawingState) {
        return this.position;
    }
})();        
    grobjects.push(new MailBox("Box1"));
  
