uniform sampler2D uMask;

varying float vAlpha;
varying float vRed;
varying float vGreen;
varying float vBlue;

void main()
{
    float maskStrength = texture2D(uMask, gl_PointCoord).r;
    gl_FragColor = vec4( vRed, vGreen, vBlue, maskStrength * vAlpha);
}