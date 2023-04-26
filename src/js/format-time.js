// 格式化日期
// 使用例：<span v-format-time="{format:'YYYY-MM-DD',time:scope.row.birth}"></span>
// 网站：https://juejin.cn/post/7197289170530779194

import mtime from "time-formater";
function formatTime(app) {
    app.directive("format-time", {
        mounted(el,bindings){
            const {format,time}=bindings.value;
            el.textContent = mtime(time).format(format);
        },
        updated(el, bindings) {
            if(bindings.value.time===bindings.oldValue.time){return}
            const {format,time}=bindings.value;
            el.textContent = mtime(time).format(format);
        },
    })
}

export default formatTime

