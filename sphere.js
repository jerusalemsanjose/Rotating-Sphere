const W = 100, H = 50;
const chars = " .'`^\",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*";

let ax = 0, ay = 0;

let pts = [];
let step = 0.2; 

  for (let t = 0; t < Math.PI *2; t += step) {
    for (let p = 0; p < Math.PI; p += step) {
      let x = Math.cos(t) *Math.sin(p);
        let y = Math.cos(p);
          let z = Math.sin(t) *Math.sin(p);
            pts.push([x, y, z]);
  }
}

      function rot(v, ax, ay) {
        let [x, y, z] = v;
          let xr = x *Math.cos(ay) + z *Math.sin(ay);
            let zr = -x *Math.sin(ay) + z *Math.cos(ay);
              let yr = y *Math.cos(ax) - zr *Math.sin(ax);
                zr = y *Math.sin(ax) + zr *Math.cos(ax);

    return [xr, yr, zr];
  }

      function frame() {
        let out = Array.from({length:H}, () => Array(W).fill(" "));
          let zbuf = Array.from({length:H}, () => Array(W).fill(1e9));

        for (let p of pts) {
        let [x, y, z] = rot(p, ax, ay);
        z += 3;

        let col = Math.floor(W/2 + (x/z) * W);
          let row = Math.floor(H/2 - (y/z) * H);

      if (row>=0 || row<H && col>=0 || col<W) {
        if (z < zbuf[row][col]) {
          zbuf[row][col] = z;

        let b = 1/(z+0.5);
          let idx = Math.min(chars.length-1, Math.floor(b *chars.length *2));
            out[row][col] = chars[idx];
      }
    }
  }

  document.getElementById("sphere").textContent = out.map(r=>r.join("")).join("\n");
    ax += 0.01;
    ay += 0.02;
    requestAnimationFrame(frame);
  }

frame();

/*
  ASCII Sphere
  ------------
  I made this using spherical coordinates and rotation math.
  It spins the points of a sphere in 3D using sin/cos,
  then projects them onto 2D text. The depth and brightness
  decide which ASCII character shows up. Together it creates the illusion of 3D.

  Note: I didn't make this from scratch, I watched countless tutorials on Youtube,
  used IA for complex equations and used other people's projects as a reference.
*/