class Road {
  constructor(x, width, lanes = 3) {
    this.x = x;
    this.width = width;
    this.lanes = lanes;

    this.left = x - width / 2;
    this.right = x + width / 2;

    const infinity = 1000000;
    this.top = -infinity;
    this.bottom = infinity;

    const topLeft = { x: this.left, y: this.top };
    const topRight = { x: this.right, y: this.top };
    const bottomLeft = { x: this.left, y: this.bottom };
    const bottomRight = { x: this.right, y: this.bottom };
    this.borders = [
      [topLeft, bottomLeft],
      [topRight, bottomRight],
    ];
  }

  getLaneCenter(laneIndex) {
    const laneWidth = this.width / this.lanes;
    return (
      this.left +
      laneWidth / 2 +
      Math.min(laneIndex, this.lanes - 1) * laneWidth
    );
  }

  draw(context) {
    context.lineWidth = 5;
    context.strokeStyle = "white";

    for (let i = 1; i <= this.lanes - 1; i++) {
      const x = lerp(this.left, this.right, i / this.lanes);

      context.setLineDash([20, 20]); // this means our road will have 20px then a break of 20px

      context.beginPath();
      context.moveTo(x, this.top);
      context.lineTo(x, this.bottom);
      context.stroke();
    }
    context.setLineDash([]);
    this.borders.forEach(border => {
        context.beginPath();
        context.moveTo(border[0].x, border[0].y);
        context.lineTo(border[1].x, border[1].y);
        context.stroke();
    })
  }
}
