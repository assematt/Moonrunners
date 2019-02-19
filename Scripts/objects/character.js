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
            this.hasCollisions = true;
            this.tag = "Player";
            this.onCollision = this.onCharacterCollision;
        }
        _RegisterHit() {
            let health = this._playerHealth;
            let currentSprite;
            // Determine which of the 3 hearth we have to change
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
            // Advance the current animation (reduce the health in the hearth)
            currentSprite.advance();
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
            // Spawn a bullet object
            let Bullet = new objects.Bullet("bullet", this.GetId(), this.scaleX < 0 ? "left" : "right");
            Bullet.x = this.x + (this.scaleX < 0 ? -35 : 33);
            Bullet.y = this.y + 24;
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
        TakeDamage(amount) {
            if (--this._playerHealth >= 0) {
                this._RegisterHit();
            }
        }
        Reset(x, y) {
            this.x = x;
            this.y = y;
            this._jumpForce = 0;
            this._isJumping = false;
            this._isFalling = true;
            this._playerHealth = 6;
            this.hasCollisions = true;
            this.alpha = 1;
            // Reset the health sprites
            this._healthSprites[0].gotoAndStop(this.name);
            this._healthSprites[1].gotoAndStop(this.name);
            this._healthSprites[2].gotoAndStop(this.name);
        }
        onKilled() {
            // Play an animation when the player dies
            createjs.Tween.get(this, { onComplete: () => {
                    // Notify the Play scene this player died one all the animation are finished
                    objects.Game.currentScene.OnPlayerDeath(this.name);
                } }).to({ alpha: 1 }, 50).to({ alpha: 0 }, 50).loop = 10;
        }
        onCharacterCollision(other) {
            switch (other.tag) {
                // If we collide with the floor we stop falling
                case "Floor":
                    this._isFalling = false;
                    break;
                // If we collide with a bullet shot by the other player
                case "Bullet":
                    {
                        if (other.getOwner() != this.id && this._playerHealth > 0) {
                            // decrease the player health
                            if (--this._playerHealth <= 0) {
                                // If we reach -1 then we are dead
                                this.onKilled();
                            }
                            // Change the health bar
                            this._RegisterHit();
                        }
                    }
                    break;
            }
        }
    }
    objects.Characters = Characters;
})(objects || (objects = {}));
//# sourceMappingURL=character.js.map