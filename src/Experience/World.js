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
                this.setParticles()
            }
        })
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