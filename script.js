(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const u of a.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function r(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=r(n);fetch(n.href,a)}})();const v=document.getElementsByTagName("canvas")[0];le();let l={SIM_RESOLUTION:128,DYE_RESOLUTION:1024,CAPTURE_RESOLUTION:512,DENSITY_DISSIPATION:2.3,VELOCITY_DISSIPATION:.2,PRESSURE:.35,PRESSURE_ITERATIONS:20,CURL:0,SPLAT_RADIUS:.34,SPLAT_FORCE:6e3,SHADING:!1,COLORFUL:!1,COLOR_UPDATE_SPEED:10,PAUSED:!1,BACK_COLOR:{r:27,g:29,b:28},TRANSPARENT:!0,BLOOM:!0,BLOOM_ITERATIONS:8,BLOOM_RESOLUTION:256,BLOOM_INTENSITY:.11,BLOOM_THRESHOLD:.03,BLOOM_SOFT_KNEE:.7,SUNRAYS:!0,SUNRAYS_RESOLUTION:196,SUNRAYS_WEIGHT:.6};function z(){this.id=-1,this.texcoordX=0,this.texcoordY=0,this.prevTexcoordX=0,this.prevTexcoordY=0,this.deltaX=0,this.deltaY=0,this.down=!1,this.moved=!1,this.color = [56, 149, 255];}let re=!1,R=[],K=[];R.push(new z);const{gl:t,ext:E}=me(v);E.supportLinearFiltering||(l.DYE_RESOLUTION=512,l.SHADING=!1,l.BLOOM=!1,l.SUNRAYS=!1);he()&&(l.DYE_RESOLUTION=512,l.BLOOM=!0);function me(e){const i={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1};let r=e.getContext("webgl2",i);const o=!!r;o||(r=e.getContext("webgl",i)||e.getContext("experimental-webgl",i));let n,a;o?(r.getExtension("EXT_color_buffer_float"),a=r.getExtension("OES_texture_float_linear")):(n=r.getExtension("OES_texture_half_float"),a=r.getExtension("OES_texture_half_float_linear")),r.clearColor(0,0,0,1);const u=o?r.HALF_FLOAT:n.HALF_FLOAT_OES;let s,f,g;return o?(s=A(r,r.RGBA16F,r.RGBA,u),f=A(r,r.RG16F,r.RG,u),g=A(r,r.R16F,r.RED,u)):(s=A(r,r.RGBA,r.RGBA,u),f=A(r,r.RGBA,r.RGBA,u),g=A(r,r.RGBA,r.RGBA,u)),{gl:r,ext:{formatRGBA:s,formatRG:f,formatR:g,halfFloatTexType:u,supportLinearFiltering:a}}}function A(e,i,r,o){if(!de(e,i,r,o))switch(i){case e.R16F:return A(e,e.RG16F,e.RG,o);case e.RG16F:return A(e,e.RGBA16F,e.RGBA,o);default:return null}return{internalFormat:i,format:r}}function de(e,i,r,o){let n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,i,4,4,0,r,o,null);let a=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.checkFramebufferStatus(e.FRAMEBUFFER)==e.FRAMEBUFFER_COMPLETE}function he(){return/Mobi|Android/i.test(navigator.userAgent)}class Te{constructor(i,r){this.vertexShader=i,this.fragmentShaderSource=r,this.programs=[],this.activeProgram=null,this.uniforms=[]}setKeywords(i){let r=0;for(let n=0;n<i.length;n++)r+=nt(i[n]);let o=this.programs[r];if(o==null){let n=d(t.FRAGMENT_SHADER,this.fragmentShaderSource,i);o=ie(this.vertexShader,n),this.programs[r]=o}o!=this.activeProgram&&(this.uniforms=oe(o),this.activeProgram=o)}bind(){t.useProgram(this.activeProgram)}}class h{constructor(i,r){this.uniforms={},this.program=ie(i,r),this.uniforms=oe(this.program)}bind(){t.useProgram(this.program)}}function ie(e,i){let r=t.createProgram();return t.attachShader(r,e),t.attachShader(r,i),t.linkProgram(r),t.getProgramParameter(r,t.LINK_STATUS)||console.trace(t.getProgramInfoLog(r)),r}function oe(e){let i=[],r=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<r;o++){let n=t.getActiveUniform(e,o).name;i[n]=t.getUniformLocation(e,n)}return i}function d(e,i,r){i=xe(i,r);const o=t.createShader(e);return t.shaderSource(o,i),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)||console.trace(t.getShaderInfoLog(o)),o}function xe(e,i){if(i==null)return e;let r="";return i.forEach(o=>{r+="#define "+o+`
`}),r+e}const T=d(t.VERTEX_SHADER,`
    precision highp float;






    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`),Ee=d(t.VERTEX_SHADER,`
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        float offset = 1.33333333;
        vL = vUv - texelSize * offset;
        vR = vUv + texelSize * offset;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`),Re=d(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform sampler2D uTexture;

    void main () {
        vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
        sum += texture2D(uTexture, vL) * 0.35294117;
        sum += texture2D(uTexture, vR) * 0.35294117;
        gl_FragColor = sum;
    }
`),pe=d(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
    }
`),ge=d(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;

    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }
