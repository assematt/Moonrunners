var objects;
(function (objects) {
    class GameObject extends createjs.Bitmap {
        // Constructor
        constructor(assetID, isCentered) {
            super(objects.Game.assetManager.getResult(assetID));
            this.name = assetID;
            this._isCentered = isCentered;
            this.hasCollisions = false;
            this.tag = "GameObject";
            this.onCollision = this.OnCollision;
            this._initialize();
            this._Id = ++GameObject._IdCounter;
        }
        // Private Methods
        _initialize() {
            this._updateBounds();
            if (this._isCentered == true) {
                this.regX = this.halfWidth;
                this.regY = this.halfHeight;
            }
        }
        _updateBounds() {
            this.width = this.getBounds().width * this.scaleX;
            this.height = this.getBounds().height * this.scaleY;
            this.halfWidth = this.width * 0.5;
            this.halfHeight = this.height * 0.5;
        }
        // Public Methods
        GetId() {
            return this._Id;
        }
        Fade(opacity, duration, fade, callback, scope) {
            return createjs.Tween.get(this).to({ alpha: opacity }, duration, fade).call(callback ? callback : function () { }, null, scope);
        }
        setPosition(x, y) {
            this.x = x;
            this.y = y;
        }
        setScale(Scale) {
            this.scaleX = Scale;
            this.scaleY = Scale;
            this._updateBounds();
        }
        Start() {
        }
        Update() {
        }
        Reset() {
        }
        CheckBound() {
        }
        OnCollision(other) { }
    }
    GameObject._IdCounter = 0;
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=gameobject.js.map