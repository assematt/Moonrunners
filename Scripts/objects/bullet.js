var objects;
(function (objects) {
    class Bullet extends objects.GameObject {
        constructor(lifetime, speed, assetID, ownerId, direction, isCentered) {
            super(assetID, isCentered);
            this.ownerId = ownerId;
            this.direction = direction;
            this.hasCollisions = true;
            this.speed = speed;
            this.lifetime = lifetime;
            this.tag = "Bullet";
            this.name = `bullet_${this.GetId()}`;
            this.onCollision = this.OnBulletCollision;
        }
        setDirection(direction) {
            this.direction = direction;
        }
        getDirection() {
            return this.direction;
        }
        getOwner() {
            return this.ownerId;
        }
        Update() {
            super.Update();
            this.Offset((this.direction === "right" ? 1 : -1) * this.speed, 0);
            if (this.lifetime == 0) {
                this.Destroy();
            }
            this.lifetime--;
        }
        OnBulletCollision(other) {
            if (other.GetId() != this.getOwner()) {
                this.Destroy();
            }
        }
    }
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=bullet.js.map