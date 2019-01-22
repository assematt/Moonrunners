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
            this._gameBackground = new objects.GameObject(this.assetManager, "background");
            this.addChild(this._gameBackground);
            this._gameBackground2 = new objects.GameObject(this.assetManager, "background_2");
            this._gameBackground2.alpha = 0;
            this.addChild(this._gameBackground2);
            // Set the properities of the level 
            this._level = new objects.GameObject(this.assetManager, "level");
            this._level.alpha = 0;
            this.addChild(this._level);
            // Set the properities of the playerOne 
            this._playerOne = new objects.GameObject(this.assetManager, "player1");
            this._playerOne.x = this.width / 2;
            this._playerOne.y = this.height / 2;
            this._playerOne.gravity = 0;
            this.addChild(this._playerOne);
            // Set the properities of the playerTwo 
            this._playerTwo = new objects.GameObject(this.assetManager, "player2");
            this._playerTwo.x = this.width / 2;
            this._playerTwo.y = this.height / 2;
            this._playerTwo.gravity = 0;
            this.addChild(this._playerTwo);
            // fill the gameObject vector
            this.addGameObject(this._gameBackground);
            this.addGameObject(this._gameBackground2);
            this.addGameObject(this._level);
            this.addGameObject(this._playerOne);
            this.addGameObject(this._playerTwo);
            this.Main();
        };
        PlayScene.prototype.Update = function () {
            _super.prototype.Update.call(this);
            //this._playerOne.Update();
        };
        PlayScene.prototype.Main = function () {
            console.log("Main() in PlayScene");
            this.Zoom(1.5, 1500);
            this._level.Fade(1, 1500, createjs.Ease.getPowOut(1), function () {
                this._playerOne.gravity = 9.81;
            }, this);
            this._gameBackground2.Fade(1, 1500, createjs.Ease.getPowOut(1));
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map