`),Se=d(t.FRAGMENT_SHADER,`
    precision mediump float;

    uniform vec4 color;

    void main () {
        gl_FragColor = color;
    }
`),De=d(t.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float aspectRatio;

    #define SCALE 25.0

    void main () {
        vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));
        float v = mod(uv.x + uv.y, 2.0);
        v = v * 0.1 + 0.8;
        gl_FragColor = vec4(vec3(v), 1.0);
    }
`),ye=`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform sampler2D uBloom;
    uniform sampler2D uSunrays;
    uniform sampler2D uDithering;
    uniform vec2 ditherScale;
    uniform vec2 texelSize;

    vec3 linearToGamma (vec3 color) {
        color = max(color, vec3(0));
        return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
    }

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;

    #ifdef SHADING
        vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;

        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);

        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);

        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
        c *= diffuse;
    #endif

    #ifdef BLOOM
        vec3 bloom = texture2D(uBloom, vUv).rgb;
    #endif

    #ifdef SUNRAYS
        float sunrays = texture2D(uSunrays, vUv).r;
        c *= sunrays;
    #ifdef BLOOM
        bloom *= sunrays;
    #endif
    #endif

    #ifdef BLOOM
        float noise = texture2D(uDithering, vUv * ditherScale).r;
        noise = noise * 2.0 - 1.0;
        bloom += noise / 255.0;
        bloom = linearToGamma(bloom);
        c += bloom;
    #endif

        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
    }
`,_e=d(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform vec3 curve;
    uniform float threshold;

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        float br = max(c.r, max(c.g, c.b));
        float rq = clamp(br - curve.x, 0.0, curve.y);
        rq = curve.z * rq * rq;
        c *= max(rq, br - threshold) / max(br, 0.0001);
        gl_FragColor = vec4(c, 0.0);
    }
`),Ae=d(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;

    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum;
    }
`),Le=d(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform float intensity;

    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum * intensity;
    }
`),Ue=d(t.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        vec4 c = texture2D(uTexture, vUv);
        float br = max(c.r, max(c.g, c.b));
        c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
        gl_FragColor = c;
    }
`),be=d(t.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float weight;

    #define ITERATIONS 16

    void main () {
        float Density = 0.3;
        float Decay = 0.95;
        float Exposure = 0.7;

        vec2 coord = vUv;
        vec2 dir = vUv - 0.5;

        dir *= 1.0 / float(ITERATIONS) * Density;
        float illuminationDecay = 1.0;

        float color = texture2D(uTexture, vUv).a;

        for (int i = 0; i < ITERATIONS; i++)
        {
            coord -= dir;
            float col = texture2D(uTexture, coord).a;
            color += col * illuminationDecay * weight;
            illuminationDecay *= Decay;
        }

        gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);
    }
