import React, { Component } from 'react';

const GVerify = function ( options ){
    this.options = { //默认options参数值
        id: "", //容器Id
        canvasId: "verifyCanvas", //canvas的ID
        width: "100", //默认canvas宽度
        height: "30", //默认canvas高度
        type: "blend", //图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
        code: "",
        size: 4,
    }
    this.setOption(options);
    this._init();
    this.refresh();
}
GVerify.prototype = {
    version: '1.0.0',
    setOption(options) {//设置 option
        if(Object.prototype.toString.call(options) === '[object Object]'){
            for(let key in options){
                this.options[key] = options[key]
            }
        }else{
            this.options.id = options;
        };
        let canvasId = `verifyCanvas-${Math.random() + Math.random() * 100}`;
        this.options.canvasId = canvasId;
        this.options.numArr = "0,1,2,3,4,5,6,7,8,9".split(",");
        this.options.letterArr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(",");
    },
    _init(){
        const  con = document.getElementById(this.options.id);
        const canvas = document.createElement("canvas");
        canvas.id = this.options.canvasId;
        canvas.width = this.options.width;
        canvas.height = this.options.height;
        canvas.style.cursor = "pointer";
        canvas.innerHTML = "您的浏览器版本不支持canvas";
        con.appendChild(canvas);
        const  parent = this;
        canvas.onclick = function(){
            parent.refresh();
        }
    },
    /**生成验证码**/
    refresh(){
        let ctx,txtArr ;
        this.options.code = "";
        const { height, width, size,  canvasId, numArr, letterArr}  = this.options;
        const {randomNum }  = this;
        const canvas = document.getElementById(canvasId);

        if(canvas.getContext) {
            this.ctx = ctx = canvas.getContext('2d');
        }else{
            return;
        }
        ctx.textBaseline = "middle";
        ctx.fillStyle = this.randomColor(180, 240);
        ctx.fillRect(0, 0, width, height);
        const type = this.options.type;
        txtArr = type === 'blend' ? numArr.concat( letterArr ) : type === 'number' ? numArr : letterArr;

        for(let i = 1; i <=size; i++) {
            let txt = txtArr[randomNum(0, txtArr.length)];
            this.options.code += txt;
            ctx.font = randomNum(height, height) + 'px SimHei'; //随机生成字体大小
            ctx.fillStyle = this.randomColor(50, 160); //随机生成字体颜色
            ctx.shadowOffsetX = randomNum(-3, 3);
            ctx.shadowOffsetY = randomNum(-3, 3);
            ctx.shadowBlur = randomNum(-3, 3);
            ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
            let x = width / (size+1) * i;
            let y = height / 2;
            let deg = randomNum(-30, 30);
            /**设置旋转角度和坐标原点**/
            ctx.translate(x, y);
            ctx.rotate(deg * Math.PI / 180);
            ctx.fillText(txt, 0, 0);
            /**恢复旋转角度和坐标原点**/
            ctx.rotate(-deg * Math.PI / 180);
            ctx.translate(-x, -y);
        }
        this.drawLine();
        this.drawPoints();

    },
    //绘制干扰线
    drawLine(){
        const o = this.options;
        const ctx = this.ctx;
        for(let i = 0; i < 3; i++) {
            ctx.strokeStyle = this.randomColor(40, 180);
            ctx.beginPath();
            ctx.moveTo(this.randomNum(0, o.width), this.randomNum(0, o.height));
            ctx.lineTo(this.randomNum(0, o.width), this.randomNum(0, o.height));
            ctx.stroke();
        }
    },
    //绘制干扰点
    drawPoints() {
        const o = this.options;
        const ctx = this.ctx;
        for(let i = 0; i < o.width/4; i++) {
            ctx.fillStyle = this.randomColor(0, 255);
            ctx.beginPath();
            ctx.arc(this.randomNum(0, o.width), this.randomNum(0, o.height), 1, 0, 2 * Math.PI);
            ctx.fill();
        }
    },
    /**验证验证码**/
    validate(code){
        code = (code + '').toLowerCase();
        let v_code = this.options.code.toLowerCase();
        if(code == v_code){
            return true;
        }else{
            this.refresh();
            return false;
        }
    },

    //生成 rgb
    randomColor(min, max){
        const R = this.randomNum(min, max);
        const G = this.randomNum(min, max);
        const B = this.randomNum(min, max)
        return "rgb(" + R + "," + G + "," + B + ")";
    },
    //随机数
    randomNum: (min, max) => Math.floor(Math.random() * (max - min) + min)
};

export default class GVerifys extends Component {
    id = Math.random() * 10 + Math.random() * 10;
    componentDidMount() {
        let opt = {
            id: `zyd-DVerify-${this.id}`,
            width: 130,
            height: 33
        };
        if(this.props.options)opt = {...this.props.options};
        this.gVerify  = new GVerify(opt);
        this.props.gVerify(this.gVerify);
        
    }

    render(){
        let  style = {}
        if(this.props.mixin)style = {...this.props.mixin};
        return(
            <div id={`zyd-DVerify-${this.id}`} className='zyd-GVerify' style={{display: 'inline-block', ...style}}></div>
        )
    }
}
