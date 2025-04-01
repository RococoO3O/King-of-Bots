import { AcGameObject } from "./AcGameObjects";

export class Wall extends AcGameObject {
    constructor(r, c, gamemap) {
        super();
        this.r = r; // 行数
        this.c = c; // 列数
        this.gamemap = gamemap; // 游戏地图对象
        this.color = '#B37226';

        
    }

    update() {
        this.render(); // 每一帧都调用渲染函数
    }

    render() {
        const L = this.gamemap.L;
        const ctx = this.gamemap.ctx; 

        ctx.fillStyle = this.color; // 设置填充颜色
        ctx.fillRect(this.c * L, this.r * L, L, L); // 填充矩形
    }

}