`),Fe=d(t.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color; // This line defines the uniform color vector
    uniform vec2 point;
    uniform float radius;

    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * vec3(0.0, 0.0, 1.0); // Changed to blue
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }
`),Oe=d(t.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float dt;
    uniform float dissipation;

    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;

        vec2 iuv = floor(st);
        vec2 fuv = fract(st);

        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }

    void main () {
    #ifdef MANUAL_FILTERING
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        vec4 result = bilerp(uSource, coord, dyeTexelSize);
    #else
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
    #endif
        float decay = 1.0 + dissipation * dt;
        gl_FragColor = result / decay;
    }`,E.supportLinearFiltering?null:["MANUAL_FILTERING"]),we=d(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;

        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }

        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
`),Be=d(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
`),Ne=d(t.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;

    void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;

        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;

        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity += force * dt;
        velocity = min(max(velocity, -1000.0), 1000.0);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`),Pe=d(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
`),Ie=d(t.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`),m=(()=>(t.bindBuffer(t.ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),t.STATIC_DRAW),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),t.STATIC_DRAW),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(0),(e,i=!1)=>{e==null?(t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight),t.bindFramebuffer(t.FRAMEBUFFER,null)):(t.viewport(0,0,e.width,e.height),t.bindFramebuffer(t.FRAMEBUFFER,e.fbo)),i&&(t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT)),t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)}))();let x,c,q,k,_,j,U=[],X,ne;ze("LDR_LLL1_0.png");const O=new h(Ee,Re),Z=new h(T,pe),Y=new h(T,ge);new h(T,Se);new h(T,De);const B=new h(T,_e),w=new h(T,Ae),N=new h(T,Le),$=new h(T,Ue),G=new h(T,be),y=new h(T,Fe),p=new h(T,Oe),H=new h(T,we),V=new h(T,Be),b=new h(T,Ne),P=new h(T,Pe),I=new h(T,Ie),F=new Te(T,ye);function ae(){let e=C(l.SIM_RESOLUTION),i=C(l.DYE_RESOLUTION);const r=E.halfFloatTexType,o=E.formatRGBA,n=E.formatRG,a=E.formatR,u=E.supportLinearFiltering?t.LINEAR:t.NEAREST;t.disable(t.BLEND),x==null?x=W(i.width,i.height,o.internalFormat,o.format,r,u):x=ee(x,i.width,i.height,o.internalFormat,o.format,r,u),c==null?c=W(e.width,e.height,n.internalFormat,n.format,r,u):c=ee(c,e.width,e.height,n.internalFormat,n.format,r,u),q=S(e.width,e.height,a.internalFormat,a.format,r,t.NEAREST),k=S(e.width,e.height,a.internalFormat,a.format,r,t.NEAREST),_=W(e.width,e.height,a.internalFormat,a.format,r,t.NEAREST),Me(),Xe()}function Me(){let e=C(l.BLOOM_RESOLUTION);const i=E.halfFloatTexType,r=E.formatRGBA,o=E.supportLinearFiltering?t.LINEAR:t.NEAREST;j=S(e.width,e.height,r.internalFormat,r.format,i,o),U.length=0;for(let n=0;n<l.BLOOM_ITERATIONS;n++){let a=e.width>>n+1,u=e.height>>n+1;if(a<2||u<2)break;let s=S(a,u,r.internalFormat,r.format,i,o);U.push(s)}}function Xe(){let e=C(l.SUNRAYS_RESOLUTION);const i=E.halfFloatTexType,r=E.formatR,o=E.supportLinearFiltering?t.LINEAR:t.NEAREST;X=S(e.width,e.height,r.internalFormat,r.format,i,o),ne=S(e.width,e.height,r.internalFormat,r.format,i,o)}function S(e,i,r,o,n,a){t.activeTexture(t.TEXTURE0);let u=t.createTexture();t.bindTexture(t.TEXTURE_2D,u),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,a),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,a),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,r,e,i,0,o,n,null);let s=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,s),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,u,0),t.viewport(0,0,e,i),t.clear(t.COLOR_BUFFER_BIT);let f=1/e,g=1/i;return{texture:u,fbo:s,width:e,height:i,texelSizeX:f,texelSizeY:g,attach(L){return t.activeTexture(t.TEXTURE0+L),t.bindTexture(t.TEXTURE_2D,u),L}}}function W(e,i,r,o,n,a){let u=S(e,i,r,o,n,a),s=S(e,i,r,o,n,a);return{width:e,height:i,texelSizeX:u.texelSizeX,texelSizeY:u.texelSizeY,get read(){return u},set read(f){u=f},get write(){return s},set write(f){s=f},swap(){let f=u;u=s,s=f}}}function Ce(e,i,r,o,n,a,u){let s=S(i,r,o,n,a,u);return Z.bind(),t.uniform1i(Z.uniforms.uTexture,e.attach(0)),m(s),s}function ee(e,i,r,o,n,a,u){return e.width==i&&e.height==r||(e.read=Ce(e.read,i,r,o,n,a,u),e.write=S(i,r,o,n,a,u),e.width=i,e.height=r,e.texelSizeX=1/i,e.texelSizeY=1/r),e}function ze(e){let i=t.createTexture();t.bindTexture(t.TEXTURE_2D,i),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),t.texImage2D(t.TEXTURE_2D,0,t.RGB,1,1,0,t.RGB,t.UNSIGNED_BYTE,new Uint8Array([255,255,255]));let r={texture:i,width:1,height:1,attach(n){return t.activeTexture(t.TEXTURE0+n),t.bindTexture(t.TEXTURE_2D,i),n}},o=new Image;return o.onload=()=>{r.width=o.width,r.height=o.height,t.bindTexture(t.TEXTURE_2D,i),t.texImage2D(t.TEXTURE_2D,0,t.RGB,t.RGB,t.UNSIGNED_BYTE,o)},o.src=e,r}function Ye(){let e=[];l.SHADING&&e.push("SHADING"),l.BLOOM&&e.push("BLOOM"),l.SUNRAYS&&e.push("SUNRAYS"),F.setKeywords(e)}Ye();ae();let te=Date.now(),M=0;function Ge(){J(R[0],-1,0,0),ue()}function ue(){const e=He();le()&&ae(),Ve(e),We(),Ke(e),qe(null),requestAnimationFrame(ue),re=!0}function He(){let e=Date.now(),i=(e-te)/1e3;return i=Math.min(i,.016666),te=e,i}function le(){let e=D(v.clientWidth),i=D(v.clientHeight);return v.width!=e||v.height!=i?(v.width=e,v.height=i,!0):!1}function Ve(e){M+=e*l.COLOR_UPDATE_SPEED,M>=1&&(M=ot(M,0,1),R.forEach(i=>{i.color=Q()}))}function We(){K.length>0&&$e(K.pop()),R.forEach(e=>{e.moved&&(e.moved=!1,Ze(e))})}function Ke(e){t.disable(t.BLEND),V.bind(),t.uniform2f(V.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(V.uniforms.uVelocity,c.read.attach(0)),m(k),b.bind(),t.uniform2f(b.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(b.uniforms.uVelocity,c.read.attach(0)),t.uniform1i(b.uniforms.uCurl,k.attach(1)),t.uniform1f(b.uniforms.curl,l.CURL),t.uniform1f(b.uniforms.dt,e),m(c.write),c.swap(),H.bind(),t.uniform2f(H.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(H.uniforms.uVelocity,c.read.attach(0)),m(q),Y.bind(),t.uniform1i(Y.uniforms.uTexture,_.read.attach(0)),t.uniform1f(Y.uniforms.value,l.PRESSURE),m(_.write),_.swap(),P.bind(),t.uniform2f(P.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(P.uniforms.uDivergence,q.attach(0));for(let r=0;r<l.PRESSURE_ITERATIONS;r++)t.uniform1i(P.uniforms.uPressure,_.read.attach(1)),m(_.write),_.swap();I.bind(),t.uniform2f(I.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(I.uniforms.uPressure,_.read.attach(0)),t.uniform1i(I.uniforms.uVelocity,c.read.attach(1)),m(c.write),c.swap(),p.bind(),t.uniform2f(p.uniforms.texelSize,c.texelSizeX,c.texelSizeY),E.supportLinearFiltering||t.uniform2f(p.uniforms.dyeTexelSize,c.texelSizeX,c.texelSizeY);let i=c.read.attach(0);t.uniform1i(p.uniforms.uVelocity,i),t.uniform1i(p.uniforms.uSource,i),t.uniform1f(p.uniforms.dt,e),t.uniform1f(p.uniforms.dissipation,l.VELOCITY_DISSIPATION),m(c.write),c.swap(),E.supportLinearFiltering||t.uniform2f(p.uniforms.dyeTexelSize,x.texelSizeX,x.texelSizeY),t.uniform1i(p.uniforms.uVelocity,c.read.attach(0)),t.uniform1i(p.uniforms.uSource,x.read.attach(1)),t.uniform1f(p.uniforms.dissipation,l.DENSITY_DISSIPATION),m(x.write),x.swap()}function qe(e){l.BLOOM&&je(x.read,j),l.SUNRAYS&&(Je(x.read,x.write,X),Qe(X,ne,1)),e==null||!l.TRANSPARENT?(t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.enable(t.BLEND)):t.disable(t.BLEND),ke(e)}function ke(e){let i=e==null?t.drawingBufferWidth:e.width,r=e==null?t.drawingBufferHeight:e.height;F.bind(),l.SHADING&&t.uniform2f(F.uniforms.texelSize,1/i,1/r),t.uniform1i(F.uniforms.uTexture,x.read.attach(0)),l.BLOOM&&t.uniform1i(F.uniforms.uBloom,j.attach(1)),l.SUNRAYS&&t.uniform1i(F.uniforms.uSunrays,X.attach(3)),m(e)}function je(e,i){if(U.length<2)return;let r=i;t.disable(t.BLEND),B.bind();let o=l.BLOOM_THRESHOLD*l.BLOOM_SOFT_KNEE+1e-4,n=l.BLOOM_THRESHOLD-o,a=o*2,u=.25/o;t.uniform3f(B.uniforms.curve,n,a,u),t.uniform1f(B.uniforms.threshold,l.BLOOM_THRESHOLD),t.uniform1i(B.uniforms.uTexture,e.attach(0)),m(r),w.bind();for(let s=0;s<U.length;s++){let f=U[s];t.uniform2f(w.uniforms.texelSize,r.texelSizeX,r.texelSizeY),t.uniform1i(w.uniforms.uTexture,r.attach(0)),m(f),r=f}t.blendFunc(t.ONE,t.ONE),t.enable(t.BLEND);for(let s=U.length-2;s>=0;s--){let f=U[s];t.uniform2f(w.uniforms.texelSize,r.texelSizeX,r.texelSizeY),t.uniform1i(w.uniforms.uTexture,r.attach(0)),t.viewport(0,0,f.width,f.height),m(f),r=f}t.disable(t.BLEND),N.bind(),t.uniform2f(N.uniforms.texelSize,r.texelSizeX,r.texelSizeY),t.uniform1i(N.uniforms.uTexture,r.attach(0)),t.uniform1f(N.uniforms.intensity,l.BLOOM_INTENSITY),m(i)}function Je(e,i,r){t.disable(t.BLEND),$.bind(),t.uniform1i($.uniforms.uTexture,e.attach(0)),m(i),G.bind(),t.uniform1f(G.uniforms.weight,l.SUNRAYS_WEIGHT),t.uniform1i(G.uniforms.uTexture,i.attach(0)),m(r)}function Qe(e,i,r){O.bind();for(let o=0;o<r;o++)t.uniform2f(O.uniforms.texelSize,e.texelSizeX,0),t.uniform1i(O.uniforms.uTexture,e.attach(0)),m(i),t.uniform2f(O.uniforms.texelSize,0,e.texelSizeY),t.uniform1i(O.uniforms.uTexture,i.attach(0)),m(e)}function Ze(e){let i=e.deltaX*l.SPLAT_FORCE,r=e.deltaY*l.SPLAT_FORCE;ce(e.texcoordX,e.texcoordY,i,r,e.color)}function $e(e){for(let i=0;i<e;i++){const r=Q();r.r*=10,r.g*=10,r.b*=10;const o=Math.random(),n=Math.random(),a=1e3*(Math.random()-.5),u=1e3*(Math.random()-.5);ce(o,n,a,u,r)}}function ce(e,i,r,o,n){y.bind(),t.uniform1i(y.uniforms.uTarget,c.read.attach(0)),t.uniform1f(y.uniforms.aspectRatio,v.width/v.height),t.uniform2f(y.uniforms.point,e,i),t.uniform3f(y.uniforms.color,r,o,0),t.uniform1f(y.uniforms.radius,et(l.SPLAT_RADIUS/100)),m(c.write),c.swap(),t.uniform1i(y.uniforms.uTarget,x.read.attach(0)),t.uniform3f(y.uniforms.color,n.r,n.g,n.b),m(x.write),x.swap()}function et(e){let i=v.width/v.height;return i>1&&(e*=i),e}v.addEventListener("mousedown",e=>{let i=D(e.offsetX),r=D(e.offsetY),o=R.find(n=>n.id==-1);o==null&&(o=new z),J(o,-1,i,r)});v.addEventListener("mousemove",e=>{let i=R[0];i==null&&(i=new z,R.push(i));let r=D(e.offsetX),o=D(e.offsetY);se(i,r,o)});window.addEventListener("mouseup",()=>{fe(R[0])});v.addEventListener("touchstart",e=>{e.preventDefault();const i=e.targetTouches;for(;i.length>=R.length;)R.push(new z);for(let r=0;r<i.length;r++){let o=D(i[r].pageX),n=D(i[r].pageY);J(R[r+1],i[r].identifier,o,n)}});v.addEventListener("touchmove",e=>{e.preventDefault();const i=e.targetTouches;for(let r=0;r<i.length;r++){let o=R[r+1];if(!o.down)continue;let n=D(i[r].pageX),a=D(i[r].pageY);se(o,n,a)}},!1);window.addEventListener("touchend",e=>{const i=e.changedTouches;for(let r=0;r<i.length;r++){let o=R.find(n=>n.id==i[r].identifier);o!=null&&fe(o)}});window.addEventListener("keydown",e=>{e.code==="KeyP"&&(l.PAUSED=!l.PAUSED),e.key===" "&&K.push(parseInt(Math.random()*20)+5)});function J(e,i,r,o){e.id=i,e.down=!0,e.moved=!1,e.texcoordX=r/v.width,e.texcoordY=1-o/v.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=Q()}function se(e,i,r){re&&(e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=i/v.width,e.texcoordY=1-r/v.height,e.deltaX=tt(e.texcoordX-e.prevTexcoordX),e.deltaY=rt(e.texcoordY-e.prevTexcoordY),e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0)}function fe(e){e.down=!1}function tt(e){let i=v.width/v.height;return i<1&&(e*=i),e}function rt(e){let i=v.width/v.height;return i>1&&(e/=i),e}window.color=.09;function Q(){let e=it(window.color,1,1);return e.r*=.15,e.g*=.15,e.b*=.15,e}function it(e,i,r){let o,n,a,u,s,f,g,L;switch(u=Math.floor(e*6),s=e*6-u,f=r*(1-i),g=r*(1-s*i),L=r*(1-(1-s)*i),u%6){case 0:o=r,n=L,a=f;break;case 1:o=g,n=r,a=f;break;case 2:o=f,n=r,a=L;break;case 3:o=f,n=g,a=r;break;case 4:o=L,n=f,a=r;break;case 5:o=r,n=f,a=g;break}return{r:o,g:n,b:a}}function ot(e,i,r){let o=r-i;return o==0?i:(e-i)%o+i}function C(e){let i=t.drawingBufferWidth/t.drawingBufferHeight;i<1&&(i=1/i);let r=Math.round(e),o=Math.round(e*i);return t.drawingBufferWidth>t.drawingBufferHeight?{width:o,height:r}:{width:r,height:o}}function D(e){let i=window.devicePixelRatio||1;return Math.floor(e*i)}function nt(e){if(e.length==0)return 0;let i=0;for(let r=0;r<e.length;r++)i=(i<<5)-i+e.charCodeAt(r),i|=0;return i}document.addEventListener("DOMContentLoaded",function(){Ge();let e=document.querySelector(".arrow"),i=document.querySelector("#experience");e&&e.addEventListener("click",()=>{i&&at(i)})});function ve(){window.scrollY>200?document.body.classList.add("scrolled"):document.body.classList.remove("scrolled")}function at(e){const i=e.offsetTop;scroll({top:i-45,behavior:"smooth"})}window.addEventListener("scroll",()=>{ve()},{passive:!0});ve();
