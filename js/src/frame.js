"use strict";

var game = game || {};

game.frame = function(parameters){
    var that = {};
    var context = parameters.context;
    var entity = parameters.entity;
    var score = parameters.score;
    var boxes = parameters.boxes;

    that.entityBoxOverlap = function(entity, boxes) {
        var that = {};

        for (var i = 0; i < boxes.length; i++) {
            var box = boxes[i];

            that.entityX = entity.getX();
            that.boxX = box.getX();
            that.entityY = entity.getY();
            that.boxY = box.getY();

            that.xOverlap = (that.entityX + 30 >= that.boxX && that.entityX <= that.boxX + 60);
            that.yOverlap = (that.entityY <= that.boxY + 60 && that.entityY + 28 >= that.boxY);

            if (that.xOverlap && that.yOverlap) {
                return true;
            }
        }

        return false;
    }

    that.resetEntityPosition = function() {
        entity = game.entityFactory({context:context}).createInvader();
    }

    that.resetScore = function() {
        score.reset();
    }

    that.update = function() {
        context.clearRect(0, 0, 1280, 1024);

        for (var i = 0; i < boxes.length; i++) {
            boxes[i].draw();
        }

        entity.update();
        entity.draw();

        score.increment();
        score.report();

        if (that.entityBoxOverlap(entity, boxes)) {
            that.resetEntityPosition();
            that.resetScore();
        }

        //$('div').children('span').eq(1).html(score++);
    }

    return that;
};