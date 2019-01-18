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
    var OverScene = /** @class */ (function (_super) {
        __extends(OverScene, _super);
        // Public properties
        // Constructor
        function OverScene(width, height, assetManager) {
            var _this = _super.call(this, width, height, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Private Methods
        OverScene.prototype.showClickToContinueLabel = function () {
            createjs.Tween.get(this._continueLabel).to({ alpha: 1 }, 1500, createjs.Ease.getPowOut(1)).call(this._gameBackground.on, ["click", this.startGame, this]);
            this._gameBackground.on("click", this.startGame, this);
        };
        OverScene.prototype.startGame = function () {
            this._gameBackground.off("click", this.startGame);
            createjs.Tween.get(this._titleLabel).to({ y: 50 }, 1500, createjs.Ease.getPowOut(1));
            createjs.Tween.get(this._continueLabel).to({ alpha: 0 }, 500, createjs.Ease.getPowOut(1));
            objects.Game.currentScene = config.Scene.PLAY;
        };
        // Public Methods
        OverScene.prototype.Start = function () {
            // Set the properities of the background Title label
            this._gameBackground = new createjs.Bitmap(this.assetManager.getResult("background"));
            this.addChild(this._gameBackground);
            // cache the center of the screen position
            var screenCenter = this.GetCenter();
            // Set the properities of the animated Title label
            this._titleLabel = new objects.Label("Moonrunners", "80px", "Consolas", "#fff", screenCenter.x, screenCenter.y - 50);
            this._titleLabel.setScale(0.5);
            this._titleLabel.textAlign = "center";
            this._titleLabel.alpha = 0;
            this.addChild(this._titleLabel);
            // Set the properities of the animated Title label
            this._continueLabel = new objects.Label("Click anywhere to continue", "20px", "Consolas", "#fff", screenCenter.x, screenCenter.y + 50);
            this._continueLabel.alpha = 0;
            this._continueLabel.textAlign = "center";
            this.addChild(this._continueLabel);
            this.Main();
        };
        OverScene.prototype.Update = function () {
        };
        OverScene.prototype.Main = function () {
            console.log("Main() in OverScene");
            createjs.Tween.get(this._titleLabel).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 2000, createjs.Ease.getPowOut(1)).call(this.showClickToContinueLabel, null, this);
        };
        return OverScene;
    }(objects.Scene));
    scenes.OverScene = OverScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=over.js.map