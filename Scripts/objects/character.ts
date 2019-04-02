module objects {

    type Direction = "Left" | "Right";

    export class Characters extends GameObject {

        // Private properties        
        private _gravity: number;
        private _jumpForce: number;
        private _isFalling: boolean;
        private _playerHealth: number;
        private _healthSprites: Array<createjs.Sprite>;
        private _ammoCount = 100;

        private _UpdateHealthSprites() {

            let health = this._playerHealth;

            // Reset all the sprite
            this._healthSprites[0].gotoAndStop(this.name);
            this._healthSprites[1].gotoAndStop(this.name);
            this._healthSprites[2].gotoAndStop(this.name);

            // Determine which of the 3 hearth we have to change
            switch (true)
            {
                case health === 5:
                this._healthSprites[0].advance();
                break;

                case health === 4:
                this._healthSprites[0].advance();
                this._healthSprites[0].advance();
                break;

                case health === 3:
                this._healthSprites[0].advance();
                this._healthSprites[0].advance();
                this._healthSprites[1].advance();
                break;

                case health === 2:
                this._healthSprites[0].advance();
                this._healthSprites[0].advance();
                this._healthSprites[1].advance();
                this._healthSprites[1].advance();
                break;

                case health === 1:
                this._healthSprites[0].advance();
                this._healthSprites[0].advance();
                this._healthSprites[1].advance();
                this._healthSprites[1].advance();
                this._healthSprites[2].advance();
                break;

                case health === 0:
                this._healthSprites[0].advance();
                this._healthSprites[0].advance();
                this._healthSprites[1].advance();
                this._healthSprites[1].advance();
                this._healthSprites[2].advance();
                this._healthSprites[2].advance();
                break;
            }
            
            // Advance the current animation (reduce the health in the hearth)
            //currentSprite.advance();
        }

        // Constructor
        constructor(assetID: string | createjs.Sprite, isCentered?: boolean)
        {
            super(assetID, isCentered);
            this._gravity = 0;
            this._jumpForce = 0;
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
        public Shoot() : objects.Bullet | null {
            if (this._ammoCount-- > 0) {
                // Spawn a bullet object
                let Bullet = new objects.Bullet("bullet", this.GetId(), this.graphics.scaleX < 0 ? "left" : "right" );
                Bullet.SetPosition(this.graphics.x + (this.graphics.scaleX < 0 ? -40 : 33), this.graphics.y + 24);
                return Bullet;
            } else if (this._ammoCount < 0) {
                this._ammoCount = 0;
            }
            
            return null;
        }

        public Move(direction: Direction) {
            switch (direction)
            {
                case "Left": {
                    this.Offset(-5, 0);
                    if (this.graphics.scaleX > 0)
                        this.SetScale([-this.graphics.scaleX, this.graphics.scaleY]);
                } break;
                case "Right":{
                    this.Offset(5, 0);
                    if (this.graphics.scaleX < 0)
                    {
                        this.SetScale([-this.graphics.scaleX, this.graphics.scaleY]);
                    }
                } break;
            }

            this._isFalling = true;
        }

        public Jump() : void {
            if (this.graphics.y > 75) {
                this._jumpForce = -4;
                this.Offset(0, -20);
                this._isFalling = true;
            }
        }

        public Update() : void {
            super.Update();
            if (this._isFalling)
                this.Offset(0, (this._gravity * 1) + this._jumpForce);
        }

        public TakeDamage(amount?: number) {
            if (--this._playerHealth >= 0)
            {
                this._UpdateHealthSprites();
            }
        }

        public Heal(amount?: number) {
            if (this._playerHealth < 6) {
                ++this._playerHealth;
                this._UpdateHealthSprites();
            }
        }

        public Reset(x: number, y: number) {
            this.SetPosition(x, y);
            this.SetAlpha(1);
            this._jumpForce = 0;
            this._isFalling = true;
            this._playerHealth = 6;
            this.hasCollisions = true;
            this._ammoCount = 100;

            // Reset the health sprites
            this._healthSprites[0].gotoAndStop(this.name);
            this._healthSprites[1].gotoAndStop(this.name);
            this._healthSprites[2].gotoAndStop(this.name);
        }

        public onKilled() {
            (Game.currentScene as scenes.PlayScene).OnPlayerDeath(this.name);

            // Play an animation when the player dies
            createjs.Tween.get(this.graphics, {onComplete: () => {
                // Notify the Play scene this player died one all the animation are finished
                (Game.currentScene as scenes.PlayScene).ResetPlayers();
               
            }}).to({alpha:1}, 50).to({alpha:0}, 50).loop = 10;
        }

        public onCharacterCollision(other: GameObject) {
            switch (other.tag)
            {
                // If we collide with the floor we stop falling
                case "Floor": 
                    this._isFalling = false;
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
                        this._UpdateHealthSprites();
                    }
                } break;
            }
        }

        get ammoCount() : number {
            return this._ammoCount;
        }
        public reloadAmmo(value: number) {
            if ((value + this._ammoCount) <= 100) {
                this._ammoCount += value;
            }
            else {
                this._ammoCount = 100;
            }
        }
    }
}