 /**
     * 创建柱状图
     * params
     *      data  [{color,percent,name,count}]
     *          颜色，百分比，名称，人数
     */
    function createBar(data,id){

        let canvas = document.getElementById(id);
        let ctx = canvas.getContext('2d');

        // 屏幕的设备像素比
        let devicePixelRatio = window.devicePixelRatio || 1;
        // canvas的实际渲染倍率
        let ratio = devicePixelRatio;

        canvas.style.width = canvas.width + 'px';
        canvas.style.height = canvas.height + 'px';
        canvas.width = canvas.width * ratio;
        canvas.height = canvas.height * ratio;
        ctx.scale(ratio,ratio)
        
        // 设置字体
        ctx.font = '12px Helvetica Neue,Helvetica,Arial,sans-serif';

        let timer = null;
        cancelRequestAnimFrame(timer); 

        let siteY = 20;
        // siteX 绘制区域的水平起始坐标
        // width:总长度
        // verticalSpace 柱状图竖直间隔
        // titleSpace 标题和柱状图的竖直距离
        // subTitleSpace 子标题(描述) 柱状图右侧距离
        // rectH 矩形高度
        const siteX = 10, width = 200, verticalSpace = 50, titleSpace = 5, subTitleSpace = 20, rectH = 15;
        const step = () => {
            let flag = true;
            // 重置绘制区域的竖直起始坐标
            siteY = 20;
            // 清空画布
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let item of data) {
                let speed = 0, target = item.percent*width/100;
                // 设置默认lastWidth
                item.lastWidth = item.lastWidth || 0;
                // 匀减速
                speed = (target - item.lastWidth)/8;
                //清除小数
                speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);

                item.lastWidth = item.lastWidth + speed;
                
                // 判断边界值
                if(item.lastWidth > target){
                    item.lastWidth = target;
                }

                // 绘制标题  
                ctx.fillStyle = '#333';
                ctx.fillText(item.name, siteX, siteY);
                // 绘制矩形
                ctx.fillStyle = item.color;
                ctx.fillRect(siteX, siteY + titleSpace, item.lastWidth, rectH);
                // 绘制子标题
                ctx.fillStyle = '#333';
                ctx.fillText(`${item.percent}%`, item.lastWidth + subTitleSpace, siteY + titleSpace + rectH - 3);
                // 增加间隔
                siteY = siteY + verticalSpace;

                if (item.lastWidth != target){
                    flag=false;
                }
              }

              if(flag){
                cancelRequestAnimFrame(timer);
                console.log('绘制结束');
                } else {
                    timer = requestAnimationFrame(step);
                }
        }

        timer = requestAnimationFrame(step);
    }