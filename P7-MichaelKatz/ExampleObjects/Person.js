var grobjects = grobjects || [];

var Person = undefined;


(function () {
    "use strict";

    var shaderProgram = undefined;
    var bodyBuffers = undefined;
    var larmBuffers = undefined;
    var rarmBuffers = undefined;
    var llegBuffers = undefined;
    var rlegBuffers = undefined;
    Person = function Person(name) {
        this.name = name;
        this.position =  [0,0,-4.0];
        this.size = 1.0;    
        this.color = [.9,.3,.4];
    }
    Person.prototype.init = function(drawingState){
    	var gl=drawingState.gl;
    	if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["cube-vs", "cube-fs"]);
        }

        if(!bodyBuffers){
            var px = .2;
            var py = .55;
            var pz = .125;
            var nx = -.2;
            var ny = 0;
            var nz = -.125;
        	var arrays = {
                 vpos : { numComponents: 3, data: [
                    nx,ny,pz,  nx,py, pz,  px,py,pz,  px, ny,pz, //front body
                    nx,ny,nz,  nx,py, nz,  px,py,nz,  px, ny,nz, // Back body
                    px,ny,pz,  px,py, pz,  px,py,nz,  px, ny,nz,
                    nx,ny,pz,  nx,py, pz,  nx,py,nz,  nx, ny,nz,
                    px,py,nz,  px,py, pz,  nx,py,pz,  nx, py,nz,
                    px,ny,nz,  px,ny, pz,  nx,ny,pz,  nx, ny,nz,

                ] },
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
            py = .1;
            pz = .07;
            nx = 0;
            ny = -.3;
            nz = -.07;
            var arrays = {
                 vpos : { numComponents: 3, data: [
                    nx,ny,pz,  nx,py, pz,  px,py,pz,  px, ny,pz, //front body
                    nx,ny,nz,  nx,py, nz,  px,py,nz,  px, ny,nz, // Back body
                    px,ny,pz,  px,py, pz,  px,py,nz,  px, ny,nz,
                    nx,ny,pz,  nx,py, pz,  nx,py,nz,  nx, ny,nz,
                    px,py,nz,  px,py, pz,  nx,py,pz,  nx, py,nz,
                    px,ny,nz,  px,ny, pz,  nx,ny,pz,  nx, ny,nz,

                ] },
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
                rarmBuffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);   
                px = 0;
                py = .1;
                pz = .07
                nx = -.1;
                ny = -.3;
                nz = -.07;
                var arrays = {
                    vpos : { numComponents: 3, data: [
                    nx,ny,pz,  nx,py, pz,  px,py,pz,  px, ny,pz, //front body
                    nx,ny,nz,  nx,py, nz,  px,py,nz,  px, ny,nz, // Back body
                    px,ny,pz,  px,py, pz,  px,py,nz,  px, ny,nz,
                    nx,ny,pz,  nx,py, pz,  nx,py,nz,  nx, ny,nz,
                    px,py,nz,  px,py, pz,  nx,py,pz,  nx, py,nz,
                    px,ny,nz,  px,ny, pz,  nx,ny,pz,  nx, ny,nz,

                ] },
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
                larmBuffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);
                px = .15;
                py = 0;
                pz = .07
                nx = .05;
                ny = -.5;
                nz = -.07;
                var arrays = {
                    vpos : { numComponents: 3, data: [
                    nx,ny,pz,  nx,py, pz,  px,py,pz,  px, ny,pz, //front body
                    nx,ny,nz,  nx,py, nz,  px,py,nz,  px, ny,nz, // Back body
                    px,ny,pz,  px,py, pz,  px,py,nz,  px, ny,nz,
                    nx,ny,pz,  nx,py, pz,  nx,py,nz,  nx, ny,nz,
                    px,py,nz,  px,py, pz,  nx,py,pz,  nx, py,nz,
                    px,ny,nz,  px,ny, pz,  nx,ny,pz,  nx, ny,nz,

                ] },
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
                llegBuffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);
                px = -.05;
                py = 0;
                pz = .07
                nx = -.15;
                ny = -.5;
                nz = -.07;
                var arrays = {
                    vpos : { numComponents: 3, data: [
                    nx,ny,pz,  nx,py, pz,  px,py,pz,  px, ny,pz, //front body
                    nx,ny,nz,  nx,py, nz,  px,py,nz,  px, ny,nz, // Back body
                    px,ny,pz,  px,py, pz,  px,py,nz,  px, ny,nz,
                    nx,ny,pz,  nx,py, pz,  nx,py,nz,  nx, ny,nz,
                    px,py,nz,  px,py, pz,  nx,py,pz,  nx, py,nz,
                    px,ny,nz,  px,ny, pz,  nx,ny,pz,  nx, ny,nz,

                ] },
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
                rlegBuffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);

        }
        this.state = 0; // in house
        this.lastTime = 0;
        this.ready = false;
        this.angle1 = 0;
        this.angle2 = 0;
        this.angleDirection = 0;
    };

    Person.prototype.draw = function(drawingState) {
        
        advance(this,drawingState);

        var modelM = twgl.m4.scaling([this.size,this.size,this.size]);
        var modelBody = twgl.m4.setTranslation(modelM,twgl.v3.add(this.position, [0,0.4,0]));
        var modelRightA = twgl.m4.setTranslation(modelM,twgl.v3.add(this.position,[0.2,0.8,0]));
        twgl.m4.rotateX(modelRightA, this.angle1, modelRightA);
        var modelLeftA = twgl.m4.setTranslation(modelM,twgl.v3.add(this.position,[-0.2,0.8,0]));
        twgl.m4.rotateX(modelLeftA, this.angle2, modelLeftA);
        var modelRightL = twgl.m4.setTranslation(modelM,twgl.v3.add(this.position,[0,0.5,0]));
        twgl.m4.rotateX(modelRightL, this.angle1, modelRightL);
        var modelLeftL = twgl.m4.setTranslation(modelM,twgl.v3.add(this.position,[0,0.5,0]));
        twgl.m4.rotateX(modelLeftL, this.angle2, modelLeftL);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        // Base of house
        twgl.setBuffersAndAttributes(gl,shaderProgram, bodyBuffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelBody });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, bodyBuffers);

        twgl.setBuffersAndAttributes(gl,shaderProgram, rarmBuffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelRightA});
        twgl.drawBufferInfo(gl, gl.TRIANGLES, rarmBuffers);

        twgl.setBuffersAndAttributes(gl,shaderProgram, larmBuffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelLeftA });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, larmBuffers);

        twgl.setBuffersAndAttributes(gl,shaderProgram, rlegBuffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelRightL });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, rlegBuffers);
         

        twgl.setBuffersAndAttributes(gl,shaderProgram, llegBuffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelLeftL });
        twgl.drawBufferInfo(gl, gl.TRIANGLES, llegBuffers);
        
    };
    Person.prototype.center = function(drawingState) {
        return this.position;
    }

    
    function advance(person, drawingState) {
        // on the first call, the copter does nothing
        if (!person.lastTime) {
            person.lastTime = drawingState.realtime;
            return;
        }
        var delta = drawingState.realtime - person.lastTime;
        person.lastTime = drawingState.realtime;

        // now do the right thing depending on state
        switch (person.state) {
            case 0:
                if(person.wait > 0){
                    person.wait -= delta;
                }else{
                     person.wait = 500;
                     person.state = 1;
                 }
                break;
            case 1: // walking from house
                if (person.position[2] <= 4.0) {
                    person.position[2] += 0.008;
                }else{
                    person.state = 2; //reached the end
                   
                }
                if(person.angleDirection == 0){
                    if(person.angle1 <= (Math.PI)/4){
                        person.angle1 += .05;
                        person.angle2 -= .05;
                    }else{
                        person.angleDirection = 1;
                    }
                }else{
                    if(person.angle1 >= -(Math.PI)/4){
                        person.angle1 -= .05;
                        person.angle2 += .05;
                    }else{
                        person.angleDirection = 0;
                    }
                }
                
                break;
            case 2: // at mailbox
                if(person.wait > 0){
                    person.wait -= delta;
                }else{
                    person.wait = 1000;
                    person.state = 3;
                }
                break;
            case 3: //walking back to house
                if (person.position[2] > -4.0) {
                    person.position[2] -= 0.008;
                if(person.angleDirection == 0){
                    if(person.angle1 <= (Math.PI)/4){
                        person.angle1 += .05;
                        person.angle2 -= .05;
                    }else{
                        person.angleDirection = 1;
                    }
                }else{
                    if(person.angle1 >= -(Math.PI)/4){
                        person.angle1 -= .05;
                        person.angle2 += .05;
                    }else{
                        person.angleDirection = 0;
                    }
                }
                }else{
                    person.state = 1; //reached the end
                    person.ready = false;
                }
                break;
            //     else {  // take off!
            //         heli.state = 1;
            //         heli.wait = 0;
            //     }
            //     break;
            // case 1: // taking off
            //     if (heli.position[1] < altitude) {
            //         var up = verticalSpeed * delta;
            //         heli.position[1] = Math.min(altitude,heli.position[1]+up);
            //     } else { // we've reached altitude - pick a destination
            //         var dest = randomHelipad(heli.lastPad);
            //         heli.lastPad = dest;
            //         // the direction to get there...
            //         heli.dx = dest.position[0] - heli.position[0];
            //         heli.dz = dest.position[2] - heli.position[2];
            //         heli.dst = Math.sqrt(heli.dx*heli.dx + heli.dz*heli.dz);
            //         if (heli.dst < .01) {
            //             // small distance - just go there
            //             heli.position[0] = dest.position[0];
            //             heli.position[2] = dest.position[2];
            //             heli.state = 4;
            //          } else {
            //             heli.vx = heli.dx / heli.dst;
            //             heli.vz = heli.dz / heli.dst;
            //         }
            //         heli.dir = Math.atan2(heli.dx,heli.dz);
            //         heli.state = 2;
            //     }
            //     break;
            // case 2: // spin towards goal
            //     var dtheta = heli.dir - heli.orientation;
            //     // if we're close, pretend we're there
            //     if (Math.abs(dtheta) < .01) {
            //         heli.state = 3;
            //         heli.orientation = heli.dir;
            //     }
            //     var rotAmt = turningSpeed * delta;
            //     if (dtheta > 0) {
            //         heli.orientation = Math.min(heli.dir,heli.orientation+rotAmt);
            //     } else {
            //         heli.orientation = Math.max(heli.dir,heli.orientation-rotAmt);
            //     }
            //     break;
            // case 3: // fly towards goal
            //     if (heli.dst > .01) {
            //         var go = delta * flyingSpeed;
            //         // don't go farther than goal
            //         go = Math.min(heli.dst,go);
            //         heli.position[0] += heli.vx * go;
            //         heli.position[2] += heli.vz * go;
            //         heli.dst -= go;
            //     } else { // we're effectively there, so go there
            //         heli.position[0] = heli.lastPad.position[0];
            //         heli.position[2] = heli.lastPad.position[2];
            //         heli.state = 4;
            //     }
            //     break;
            // case 4: // land at goal
            //     var destAlt = heli.lastPad.position[1] + .5 + heli.lastPad.helipadAltitude;
            //     if (heli.position[1] > destAlt) {
            //         var down = delta * verticalSpeed;
            //         heli.position[1] = Math.max(destAlt,heli.position[1]-down);
            //     } else { // on the ground!
            //         heli.state = 0;
            //         heli.wait = getRandomInt(500,1000);
            //     }
            //     break;
        }
    }
})();        
    grobjects.push(new Person("P1"));
  
