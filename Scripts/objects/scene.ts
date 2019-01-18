module objects {
    export class Scene extends createjs.Container {

        // Public properties
        public assetManager;        

        // Consstructors
        constructor(width: number, height: number, assetManager: createjs.LoadQueue) {
            super();

            this.setBounds(0, 0, width, height);
            this.x = this.GetCenter().x;
            this.y = this.GetCenter().y;
            this.regX = this.GetCenter().x;
            this.regY = this.GetCenter().y;
            this.assetManager = assetManager;
        }

        // Public methods
        public Start() : void {}
        public Update() : void {}
        public Main() : void {}
        public GetSize() : objects.Vector2 {
            let bounds = this.getBounds();
            return new objects.Vector2(bounds.width, bounds.height);
        }
        public GetCenter() : objects.Vector2 {
            let bounds = this.getBounds();
            return new objects.Vector2(bounds.width / 2, bounds.height / 2);
        }

        public Zoom(amount: number, duration?: number, ease?: Function)
        {
            if (duration == null)
            {
                this.scaleX = amount;
                this.scaleY = amount;
            }
            else
            {
                createjs.Tween.get(this).to({scale: amount}, duration, ease ? ease : createjs.Ease.getPowOut(1));
            }
        }
    }
}