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
    var GameObject = /** @class */ (function (_super) {
        __extends(GameObject, _super);
        // Constructor
        function GameObject(assetManager, assetID, isCentered) {
            var _this = _super.call(this, assetManager.getResult(assetID)) || this;
            _this.name = assetID;
            _this._isCentered = isCentered;
            _this._initialize();
            _this._Id = ++GameObject._IdCounter;
            return _this;
        }
        // Private Methods
        GameObject.prototype._initialize = function () {
            this.gravity = 9.81;
            this._updateBounds();
            if (this._isCentered == true) {
                this.regX = this.halfWidth;
                this.regY = this.halfHeight;
            }
        };
        GameObject.prototype._updateBounds = function () {
            this.width = this.getBounds().width * this.scaleX;
            this.height = this.getBounds().height * this.scaleY;
            this.halfWidth = this.width * 0.5;
            this.halfHeight = this.height * 0.5;
        };
        // Public Methods
        GameObject.prototype.GetId = function () {
            return this._Id;
        };
        GameObject.prototype.Fade = function (opacity, duration, fade, callback, scope) {
            return createjs.Tween.get(this).to({ alpha: opacity }, duration, fade).call(callback ? callback : function () { }, null, scope);
        };
        GameObject.prototype.setPosition = function (x, y) {
            this.x = x;
            this.y = y;
        };
        GameObject.prototype.setScale = function (Scale) {
            this.scaleX = Scale;
            this.scaleY = Scale;
            this._updateBounds();
        };
        GameObject.prototype.Start = function () {
        };
        GameObject.prototype.Update = function () {
            //this.y += this.gravity * 1;
        };
        GameObject.prototype.Reset = function () {
        };
        GameObject.prototype.IsColliding = function (other) {
            // Get the bound of the other object
            var otherBound = other.getBounds();
            // Get the bounds of this object
            var thisBound = this.getBounds();
            return thisBound.intersects(otherBound);
            ;
        };
        GameObject.prototype.CheckBound = function () {
        };
        GameObject.prototype.Move = function () {
        };
        GameObject._IdCounter = 0;
        return GameObject;
    }(createjs.Bitmap));
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=gameobject.js.map