/**
 * Created by abuhena on 12/17/15.
 */
var Shoting = {};
Shoting.level = 1;
Shoting.bullet = 25;
Shoting.killed = 0;
Shoting.missed = 0;
Shoting.appeared = 0;
Shoting.context = null;
Shoting.find = function(finder)
{
    return document.querySelector(finder);
}

Shoting.start = function()
{
    this.context = this.find(".main");

    this.context.style.left = ((window.innerWidth - this.context.offsetWidth) / 2)+"px";
    this.context.style.top = ((window.innerHeight - this.context.offsetHeight) / 2) + "px";

    return this.bindEvents(this);
}

Shoting.createCrack = function(x, y)
{
    var elm = document.createElement("div");
    elm.className = "crack";
    elm.style.top = y+"px";
    elm.style.left = x+"px";

    return this.context.appendChild(elm);
}

Shoting.createAbirds = function(x, y)
{
    this.appeared++;
    if ((this.killed/5)>=1&&this.level<6)
    {
        this.level++;
        this.find("#level").innerHTML = "Level "+ this.level;
    }
    var elm = document.createElement("div");
    var classes = ["birdsA", "birdsB", "birdsC"];
    elm.className = classes[Math.floor(Math.random() * 3)];
    elm.style.top = 25 + (Math.random() * 60)+"px";
    if (elm.className != "birdsC")
    {
        elm.style.marginLeft = "170px";
        elm.style.backgroundSize = ((Math.random() * 20) + 28)+"px";
    }else {
        elm.style.marginLeft = "0px";
        elm.style.marginRight = "0px";
        elm.style.backgroundSize = "112px";
    }

    return this.context.appendChild(elm);
}

Shoting.createHead = function(x, y)
{
    var elm = document.createElement("div");
    elm.className = "bilash";
    elm.style.top = x+"px";
    elm.style.right = y+"px";
    elm.style.backgroundSize = "50px";

    return this.context.appendChild(elm);
}

Shoting.bindEvents = function(scope)
{
    scope.context.onclick = function(e)
    {
        if (scope.bullet>0)
        {
            scope.bullet--;

            scope.find("#bullet").innerHTML = "Bullet: "+ scope.bullet +" left";

            scope.context.style.cursor = "url('i/shooted.png'), auto";
            scope.find("#gunshot").currentTime = 0;
            scope.find("#reload").currentTime = 0;
            scope.find("#reload").pause();
            scope.find("#gunshot").pause();
            scope.find("#gunshot").play();

            scope.find("#gunshot").onended = function()
            {
                scope.find("#reload").play();
            }

            if (e.target.classList[0]=="main")
            {
                scope.crackMade(e, scope);
            }

            setTimeout(function() {
                scope.context.style.cursor = "url('i/shoot.png'), auto";
            }, 200)
        } else {
            scope.find("#empty").currentTime = 0;
            scope.find("#empty").pause();
            scope.find("#empty").play();
        }
    }

    scope.find(".play-btn").onclick = function()
    {
        scope.find(".dash-screen").style.display = "none";

        scope.level = 1;
        scope.bullet = 26;
        scope.killed = 0;
        scope.missed = 0;
        scope.appeared = 0;

        setTimeout(function(){

            scope.horizBirdFly(scope);

        }, (Math.random() * 2000) + 5000);
    }
}

Shoting.crackMade = function (elem, scope) {
    console.log("x - "+ elem.layerX +" y - "+ elem.layerY);
    console.log(elem);

    var treeRoot = {start: {x: 1, y: 167}, end: {x: 205, y: 400}};
    var treeBottom = {start: {x: 163, y: 145}, end: {x: 194, y: 188}};
    var treeBottomLeft = {start: {x: 134, y: 162}, end: {x: 204, y: 190}};
    var treeMiddle = {start: {x: 160, y: 110}, end: {x: 217, y: 157}};
    var treeAbMiddle = {start: {x: 164, y: 95}, end: {x: 221, y: 123}};
    var treeTopMiddle = {start: {x: 157, y: 69}, end: {x: 193, y: 106}};
    var treeMacMiddle = {start: {x: 142, y: 26}, end: {x: 169, y: 74}};

    var topLeft = {start: {x: 0, y: 0}, end: {x: 46, y: 106}};
    var topMiddle = {start: {x: 47, y: 0}, end: {x: 169, y: 53}};
    var topBottom = {start: {x: 41, y: 60}, end: {x: 74, y: 70}};
    var topRight = {start: {x: 196, y: 0}, end: {x: 317, y: 23}};

    if (((elem.layerX >= treeRoot.start.x && elem.layerX <= treeRoot.end.x) &&
        (elem.layerY >= treeRoot.start.y && elem.layerY <= treeRoot.end.y)) ||

        ((elem.layerX >= treeBottom.start.x && elem.layerX <= treeBottom.end.x) &&
        (elem.layerY >= treeBottom.start.y && elem.layerY <= treeBottom.end.y)) ||

        ((elem.layerX >= treeBottomLeft.start.x && elem.layerX <= treeBottomLeft.end.x) &&
        (elem.layerY >= treeBottomLeft.start.y && elem.layerY <= treeBottomLeft.end.y)) ||

        ((elem.layerX >= treeMiddle.start.x && elem.layerX <= treeMiddle.end.x) &&
        (elem.layerY >= treeMiddle.start.y && elem.layerY <= treeMiddle.end.y)) ||

        ((elem.layerX >= treeAbMiddle.start.x && elem.layerX <= treeAbMiddle.end.x) &&
        (elem.layerY >= treeAbMiddle.start.y && elem.layerY <= treeAbMiddle.end.y)) ||

        ((elem.layerX >= treeTopMiddle.start.x && elem.layerX <= treeTopMiddle.end.x) &&
        (elem.layerY >= treeTopMiddle.start.y && elem.layerY <= treeTopMiddle.end.y)) ||

        ((elem.layerX >= treeMacMiddle.start.x && elem.layerX <= treeMacMiddle.end.x) &&
        (elem.layerY >= treeMacMiddle.start.y && elem.layerY <= treeMacMiddle.end.y)) ||

        ((elem.layerX >= topLeft.start.x && elem.layerX <= topLeft.end.x) &&
        (elem.layerY >= topLeft.start.y && elem.layerY <= topLeft.end.y)) ||

        ((elem.layerX >= topMiddle.start.x && elem.layerX <= topMiddle.end.x) &&
        (elem.layerY >= topMiddle.start.y && elem.layerY <= topMiddle.end.y)) ||

        ((elem.layerX >= topBottom.start.x && elem.layerX <= topBottom.end.x) &&
        (elem.layerY >= topBottom.start.y && elem.layerY <= topBottom.end.y)) ||

        ((elem.layerX >= topRight.start.x && elem.layerX <= topRight.end.x) &&
        (elem.layerY >= topRight.start.y && elem.layerY <= topRight.end.y))
    )
    {
        console.log("cracked");
        var cracker = scope.createCrack(elem.layerX, elem.layerY);
        setTimeout(function() {
            cracker.className += " hideMe";

            setTimeout(function() {
                scope.context.removeChild(cracker);
            }, 2100);

        }, 6000);
    }

}

