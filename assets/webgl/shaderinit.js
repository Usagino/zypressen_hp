export const vertex = `
#ifdef GL_ES
precision mediump float;
#endif

// これらは lib が設定する必須属性です。
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

// これらは lib がセットする必須のユニフォームであり、モデルビューと投影行列が含まれています。
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

// フラグメントシェーダに頂点座標とテクスチャ座標を渡したい場合は
varying vec3 vVertexPosition;
varying vec2 vTextureCoord;

void main() {
    vec3 vertexPosition = aVertexPosition;
    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

    // set the varyings
    vTextureCoord = aTextureCoord;
    vVertexPosition = vertexPosition;
}
`

export const fragment = `
#ifdef GL_ES
precision mediump float;
#endif

// get our varyings
varying vec3 vVertexPosition;
varying vec2 vTextureCoord;

// the uniform we declared inside our javascript
uniform float uTime;

// our texture sampler (default name, to use a different name please refer to the documentation)
uniform sampler2D uSampler0;

void main() {
  vec2 textureCoord = vec2(vTextureCoord.x, vTextureCoord.y);

  // displace our pixels along the X axis based on our time uniform
  // textures coords are ranging from 0.0 to 1.0 on both axis
  textureCoord.x += sin(textureCoord.y * 25.0) * cos(textureCoord.x * 25.0) * (cos(uTime / 50.0)) / 25.0;

  gl_FragColor = texture2D(uSampler0, textureCoord);
}
`
