module objects {
    export class Characters extends GameObject {

        // Private properties        
        private _gravity: number;
        private _jumpForce: number;
        private _isJumping: boolean;
        private _isFalling: boolean;
        private _playerHealth: number;
        private _healthSprites: Array<createjs.Sprite>;

        private _RegisterHit() {

            let health = this._playerHealth;
            let currentSprite: createjs.Sprite;

            // Determine which of the 3 hearth we have to change
            switch (true)
            {
                case health > 3: currentSprite = this._healthSprites[2];
                break;

                case health > 1: currentSprite = this._healthSprites[1];
                break;

                case health >= 0: currentSprite = this._healthSprites[0];
                break;
            }
            
            // Advance the current animation (reduce the health in the hearth)
            currentSprite.advance();
        }

        // Constructor
        constructor(assetID: string, isCentered?: boolean)
        {
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

        public SetHealhtSprite(sprites: Array<createjs.Sprite>) {
            this._healthSprites = sprites;
        }

        // Public methods
        public setGravity(gravity: number) {
            this._gravity = gravity;
        }
        public GetGravity() : number {
            return this._gravity;
        }
        public Shoot() : objects.Bullet {
            // Spawn a bullet object
            let Bullet = new objects.Bullet("bullet", this.GetId(), this.scaleX < 0 ? "left" : "right" );
            Bullet.x = this.x + (this.scaleX < 0 ? -35 : 33);
            Bullet.y = this.y + 24;
            return Bullet;
        }

        public Move(direction: string) {
            switch (direction)
            {
                case "left":
                this.x -= 2;
                if (this.scaleX > 0)
                {
                    this.scaleX = -this.scaleX;
                } break;
                case "right":
                this.x += 2;
                if (this.scaleX < 0)
                {
                    this.scaleX = -this.scaleX;
                } break;
            }
        }

        public Jump() : void {
            this._jumpForce = -4;
            this.y -= 20;
            this._isFalling = true;
        }

        public Update() : void {
            super.Update();
            if (this._isFalling)
                this.y += (this._gravity * 1) + this._jumpForce;
        }

        public TakeDamage(amount?: number) {
            if (--this._playerHealth >= 0)
            {
                this._RegisterHit();
            }
        }

        public Reset(x: number, y: number) {
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

        public onKilled() {
            // Play an animation when the player dies
            createjs.Tween.get(this, {onComplete: () => {
               
                // Notify the Play scene this player died one all the animation are finished
                (Game.currentScene as scenes.PlayScene).OnPlayerDeath(this.name);
            }}).to({alpha:1}, 50).to({alpha:0}, 50).loop = 10;
        }

        public onCharacterCollision(other: GameObject) {
            switch (other.tag)
            {
                // If we collide with the floor we stop falling
                case "Floor": this._isFalling = false;
                break;

                // If we collide with a bullet shot by the other player
                case "Bullet": {
                    if ((<Bullet>other).getOwner() != this.id && this._playerHealth > 0)
                    {
                        // decrease the player health
                        if (--this._playerHealth <= 0)
                        {
                            // If we reach -1 then we are dead
                            this.onKilled();                            
                        }
                        
                        // Change the health bar
                        this._RegisterHit();
                    }
                } break;
            }
        }
    }
}