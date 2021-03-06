class Snake
{
    constructor(head, body, index) 
    {
        this.head = head;
        this.body = body;
        this.index = index;
    }
    
    Draw(index)
    {
        if(index === 0)
        {
            for(let i = 0; i < this.body.coordinates.length; i++)
            {
                gameZone.innerHTML += `<div class="body" id="${index} body ${i}"
                                        style="left: ${this.body.coordinates[i].x}px;
                                               top: ${this.body.coordinates[i].y}px;"></div>`
            }

            gameZone.innerHTML += `<div class="head" id="${index} head"
                                    style="left: ${this.head.coordinates.x}px;     
                                           top: ${this.head.coordinates.y}px;
                                           transform: rotate(${this.head.direction*180/(Math.PI/2)}deg);"></div>`
        }
        else
        {
            for(let i = 0; i < this.body.coordinates.length; i++)
            {
                gameZone.innerHTML += `<div class="enemy_body" id="${index} body ${i}"
                                        style="left: ${this.body.coordinates[i].x}px;
                                               top: ${this.body.coordinates[i].y}px;"></div>`
            }

            gameZone.innerHTML += `<div class="enemy_head" id="${index} head"
                                    style="left: ${this.head.coordinates.x}px;     
                                           top: ${this.head.coordinates.y}px;
                                           transform: rotate(${this.head.direction*180/(Math.PI/2)}deg);"></div>`
        }

        
        this.head.el = document.querySelector('.head');
    }
}