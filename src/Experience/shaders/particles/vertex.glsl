uniform float uTime;
uniform float uSize;
uniform float uProgressSpeed;
uniform float uPerlinFrequency;
uniform float uPerlinMultiplier;

attribute float aProgress;
attribute float aSize;
attribute float aAlpha;
attribute float aRed;
attribute float aGreen;
attribute float aBlue;

varying float vAlpha;
varying float vRed;
varying float vGreen;
varying float vBlue;

#pragma glslify: perlin3d = require('../partials/perlin3d.glsl')

void main()
{
    float progress = mod(aProgress + uTime * uProgressSpeed, 1.0);

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += progress * 10.0;
    modelPosition.x += perlin3d((modelPosition.xyz + vec3(0.0, - uTime * 0.001, 0.0)) * uPerlinFrequency) * uPerlinMultiplier;

    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    gl_PointSize = uSize * aSize;
    gl_PointSize *= (1.0 / - viewPosition.z);

    vAlpha = aAlpha;
    vRed = aBlue;
    vGreen = aGreen;
    vBlue = aBlue;
}