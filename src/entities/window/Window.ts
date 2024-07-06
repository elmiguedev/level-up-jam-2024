import { WINDOW_HP, WINDOW_REPAIR_VALUE } from "../../constants";

export class Window extends Phaser.GameObjects.Container {

  private windowImage: Phaser.GameObjects.Image;
  private hp: number = WINDOW_HP;
  private hpBar: Phaser.GameObjects.Rectangle;

  public onClick: () => void;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.windowImage = this.scene.add.image(0, 0, 'window');

    this.add(this.windowImage);
    this.scene.add.existing(this);

    this.windowImage.setInteractive({ cursor: 'pointer' });
    this.windowImage.on('pointerdown', () => {
      if (this.onClick) {
        this.onClick();
      }
    })

    this.createHpBar();
  }

  public repair(value: number = WINDOW_HP) {
    this.hp += value;
    if (this.hp >= WINDOW_HP) {
      this.hp = WINDOW_HP;
    }
  }

  public damage(value: number = 1) {
    this.hp -= value;
    if (this.hp <= 0) {
      this.hp = 0;
    }
    this.updateHpBar();
  }

  private createHpBar() {
    const x = 0;
    const y = this.y - 120;
    this.hpBar = this.scene.add.rectangle(x, y, 200, 10, 0x00FF00);
    this.hpBar.setDepth(1);
    this.add(this.hpBar);
  }

  private updateHpBar() {
    this.hpBar.displayWidth = this.hp / WINDOW_HP * 200;
  }

}