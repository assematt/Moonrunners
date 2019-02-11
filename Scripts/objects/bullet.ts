module objects {
    export class Bullet extends GameObject {
        private ownerId: number;
        private direction: "left" | "right";
        private speed: number;

        constructor(assetID: string, ownerId: number, direction: "left" | "right", isCentered?: boolean)
        {
            super(assetID, isCentered);

            this.ownerId = ownerId;
            this.direction = direction;
            this.speed = 9.81;
            this.tag = "Bullet";
        }

        public setDirection(direction: "left" | "right") {
            this.direction = direction;
        }
        public getDirection() : string {
            return this.direction;
        }

        public getOwner() : number {
            return this.ownerId;
        }

        public Update() : void {
            super.Update();
            
            this.x += (this.direction == "right" ? 1 : -1) * this.speed;
        }

        public OnBulletCollision(other: GameObject) {
            
        }
    }
}