function getContextPath() {
    return document.getElementById("ctx").value;
}


function commonAjax(url, method, data, option, callBackFunction, isLoadingImg) {
    if(method.toUpperCase() === "FILE") {
        fileDownload(url, data);
        return;
    }
    let isLoading = (isLoadingImg != null || isLoadingImg !== undefined) ? isLoadingImg : true;
    const ajaxOption = {
        async: typeof option === "boolean" ? option : option.async || true,
        contentType: option.contentType || "application/x-www-form-urlencoded; charset=utf-8",
    }

    let xhr = new XMLHttpRequest();

    if(method.toUpperCase() === "GET") {
        xhr.open(method.toUpperCase(), url + "?" + jsonParamSerialize(data), ajaxOption.async);
    } else {
        xhr.open(method.toUpperCase(), url, ajaxOption.async);
    }

    xhr.setRequestHeader("ajax-request", "true");

    if (ajaxOption.contentType !== "multipart/form-data") {
        xhr.setRequestHeader("Content-Type", ajaxOption.contentType);
    }

    let csrfToken = document.getElementsByName("_csrf")[0].getAttribute("content");
    let csrfHeader = document.getElementsByName("_csrf_header")[0].getAttribute("content");
    xhr.setRequestHeader(csrfHeader, csrfToken);

    if(url.indexOf("session") === -1){
        ajaxLoadingImage(isLoading);
    }
    const dataOption = {
        "application/x-www-form-urlencoded; charset=utf-8": jsonParamSerialize(data),
        "application/json; charset=utf-8": JSON.stringify(data),
        "multipart/form-data": data
    }

    const params = dataOption[ajaxOption.contentType];

    xhr.send(method.toUpperCase() === "GET" ? null : params || data);

    xhr.onreadystatechange = function () {
        if(this.readyState === 4) {
            ajaxLoadingImage(false);

            if(this.status === 200) {
                callBackFunction(this.responseText && JSON.parse(this.responseText));
            } else if(this.status === 6653) {
                alert("로그인 세션이 만료되었습니다.");
                //window.location.href =  getContextPath() + accessType() +'/login';
            } else if(this.status === 400) {
                alert(JSON.parse(this.responseText).msg || "웹 페이지에서 유효하지 않은 요청을 하였습니다.(400)");
            } else if(this.status === 403) {
                alert(JSON.parse(this.responseText).msg || "웹 페이지를 볼 수 있는 권한이 없습니다.(403)");
            } else if(this.status === 404) {
                alert("요청하신 페이지를 찾을 수 없습니다.(404)");
            } else if(this.status === 405) {
                if(url.indexOf("login") >= 0) {
                    alert("보안세션이 만료되었습니다.\n다시 로그인해 주시기 바랍니다.");
                    //window.location.href = getContextPath() + accessType() + "/login";
                } else {
                    alert("서버로 올바르지 않은 요청이 들어왔습니다.(405)");
                }
            } else if(this.status === 500) {
                alert("내부서버 오류가 발생하였습니다.(500)");
            }

         /*   if(url.indexOf("interval") === -1 && url.indexOf("session") === -1 && url.indexOf("logout") === -1 && typeof(sessionExtension) == "function" && this.status !== 6653){
                sessionExtension();
            }*/
        }
    };

    xhr.onerror = function () {
        ajaxLoadingImage(false);
    };
}


function fileDownload(url, data) {
    window.location.href = url + "?" + jsonParamSerialize(data);
}

function jsonParamSerialize(jsonData) {
    if(isNull(jsonData)) return "";
    let resultParam = [];

    for(let data in jsonData) {
        resultParam.push(data + "=" + encodeURIComponent(jsonData[data]))
    }
    return resultParam.join("&");
}


function isNull(value) {
    if(value !== undefined && isNaN(value) && typeof value === "string") value = value.trim();
    return !value;
}


function ajaxLoadingImage(isShow) {
    if(!document.getElementById("loadingWrap")) return false;
    if(isShow) {
        document.getElementById("loadingWrap").classList.remove("hidden");
    } else {
        document.getElementById("loadingWrap").classList.add("hidden");
    }
}


function replaceNull(value) {
    try {
        if(value !== undefined && isNaN(value)) value = value.trim();
    } catch (e) {
        return isNull(value);
    }
    return isNull(value) ? "" : htmlDecode(value);
}

function htmlDecode(value) {
    let doc = new DOMParser().parseFromString(value, "text/html");
    return doc.documentElement.textContent;
}

function createSelectTimeBox(target, selected) {
    const targetHtml = document.querySelector("select[name='"+target+"'");
    const timeArr = ['00', '01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];

    for(let i = 0; i < timeArr.length; i++) {
        let option = document.createElement("option")
        option.value = timeArr[i];
        option.text = timeArr[i];
        if(Number(option.value) === Number(selected)) {
            option.selected = true;
        }
        targetHtml.append(option);
    }
}