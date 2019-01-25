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
    var Characters = /** @class */ (function (_super) {
        __extends(Characters, _super);
        // Constructor
        function Characters(assetManager, assetID, isCentered) {
            var _this = _super.call(this, assetManager, assetID, isCentered) || this;
            _this._gravity = 0;
            _this._jumpForce = 0;
            _this._isJumping = false;
            return _this;
        }
        // Public methods
        Characters.prototype.setGravity = function (gravity) {
            this._gravity = gravity;
        };
        Characters.prototype.GetGravity = function () {
            return this._gravity;
        };
        Characters.prototype.Move = function (direction) {
            switch (direction) {
                case "left":
                    this.x -= 2;
                    break;
                case "right":
                    this.x += 2;
                    break;
            }
        };
        Characters.prototype.Jump = function () {
            this._jumpForce = -4;
            this.y -= 20;
        };
        Characters.prototype.Update = function () {
            _super.prototype.Update.call(this);
            if (!this._isColliding)
                this.y += (this._gravity * 1) + this._jumpForce;
        };
        return Characters;
    }(objects.GameObject));
    objects.Characters = Characters;
})(objects || (objects = {}));
//# sourceMappingURL=character.js.map