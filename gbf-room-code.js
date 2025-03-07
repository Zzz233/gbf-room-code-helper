// ==UserScript==
// @name         拼好法助手
// @namespace    
// @version      1.0
// @description  在输入参战ID入口页面检测用户当前复制的内容, 如果是房间号就自动填充
// @author       Zzz233
// @match        *://game.granbluefantasy.jp/*
// @match        *://gbf.game.mbga.jp/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=granbluefantasy.jp
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addValueChangeListener
// ==/UserScript==


(async function() {
    'use strict';
    const gbf_room_code = await navigator.clipboard.readText(); // 获取剪切板上的内容 i.e.用户复制的副本代码
    const pattern = /\b[a-zA-Z0-9]{8}\b/; // 定义房间号的正则表达式（8位字母数字组合）

    if (!pattern.test(gbf_room_code)) { // 判断复制内容是否符合房间号格式
        // console.log('剪贴板内容不符合房间号格式');
        return;
    }

    if (window.location.host.includes('granbluefantasy.jp')) {
        const fillCode = () => {
            const input = document.querySelector('input.frm-battle-key');
            if (input) {
                input.value = gbf_room_code;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            } else {
                setTimeout(fillCode, 500);
            }
        };

        window.addEventListener('load', fillCode); // 等待页面加载完成, 然后执行fillCode()
        // GM_addValueChangeListener('000', fillCode);
    }
})();
