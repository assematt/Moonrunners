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
var objects;
(function (objects) {
    var Scene = /** @class */ (function (_super) {
        __extends(Scene, _super);
        // Consstructors
        function Scene(width, height, assetManager) {
            var _this = _super.call(this) || this;
            _this.width = width;
            _this.height = height;
            /**/ _this.setBounds(0, 0, width, height);
            _this.x = _this.GetCenter().x;
            _this.y = _this.GetCenter().y;
            _this.regX = _this.width / 2;
            _this.regY = _this.height / 2;
            _this.assetManager = assetManager;
            _this._gameObjects = new Array();
            return _this;
        }
        // Public methods
        Scene.prototype.Start = function () { };
        Scene.prototype.Update = function () {
            this._gameObjects.forEach(function (element) {
                element[1].Update();
            });
        };
        Scene.prototype.Main = function () { };
        Scene.prototype.GetSize = function () {
            return new objects.Vector2(this.width, this.height);
        };
        Scene.prototype.GetCenter = function () {
            return new objects.Vector2(this.width / 2, this.height / 2);
        };
        Scene.prototype.addGameObject = function (entity) {
            this._gameObjects.push([entity.GetId(), entity]);
        };
        Scene.prototype.removeGameObject = function (entity) {
            /*
            var IndexToRemove = this._gameObjects.indexOf([entity.GetId(), entity]);
            var LastElem = this._gameObjects[this._gameObjects.length - 1];
            var ToRemove = this._gameObjects[IndexToRemove];

            var Temp = LastElem;
            LastElem = ToRemove;
            ToRemove = Temp;
            */
        };
        Scene.prototype.Zoom = function (amount, duration, ease) {
            if (duration == null) {
                this.scaleX = amount;
                this.scaleY = amount;
            }
            else {
                createjs.Tween.get(this).to({ scale: amount }, duration, ease ? ease : createjs.Ease.getPowOut(1));
            }
        };
        return Scene;
    }(createjs.Container));
    objects.Scene = Scene;
})(objects || (objects = {}));
//# sourceMappingURL=scene.js.map