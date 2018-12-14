import wepy from 'wepy';
import 'wepy-async-function';

//获取缓存
export const getStorage = (key) => {
    return new Promise((resolve, reject) => {
        wx.getStorage({
            key: key,
            success(res) {
                resolve(res.data)
            },
            fail(err) {
                resolve('errMsg')
                // reject(err)
            }
        })
    })
}
//弹窗
export const showToast = (title, icon = 'none', duration = 2000) => {
    wx.showToast({
        title,
        icon,
        duration
    })
}
//微信登录
export const wxLogin = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            success(res) {
                if (res.code) {
                    resolve(res.code)
                } else {
                    reject('登录失败！' + res.errMsg)
                }
            }
        })
    })
}
//加载弹窗
export const showLoading = (mask = false, title = '加载中...') => {
    wx.showLoading({
        title,
        mask
    })

}
//确认框
export const showModal = (title, content, confirmText = '确定', cancelText = "取消", showCancel = true, cancelColor = '#000', confirmColor = '#3cc51f') => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title,
            content,
            cancelText,
            cancelColor,
            success(res) {
                if (res.confirm) {
                    resolve(true);
                } else if (res.cancel) {
                    resolve(false);
                }
            }
        })
    })
}
//确认框

//路由跳转
export const wxGo = (page, type = 'navigateTo') => {
    wx[type]({
        url: page
    });
}
//获取元素dom信息
export const getClassDom = async (_class) => {
    return new Promise((resolve, reject) => {
        let query = wx.createSelectorQuery();
        query
            .select(_class)
            .boundingClientRect(rect => {
                resolve(rect)
            })
            .exec();
    })
}
export const formatDate = (date, fmt) => {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    }
    let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
    };

    // 遍历这个对象
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + "";
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? str : ("00" + str).substr(str.length)
            );
        }
    }
    return fmt;
}
//测试request