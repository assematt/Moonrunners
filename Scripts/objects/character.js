var objects;
(function (objects) {
    class Characters extends objects.GameObject {
        // Constructor
        constructor(assetID, isCentered) {
            super(assetID, isCentered);
            this._gravity = 0;
            this._jumpForce = 0;
            this._isJumping = false;
            this._isFalling = true;
            this._playerHealth = 6;
            this.tag = "Player";
            this.onCollision = this.onCharacterCollision;
        }
        _RegisterHit() {
            let health = this._playerHealth;
            let currentSprite;
            switch (true) {
                case health > 3:
                    currentSprite = this._healthSprites[2];
                    break;
                case health > 1:
                    currentSprite = this._healthSprites[1];
                    break;
                case health >= 0:
                    currentSprite = this._healthSprites[0];
                    break;
            }
            let currentFrame = currentSprite.currentFrame;
            currentSprite.gotoAndStop(currentFrame + 1);
        }
        SetHealhtSprite(sprites) {
            this._healthSprites = sprites;
        }
        // Public methods
        setGravity(gravity) {
            this._gravity = gravity;
        }
        GetGravity() {
            return this._gravity;
        }
        Shoot() {
            let Bullet = new objects.Bullet("bullet", this.GetId(), this.scaleX < 0 ? "left" : "right");
            Bullet.x = this.x + (this.scaleX < 0 ? -35 : 33);
            Bullet.y = this.y + 24;
            Bullet.name = `bullet_${Bullet.GetId()}`;
            Bullet.hasCollisions = true;
            return Bullet;
        }
        Move(direction) {
            switch (direction) {
                case "left":
                    this.x -= 2;
                    if (this.scaleX > 0) {
                        this.scaleX = -this.scaleX;
                    }
                    break;
                case "right":
                    this.x += 2;
                    if (this.scaleX < 0) {
                        this.scaleX = -this.scaleX;
                    }
                    break;
            }
        }
        Jump() {
            this._jumpForce = -4;
            this.y -= 20;
            this._isFalling = true;
        }
        Update() {
            super.Update();
            if (this._isFalling)
                this.y += (this._gravity * 1) + this._jumpForce;
        }
        onCharacterCollision(other) {
            switch (other.tag) {
                case "Floor":
                    this._isFalling = false;
                    break;
                case "Bullet":
                    {
                        if (other.getOwner() != this.id && this._playerHealth > 0) {
                            console.log(`${this.name} || ${other.name}`);
                            // Remove the buller from the scene
                            other.hasCollisions = false;
                            objects.Game.currentScene.removeGameObject(other);
                            // decrease the player health
                            if (--this._playerHealth <= 0)
                                console.log(`${this.name} is dead`);
                            this._RegisterHit();
                            console.log(`${this.name} health is ${this._playerHealth}`);
                        }
                    }
                    break;
            }
            if (other.name === "floor")
                this._isFalling = false;
        }
    }
    objects.Characters = Characters;
})(objects || (objects = {}));
//# sourceMappingURL=character.js.map