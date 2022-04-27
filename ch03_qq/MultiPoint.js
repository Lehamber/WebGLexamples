// MultiPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute float a_SplitIndex;\n' +
  'varying vec4 v_Color;\n' + 
  'void main() {\n' +
  ' vec2 a = vec2(0.4, 0.2);\n' + 
  ' vec2 b = vec2(2.0, 3.0);\n' + 
  ' vec2 c = a * (b.transfo);\n' + 
  '     gl_Position = vec4(c, 0.0, 1.0);\n' +
  '  gl_PointSize = 30.0;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;\n' + 
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n';

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Write the positions of vertices to a vertex shader
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the positions of the vertices');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0, 0, 0, 1);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw three points
  // gl.drawArrays(gl.LINE_STRIP, 0, n);
  gl.drawArrays(gl.POINTS, 0, n);
}

function initVertexBuffers(gl) {
  var vertices = new Float32Array([
        -0.5, 0.5, 0.5, 0.5, 0.0, 0.2, -0.5, -0.5, 0.5, -0.5
  ]);

  var splitIndexs = new Float32Array(5).fill(0);
  splitIndexs[2] = 0.9;
  splitIndexs[0] = 0.1;
  splitIndexs[1] = 0.1;
  splitIndexs[2] = 0.1;

  var n = 5; // The number of vertices

  var FSIZE = vertices.BYTES_PER_ELEMENT;

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();

  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

    var splitBuffer = new gl.createBuffer();
  if (!splitBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // // Bind the buffer object to target
  // gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // // Write date into the buffer object
  // gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

  // if ( a_Position < 0) {
  //   console.log('Failed to get the storage location of a_Position');
  //   return -1;
  // }

  // // Assign the buffer object to a_Position variable
  // gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  // // gl.[vertexAttribPointer](a_SplitIndex, 1, gl.FLOAT, false, 0, 0);
  // console.log('a_Position:', a_Position);
  // // Enable the assignment to a_Position variable
  // gl.enableVertexAttribArray(a_Position); 

  /**** */
  // var splitIndexs = new Float32Array(5).fill(0);
  // splitIndexs[2] = 1.0;

  // // Write date into the buffer object
  // gl.bindBuffer(gl.ARRAY_BUFFER, splitBuffer);
  // gl.bufferData(gl.ARRAY_BUFFER, splitIndexs, gl.STATIC_DRAW);

  // var a_SplitIndex = gl.getAttribLocation(gl.program, 'a_SplitIndex');
  
  // if (a_SplitIndex < 0) {
  //   console.log('Failed to get the storage location of a_SplitIndex');
  //   return -1;
  // }
  // console.log('a_SplitIndex:', a_SplitIndex);

  // gl.vertexAttribPointer(a_SplitIndex, 1, gl.FLOAT, false, 0, 0);
  // gl.enableVertexAttribArray(a_SplitIndex);

  return n;
}
