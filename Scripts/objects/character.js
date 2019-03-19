var objects;
(function (objects) {
    class Characters extends objects.GameObject {
        // Constructor
        constructor(assetID, isCentered) {
            super(assetID, isCentered);
            this._gravity = 0;
            this._jumpForce = 0;
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
            let Bullet = new objects.Bullet("bullet", this.GetId(), this.graphics.scaleX < 0 ? "left" : "right");
            Bullet.SetPosition(this.graphics.x + (this.graphics.scaleX < 0 ? -35 : 33), this.graphics.y + 24);
            return Bullet;
        }
        Move(direction) {
            switch (direction) {
                case "Left":
                    {
                        this.Offset(-2, 0);
                        if (this.graphics.scaleX > 0)
                            this.SetScale([-this.graphics.scaleX, this.graphics.scaleY]);
                    }
                    break;
                case "Right":
                    {
                        this.Offset(2, 0);
                        if (this.graphics.scaleX < 0) {
                            this.SetScale([-this.graphics.scaleX, this.graphics.scaleY]);
                        }
                    }
                    break;
            }
            this._isFalling = true;
        }
        Jump() {
            this._jumpForce = -4;
            this.Offset(0, -20);
            this._isFalling = true;
        }
        Update() {
            super.Update();
            if (this._isFalling)
                this.Offset(0, (this._gravity * 1) + this._jumpForce);
        }
        TakeDamage(amount) {
            if (--this._playerHealth >= 0) {
                this._RegisterHit();
            }
        }
        Reset(x, y) {
            this.SetPosition(x, y);
            this.SetAlpha(1);
            this._jumpForce = 0;
            this._isFalling = true;
            this._playerHealth = 6;
            this.hasCollisions = true;
            // Reset the health sprites
            this._healthSprites[0].gotoAndStop(this.name);
            this._healthSprites[1].gotoAndStop(this.name);
            this._healthSprites[2].gotoAndStop(this.name);
        }
        onKilled() {
            // Play an animation when the player dies
            createjs.Tween.get(this.graphics, { onComplete: () => {
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