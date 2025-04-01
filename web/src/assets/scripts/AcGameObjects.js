const AC_GAME_OBJECTS = []; // 存放所有游戏对象的数组

// 导出这个基类
export class AcGameObject {
    // 构造函数
    constructor() {
        AC_GAME_OBJECTS.push(this); // 加入到数组中
        this.timedelta = 0; // 时间间隔
        this.has_called_start = false; // 是否调用过start函数
    }

    start() {
        // 只会在第一帧调用一次
        // 可以在这里进行一些初始化操作
    }
    
    update() {
        // 每一帧都会调用，除了第一帧之外
        // 可以在这里进行一些逻辑处理
    }
  
    on_destroy() {
        // 删除之前的操作

    }

    destroy() { 
        // 删除时就是将当前对象从数组中删除即可
        for(let i in AC_GAME_OBJECTS) { // in遍历下标
            const obj = AC_GAME_OBJECTS[i];
            if(obj === this) {
                AC_GAME_OBJECTS.splice(i); // 删除当前对象
                break; // 找到就退出循环
            }
        }
        
    }
}

let last_timestamp; // 上一帧执行的时刻

// 回调函数，将其写成递归函数，让它在每一帧都执行
const step = (timestamp) => {
    for (let obj of AC_GAME_OBJECTS) { //of遍历值
        if(!obj.has_called_start) {
            obj.has_called_start = true; // 标记为已经调用过start函数
            obj.start(); // 调用start函数
        } else {
            obj.timedelta = timestamp - last_timestamp; // 计算时间间隔
            obj.update(); // 调用update函数
        }
    }
    last_timestamp = timestamp; // 更新上一帧的时间戳
    requestAnimationFrame(step); 

}


requestAnimationFrame(step); // 浏览器在下一帧渲染之前调用这个函数
