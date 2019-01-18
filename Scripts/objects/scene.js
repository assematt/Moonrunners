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
            _this.setBounds(0, 0, width, height);
            _this.x = _this.GetCenter().x;
            _this.y = _this.GetCenter().y;
            _this.regX = _this.GetCenter().x;
            _this.regY = _this.GetCenter().y;
            _this.assetManager = assetManager;
            return _this;
        }
        // Public methods
        Scene.prototype.Start = function () { };
        Scene.prototype.Update = function () { };
        Scene.prototype.Main = function () { };
        Scene.prototype.GetSize = function () {
            var bounds = this.getBounds();
            return new objects.Vector2(bounds.width, bounds.height);
        };
        Scene.prototype.GetCenter = function () {
            var bounds = this.getBounds();
            return new objects.Vector2(bounds.width / 2, bounds.height / 2);
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