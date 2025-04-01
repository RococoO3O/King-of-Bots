import { AcGameObject } from "./AcGameObjects";
// export default在导入的时候不需要加大括号
import { Wall } from "./Wall"; // 导入墙壁类

export class GameMap extends AcGameObject {
    constructor(ctx, parent) {
        super();

        this.ctx = ctx; // 画布
        this.parent = parent; // 画布的父元素，用来动态修改画布的长宽
        this.L = 0; // 存放每个格子的绝对距离，即单位长度

        this.rows = 13; // 行数
        this.cols = 13; // 列数

        this.inner_walls_count = 80; // 存放内墙的数量

        this.walls = [];
    }

    // 检查连通性
    check_conectivity(g, sx, sy, tx, ty) {
        // sx, sy: 起点坐标，tx, ty: 终点坐标
        if (sx == tx && sy == ty) return true; // 如果起点和终点相同，返回true
        g[sx][sy] = true; // 标记为已访问

        // 偏移量数组
        let dx = [-1, 0, 1, 0]; 
        let dy = [0, 1, 0, -1]; 
        for(let i = 0; i < 4; i ++) {
            let x = sx + dx[i]; // 新的行数
            let y = sy + dy[i]; // 新的列数
            if(!g[x][y] && this.check_conectivity(g, x, y, tx, ty)) { // 如果没有访问过且连通
                return true; // 返回true
            }
        }
        return false;

    }


    create_walls() {
        // 初始化一个布尔数组
        const g = [];
        for(let r = 0; r < this.rows; r ++) {
            g[r] = [];
            for(let c = 0; c < this.cols; c ++) {
                g[r][c] = false; // 初始化为false
            }
        }

        // 给四周加上障碍物
        for(let r = 0; r < this.rows; r ++) {
            g[r][0] = true; // 左边
            g[r][this.cols - 1] = true; // 右边
        }
        for(let c = 0; c < this.cols; c ++) {
            g[0][c] = true; // 上边
            g[this.rows - 1][c] = true; // 下边
        }


        // 创建随机障碍物
        for(let i = 0; i < this.inner_walls_count/2; i ++) {
            for(let j = 0; j < 1000; j ++){
                let r = parseInt(Math.random() * this.rows); // 随机行数
                let c = parseInt(Math.random() * this.cols); // 随机列数
                if(g[r][c] || g[c][r]) continue;
                if(r == this.colss - 2 && c == 1 || r == 1 && c == this.rows - 2) continue; // 不允许在起点和终点生成障碍物
                g[r][c] = g[c][r] = true; // 随机生成障碍物
                break; // 生成成功就退出循环
            }
        }


        const copy_g = JSON.parse(JSON.stringify(g)); // 深拷贝，避免引用传递

        if(!this.check_conectivity(copy_g, this.rows - 2, 1, 1, this.cols - 2)) { // 如果不连通就重新生成
            return false; // 返回false表示失败
        }


        // 根据布尔数组创建四条边的墙壁对象
        for(let r = 0; r < this.rows; r ++) {
            for(let c = 0; c < this.cols; c ++) {
                if(g[r][c]) {
                    this.walls.push(new Wall(r, c, this)); // 创建墙壁对象并加入数组中
                } 
            }
        }

        return true; // 返回true表示成功
    }

    start() {
        // 只会在第一帧调用一次
        for(let i = 0; i < 1000; i ++) {
            if(this.create_walls())
                break; // 如果成功创建就退出循环
        }
    }

    update_size() {
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols; // 画布的宽度
        this.ctx.canvas.height = this.L * this.rows; // 画布的高度
    }

    update() {
        this.update_size(); // 每一帧都更新边长
        this.render(); // 每一帧都调用渲染函数
    }

    render() {
        // 渲染就是把游戏对象都画到地图上
        const color_even = '#AAD751', color_odd = '#A2D149';
        for(let r = 0; r < this.rows; r ++) {
            for(let c = 0; c < this.cols; c ++ ) {
                if((r + c) % 2 === 0) {     
                    this.ctx.fillStyle = color_even; // 设置填充颜色
                }
                else {
                    this.ctx.fillStyle = color_odd; // 设置填充颜色
                }
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L); // 填充矩形   
            }
        }
    }
}