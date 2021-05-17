﻿class Head
{
    constructor(direction, speed, headTurningSpeed, coordinates)
    {
        this.direction = direction;
        this.speed = speed;
        this.headTurningSpeed = headTurningSpeed;
        this.coordinates = coordinates;
        this.el = null;
        this.height = 25;
        this.width = 25;
    }
    
    Move(body, direction, index)
    {
        switch(direction)
        {
            case 1:
                this.CalculateDirection(-this.headTurningSpeed);
                break;
            case 2:
                this.CalculateDirection(this.headTurningSpeed);
                break;
        }
        let projectedHeadSpeed = this.CalculateProjectedSpeed();
        
        this.coordinates.X += projectedHeadSpeed.Vx;
        this.coordinates.Y += projectedHeadSpeed.Vy;

        this.el = document.getElementById(`${index} head`);

        this.el.style.left = `${this.coordinates.X}px`;
        this.el.style.top = `${this.coordinates.Y}px`;
        this.el.style.transform = `rotate(${this.direction*180/(Math.PI)}deg)`;

        if(index === 0)
            window.scrollTo(this.coordinates.X - document.documentElement.clientWidth /2,
                this.coordinates.Y - document.documentElement.clientHeight /2);
        
        if(gameMode === "online" && isConnected)
        {
            let head = {direction: this.direction,
                coordinates: {X: this.coordinates.X, Y: this.coordinates.Y},
                height: this.height,
                width: this.width};

            let snakeBody = {coordinates: body.coordinates,
                height: body.height,
                width: body.width};

            let snake = {head: head, body: snakeBody};

            hubConnection.invoke('SendSnake', { 'connectionId': "", 'snake': snake});
        }
        
        board.IsEaten(this, index);
        board.Crashed(this, body, index);
    }

    CalculateDirection(deltaPhi)
    {
        this.direction += deltaPhi;
        if (this.direction >= 2 * Math.PI)
            this.direction -= 2 * Math.PI;
        else if (this.direction <= 0)
            this.direction += 2 * Math.PI;
    }

    CalculateProjectedSpeed()
    {
        let Vx = this.speed * Math.cos(this.direction);
        let Vy = this.speed * Math.sin(this.direction);

        return  {Vx, Vy};
    }
}