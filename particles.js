class Particle{
    constructor(x,y,type){
        this.x=x
        this.y=y
        this.lifetime=0
        this.type=type
        if(this.type=="AI"||this.type=="KEYS"){
            this.fill=getRandomColor()
        }else{
            this.fill='#000000'
        }
        this.radius=7
    }

    drawParticle(ctx,array){


        this.radius-=0.2
        if(this.radius<0){
            this.radius=0
        }

        if(this.type=="AI"||this.type=="KEYS"){
            this.x+=getRandomArbitrary(-3-(this.lifetime/15),3+(this.lifetime/15))
        }else{
            this.fill=increase_brightness(this.fill,this.lifetime/2)
            this.x+=getRandomArbitrary(-3,3)

        }

        

        ctx.beginPath()
        ctx.fillStyle=this.fill
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        ctx.fill()
        
        this.lifetime++
        if(this.lifetime>50){
            array.shift()
        }
    }
}