var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var PlayScene = /** @class */ (function (_super) {
        __extends(PlayScene, _super);
        // Public properties
        // Constructor
        function PlayScene(width, height, assetManager) {
            var _this = _super.call(this, width, height, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Public Methods
        PlayScene.prototype.Start = function () {
            // Set the properities of the background 
            this._gameBackground = new createjs.Bitmap(this.assetManager.getResult("background"));
            this.addChild(this._gameBackground);
            // Set the properities of the level 
            this._level = new createjs.Bitmap(this.assetManager.getResult("level"));
            this._level.alpha = 0;
            this.addChild(this._level);
            this.Main();
        };
        PlayScene.prototype.Update = function () {
        };
        PlayScene.prototype.Main = function () {
            console.log("Main() in PlayScene");
            this.Zoom(2, 1500);
            createjs.Tween.get(this._level).to({ alpha: 1 }, 1500, createjs.Ease.getPowOut(1));
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map