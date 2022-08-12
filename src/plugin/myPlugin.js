// 定义一个插件
export default {
    // 插件中必须包含一个install方法    
    install: function (Vue) {
                    /* 注册时间过滤器 */
    Vue.filter('dataFormat', function (val) {
        let date = new Date(val);
		let y = date.getFullYear();
		let M = date.getMonth().toString().padStart(2,"0");
		let d = date.getDate().toString().padStart(2,"0");
		let h = date.getHours().toString().padStart(2,"0");
		let m = date.getMinutes().toString().padStart(2,"0");
		let s = date.getSeconds().toString().padStart(2,"0");
		return `${y}-${M}-${d} ${h}:${m}:${s}`
    })
        //给Vue混入成员
        Vue.mixin({
            methods: {
                //错误消息框
                $msg_e(message) {
                    this.$message({
                        message,
                        type: 'error',
                        duration: 1000
                    });
                },
                //警告消息框
                $msg_w(message) {
                    this.$message({
                        message,
                        type: 'warning',
                        duration: 1000
                    });
                },
                //成功消息框
                $msg_s(message) {
                    this.$message({
                        message,
                        type: 'success',
                        duration: 1000
                    });
                },
                 //消息
                 $msg(message) {
                    this.$message({
                        message,
                        duration: 1000
                    });
                },
                // 确认框插件
                $con_f(message) {
                    return new Promise((resolve, reject) => {
                        this.$confirm(message,{type:'warning'})
                            .then(res => {
                                resolve()
                            })
                            .catch((_) => { reject()});
                    })
                }
            }
        })
    }
}