Shoting.horizBirdFly = function (scope) {
    var bird = scope.createAbirds();
    var flying = null;
    var falling = null;

    bird.onclick = function (e)
    {
        console.log(e.target.classList);
        if (scope.bullet>0&&e.target.classList.length<2)
        {
            bird.className += " killed";

            clearInterval(flying);

            scope.killed++;

            scope.find("#killed").innerHTML = "Killed: "+ scope.killed +" birds";

            bird.style.webkitTransform = "rotate(45deg)";
            bird.style.webkitAnimation = "rotate infinite 700ms";
            if (bird.className=='birdsC killed')
            {
                bird.style.backgroundImage = "url('birds/n/dead-bird.png')";
                bird.style.backgroundSize = "80px";
                var head = scope.createHead(bird.offsetTop, parseInt(bird.style.marginRight.replace("px", '')));

                head.onclick = function()
                {
                    console.log("hit man");
                    var create = document.createElement("div");
                    create.className = "blood";
                    head.appendChild(create);
                }

                var rand_top_head = ((Math.random() * 290) + 150);
                rand_top_head = rand_top_head > 290 ? 290 : rand_top_head;

                var headFall = setInterval(function () {

                    var top_head = parseInt(head.style.top.replace("px", "")) + 5;
                    var right_head = parseInt(head.style.right.replace("px", "")) + 5;

                    if (top_head > rand_top_head)
                    {
                        var rotate_arr = ["90deg", "180deg", "270deg", "360deg"];
                        head.style.webkitAnimation = "talking infinite 400ms";
                        head.style.webkitTransform = "rotate("+rotate_arr[Math.floor(Math.random() * 4)]+")";
                        clearInterval(headFall);
                    } else {
                        head.style.top = top_head+"px";
                        head.style.right = right_head+"px";
                    }

                }, 50);

            }else {
                bird.style.backgroundImage = bird.className=='birdsA killed' ? "url('birds/a3.png')" : "url('birds/b4.png')";
            }

            var main_top = 290;
            var rand_top = ((Math.random() * main_top) + 150);
            rand_top = rand_top > 290 ? 290 : rand_top;
            falling = setInterval(function(){

                var top = parseInt(bird.style.top.replace("px", "")) + 5;
                if (top > rand_top)
                {
                    bird.style.webkitAnimation = "none";
                    bird.style.webkitTransform = "rotate(180deg)";
                    clearInterval(falling);

                    setTimeout(function(){

                        scope.horizBirdFly(scope);

                    }, (Math.random() * 5000));

                }else {
                    bird.style.top = top+"px";
                }

            }, 50);
        }
    }

    flying = setInterval(function(){

        if (bird.className=="birdsC")
        {
            var margin = parseInt(bird.style.marginRight.replace("px", "")) + (4 + scope.level);
        }else {
            var margin = parseInt(bird.style.marginLeft.replace("px", "")) + (4 + scope.level);
        }


        if (margin > scope.context.offsetWidth)
        {
            clearInterval(flying);
            scope.missed++;

            scope.find("#missed").innerHTML = "Missed: "+ scope.missed +" birds";

            scope.horizBirdFly(scope);
            scope.context.removeChild(bird);
        }else {
            if (bird.className=="birdsC")
            {
                bird.style.marginRight = margin+"px";
            }else {
                bird.style.marginLeft = margin+"px";
            }

        }

    }, 50);
}