window.ljXmax = {
};

window.ljXmax.init = function () {
    var name = location.search.replace("?", "");

    var display = document.getElementById("displayName");

    display.innerHTML = "<strong>" + name + "</strong> 聖誕快樂！<br/>天天都要開心喔！";
};
