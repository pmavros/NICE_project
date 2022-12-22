// const FLOCK_SIZE = 320;
console.log(flocc);
const [width, height] = [window.innerWidth, 200]; // [window.innerWidth, window.innerHeight];

/* ------- SET UP ENVIRONMENT, RENDERER --------- */

const environment = new Environment({ width, height });
const renderer = new CanvasRenderer(environment, {
  width,
  height
});

let tree;
var requestId;

const container = document.getElementById("container");
renderer.mount(container);

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

    //agent.addRule(tick);
    agent.set({ tick: sf_agent.tickAgent });

    environment.addAgent(agent);
  }

  /* Add player */
  const player = new Agent();
  sf_agent.my_params.player_id = player.id;

  player.set("x", 5);
  player.set("y", height / 2);

  // const angle = 2 * Math.random() * Math.PI;
  // Math.round(Math.random()) * 180
  const angle = Math.round(Math.random()) * 180;

  player.set("shape", "circle");
  player.set("color", "red");
  player.set("size", 5);

  player.set("vx", Math.cos(angle));
  player.set("vy", Math.sin(angle));

  //player.addRule(tick);
  player.set({ tick: sf_agent.tickAgent });

  environment.addAgent(player);

  tree = new KDTree(environment.getAgents(), 2);
  environment.use(tree);
  sf_agent.my_params.tree = tree;
}

//*
function run() {
  environment.tick({ randomizeOrder: true });
  requestId = requestAnimationFrame(run);
}

function stop() {
  console.log("stopping");
  sf_agent.my_params.player_id = null;
  environment.clear();
  if (requestId) {
    window.cancelAnimationFrame(requestId);
    requestId = undefined;
  }
  renderer.mount(container);
}

function logKey(e) {
  console.log(e.code);
  if (e.code === "KeyB") {
    environment.clear();
    sf_agent.my_params.collision_count = 0;
    setup(10);
    console.log(sf_agent.my_params.player_id);
    const p = environment.getAgentById(sf_agent.my_params.player_id);
    console.log(p.getData().vx);
    run();
  }

  if (e.code === "KeyT") {
    stop();
  }
  if (sf_agent.my_params.player_id == null) {
    return;
  }

  if (e.code === "ArrowUp") {
    const p = environment.getAgentById(sf_agent.my_params.player_id);
    p.set("y", p.getData().y - 5);
    //console.log(environment.time);
  }

  if (e.code === "ArrowDown") {
    const p = environment.getAgentById(sf_agent.my_params.player_id);
    p.set("y", p.getData().y + 5);
    //console.log(environment.tibme);
  }
}
document.addEventListener("keydown", logKey);

// document.getElementById("container").onclick = function () {
//   run();
// };
