import {
  Agent,
  Environment,
  CanvasRenderer,
  KDTree,
  Vector,
  utils
} from "flocc";

/* ------- PARAMETERS --------- */
console.log("running");

const ALIGNMENT = 1;
const SEPARATION = 1;
const COHESION = 1;
const VISION = 15;
const MAX_SPEED = 3;
const MAX_FORCE = 0.15;
// const FLOCK_SIZE = 320;
const [width, height] = [window.innerWidth, 200]; // [window.innerWidth, window.innerHeight];

/* ---------------------------- */

var player_id = 0;

/* ------- SET UP ENVIRONMENT, RENDERER --------- */

const environment = new Environment({ width, height });
const renderer = new CanvasRenderer(environment, {
  width,
  height
});
const container = document.getElementById("container");
renderer.mount(container);

document.addEventListener("keydown", logKey);

function logKey(e) {
  console.log(e.code);
  if (e.code === "ArrowUp") {
    const p = environment.getAgentById(player_id);
    p.set("y", p.getData().y - 5);
    console.log(environment.time);
  }

  if (e.code === "ArrowDown") {
    const p = environment.getAgentById(player_id);
    p.set("y", p.getData().y + 5);
    console.log(environment.time);
  }

  if (e.code === "KeyB") {
    console.log("test");
    setup(320);
    run();
  }

  if (e.code === "KeyT") {
    stop();
  }
}

let tree;

function setup(FLOCK_SIZE) {
  /* Add crowd agents */

  for (let i = 0; i < FLOCK_SIZE; i++) {
    const agent = new Agent();

    agent.set("x", utils.random(0, width));
    agent.set("y", utils.random(0, height));

    // const angle = 2 * Math.random() * Math.PI;
    // Math.round(Math.random()) * 180
    const angle = 0;

    agent.set("shape", "arrow");
    agent.set("size", 2.5);

    agent.set("vx", Math.cos(angle));
    agent.set("vy", Math.sin(angle));

    agent.addRule(tick);

    environment.addAgent(agent);
  }

  /* Add player */
  const player = new Agent();
  player_id = player.id;

  player.set("x", 5);
  player.set("y", height / 2);

  // const angle = 2 * Math.random() * Math.PI;
  // Math.round(Math.random()) * 180
  const angle = 0;

  player.set("shape", "circle");
  player.set("color", "red");
  player.set("size", 5);

  player.set("vx", Math.cos(angle));
  player.set("vy", Math.sin(angle));

  player.addRule(tick);

  environment.addAgent(player);

  tree = new KDTree(environment.getAgents(), 2);
  environment.use(tree);
}

function tick(agent) {
  const { x, y, vx, vy } = agent.getData();

  const pos = new Vector(x, y);
  const vel = new Vector(vx, vy);
  const acc = new Vector(0, 0);

  const ip = pos.clone().multiplyScalar(-1);
  const iv = vel.clone().multiplyScalar(-1);

  const alignment = new Vector(0, 0);
  const cohesion = new Vector(0, 0);
  const separation = new Vector(0, 0);

  const neighbors = tree.agentsWithinDistance(agent, VISION);
  neighbors.forEach((a) => {
    let ax = a.get("x");
    let ay = a.get("y");
    let avx = a.get("vx");
    let avy = a.get("vy");

    alignment.x += avx;
    alignment.y += avy;
    cohesion.x += ax;
    cohesion.y += ay;

    const diff = pos
      .clone()
      .add(new Vector(-ax, -ay))
      .multiplyScalar(1 / Math.max(utils.distance(agent, a), 0.0001));
    separation.add(diff);
  });

  if (neighbors.length > 0) {
    const n = neighbors.length;
    alignment.multiplyScalar(1 / n);
    alignment.normalize().multiplyScalar(MAX_SPEED).add(iv);
    if (alignment.length() > MAX_FORCE)
      alignment.normalize().multiplyScalar(MAX_FORCE);

    cohesion.multiplyScalar(1 / n);
    cohesion.add(ip);
    cohesion.normalize().multiplyScalar(MAX_SPEED);
    cohesion.add(iv);
    if (cohesion.length() > MAX_FORCE)
      cohesion.normalize().multiplyScalar(MAX_FORCE);

    separation.multiplyScalar(1 / n);
    separation.normalize().multiplyScalar(MAX_SPEED);
    separation.add(iv);
    if (separation.length() > MAX_FORCE)
      separation.normalize().multiplyScalar(MAX_FORCE);
  }

  alignment.multiplyScalar(ALIGNMENT);
  cohesion.multiplyScalar(COHESION);
  separation.multiplyScalar(SEPARATION);

  acc.add(alignment);
  acc.add(cohesion);
  acc.add(separation);

  pos.add(vel);
  vel.add(acc);
  if (vel.length() > MAX_SPEED) vel.normalize().multiplyScalar(MAX_SPEED);

  if (agent.id === player_id) {
    //   console.log("agent");
    collisions(agent);
  }

  return {
    x: pos.x,
    y: pos.y,
    vx: vel.x,
    vy: vel.y
  };
}
var collision_count = 0;
const collision_threshold = 5;
const text_disp = document.getElementById("text");
text_disp.innerText = "running";

function collisions(agent) {
  var neighbors = tree.agentsWithinDistance(agent, collision_threshold);
  var neighbor_count = neighbors.length;
  collision_count = collision_count + neighbor_count;
  text_disp.innerText = "collisions: " + collision_count;
}

function run() {
  environment.tick({ randomizeOrder: true });
  requestAnimationFrame(run);
}

function stop() {
  console.log("stopping");
  environment.clear();
}

// document.getElementById("container").onclick = function () {
//   run();
// };

// run();
