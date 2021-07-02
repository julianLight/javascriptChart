class PieChart {
    constructor(canvas){
        this.canvas = canvas;
        this.canvas.width = canvas.offsetWidth; 
        this.canvas.height = canvas.offsetHeight;
        this.width = canvas.offsetWidth; 
        this.height = canvas.offsetHeight;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        this.radius = this.centerX > this.centerY ? this.centerY : this.centerX;
        
        //set values
        this.values = [];
        this.total = 0;

        //set startArc
        this.startArc = -Math.PI * 0.5;

        //set colors
        this.colors = ['red','blue','green'];
    }

    setValues(values){
        this.values = values;
        this.total = 0;
        values.forEach(value=>{
            this.total += value.value;
        });
    }
    
    setStartArc(arc){
        this.startArc = arc;
    }

    setColors(colors){
        this.colors = colors;
    }

    draw(){
        const ctx = this.canvas.getContext('2d');
        for(var i=0;i<this.values.length;i++){
            ctx.fillStyle = this.colors[i%this.colors.length];
            ctx.beginPath();
            ctx.moveTo(this.centerX,this.centerY);
            const addValue = this.values[i].value / this.total * 2 * Math.PI;
            ctx.arc(this.centerX,this.centerY,this.radius,this.startArc,this.startArc+addValue);
            ctx.fill();
            ctx.closePath();
            this.startArc += addValue;
        }
    }
}

class BarChart {
    constructor(canvas){
        this.canvas = canvas;
        this.canvas.width = canvas.offsetWidth; 
        this.canvas.height = canvas.offsetHeight;
        this.width = canvas.offsetWidth; 
        this.height = canvas.offsetHeight;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        this.radius = this.centerX > this.centerY ? this.centerY : this.centerX;
        
        //set leftSide
        this.leftSideWidth = this.width / 10;
        this.barFrameWidth = this.width - this.leftSideWidth;

        //set topSide
        this.topSideHeight = this.height / 10;
        //set bottom
        this.bottomSideHeight = this.height / 10;
        //set topSide || set bottom
        this.barFrameHeight = this.height - this.topSideHeight - this.bottomSideHeight;
        this.zeroLineY = this.barFrameHeight;


        //set value
        this.values = [];
        this.bars = [];
        this.barMax = 0;
        this.barMin = 0;
        this.barSideWidth = this.barFrameWidth / this.bars.length / 10;
        this.barWidth = this.barFrameWidth / this.bars.length - this.barSideWidth*2;

        //set colors
        this.color = 'red';
    }

    setLeftSide(w){
        this.leftSideWidth = w;
        this.barFrameWidth = this.width - this.leftSideWidth;
    }

    setTopSide(h){
        this.topSideHeight = h;
        this.barFrameHeight = this.height - this.topSideHeight - this.bottomSideHeight;
        this.zeroLineY = this.barFrameHeight;
    }

    setBottomSide(h){
        this.bottomSideHeight = h;
        this.barFrameHeight = this.height - this.topSideHeight - this.bottomSideHeight;
        this.zeroLineY = this.barFrameHeight;
    }

    setValues(values){
        this.values = values;
        this.bars = [];
        values.forEach(bar => this.bars.push(bar.value));
        this.barsMax = Math.max(...this.bars);
        this.barsMin = Math.min(...this.bars);
        this.barSideWidth = this.barFrameWidth / this.bars.length / 10;
        this.barWidth = this.barFrameWidth / this.bars.length - this.barSideWidth*2;
    }
    
    setColor(color){
        this.color = color;
    }

    draw(){
        const ctx = this.canvas.getContext('2d');
        if(this.barsMin < 0 && this.barsMax > 0){
            this.zeroLineY = this.barsMax / (this.barsMax - this.barsMin) * this.barFrameHeight;
            ctx.beginPath();
            ctx.moveTo(this.leftSideWidth, this.topSideHeight + this.zeroLineY);
            ctx.lineTo(this.width, this.topSideHeight + this.zeroLineY);
            ctx.stroke();
        }

        const longest = (this.barsMin < 0 && this.barsMax < 0) ? this.barsMin : this.barsMax;

        ctx.fillStyle = this.color;
        if(this.barsMin > 0 && this.barsMax > 0){
            for(var i=0; i<this.values.length;i++){
                const value = this.values[i].value;
                const barHeight = value / this.barsMax * this.zeroLineY;
                ctx.fillRect(this.leftSideWidth + this.barSideWidth + (this.barWidth + this.barSideWidth*2)*i,
                    this.topSideHeight + (this.barFrameHeight - barHeight),
                    this.barWidth,
                    this.topSideHeight + this.barFrameHeight
                );
            }
        }else if(this.barsMin < 0 && this.barsMax < 0){
            for(var i=0; i<this.values.length;i++){
                const value = this.values[i].value;
                const barHeight = value / this.barsMin * this.zeroLineY;
                ctx.fillRect(this.leftSideWidth + this.barSideWidth + (this.barWidth + this.barSideWidth*2)*i,
                this.topSideHeight,
                this.barWidth,
                barHeight);
            }
        }else{
            for(var i=0; i<this.values.length;i++){
                const value = -this.values[i].value;
                const barHeight = value / longest * this.zeroLineY;
                ctx.fillRect(this.leftSideWidth + this.barSideWidth + (this.barWidth + this.barSideWidth*2)*i,
                this.topSideHeight + (this.zeroLineY - barHeight),
                this.barWidth,
                barHeight);
            }                
        }
    }
}

export {PieChart, BarChart};
