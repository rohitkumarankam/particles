import * as THREE from 'three'
import Experience from './Experience.js'
import Particles from './Particles.js'

export default class World
{
    constructor(_options)
    {
        this.experience = new Experience()
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        this.resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                // this.setDummy()
                this.setParticles()
            }
        })
    }

    setDummy()
    {
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ map: this.resources.items.lennaTexture })
        )
        this.scene.add(cube)
    }
    setParticles()
    {
        this.particles = new Particles()
    }

    resize()
    {
    }

    update()
    {
        if(this.particles)
            this.particles.update()
    }

    destroy()
    {
    }
}