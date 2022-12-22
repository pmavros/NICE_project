// import { Vector } from "flocc";

/* ------- PARAMETERS --------- */
// In comments mean values of Moussaid-Helbing 2009

// INTERNAL FORCE
const TAU = 0.54; //  0.54 controls the time to reach the desired velocity

// SOCIAL FORCE
const A = 40.5; // 4.5
const GAMMA = 1.35; //0.35
const N = 20.0; // 2 // controls how much they pivot around when approaching another agent
const N_PRIME = 30.0; // 3
const LAMBDA = 2.0; // 2.0

// Multipliers
const SFMUL = 500;
const IFMUL = 0.1;

// Other
const collision_threshold = 5.0;
const VISION = 15.0;
const DT = 1; // Delta time for the simulation
/* ---------------------------- */

// export
var my_params = {
  player_id: null,
  collision_count: 0,
  collision_ids: [],
  tree: null
};

// export 
var my_vectors = [null];

// const text_disp = document.getElementById("text");
// text_disp.innerText = "running";

 function report(){
    // const text_disp = document.getElementById("text");
    monitor.innerText = "running";
 }

function collisions(agent) {
  var neighbors = my_params.tree.agentsWithinDistance(
    agent,
    collision_threshold
  );

  // var neighbor_count = neighbors.length;
  var new_collisions = [];
  
  if (neighbors.length > 0) {
    neighbors.forEach(function (e) {
      if (my_params.collision_ids.indexOf(e.id) === -1) {
        new_collisions.push(e.id);
      } else {
        // console.log("collision with same");
      }
    });

    my_params.collision_ids = new_collisions;
    my_params.collision_count =
      my_params.collision_count + new_collisions.length;
    text_disp.innerText = "collisions: " + my_params.collision_count;
  }
}

function internal_force(pos, destination, vel, max_speed) {
  const desired_direction = destination.clone().add(new flocc.Vector(-pos.x, -pos.y));

  const desired_velocity = desired_direction
    .clone()
    .normalize()
    .multiplyScalar(max_speed);
  const velocity_diff = desired_velocity
    .clone()
    .add(new flocc.Vector(-vel.x, -vel.y));
  const internalforce = velocity_diff.clone().multiplyScalar(1 / TAU);
  return internalforce;
}

function social_force(pos, vel, neighbors) {
  let force = new flocc.Vector(0, 0);

  neighbors.forEach((a) => {
    //neigh = j
    //self = i

    const neigh_pos = new flocc.Vector(a.get("x"), a.get("y"));
    const neigh_vel = new flocc.Vector(a.get("vx"), a.get("vy"));

    // x_j-x_i
    const pos_diff = neigh_pos.clone().add(new Vector(-pos.x, -pos.y));

    // e_ij
    const dir_diff = pos_diff.clone().normalize();
    // v_i-v_j
    const vel_diff = vel.clone().add(new flocc.Vector(-neigh_vel.x, -neigh_vel.y));

    // D_ij // mistake in the paper
    const interaction_v = vel_diff.clone().multiplyScalar(LAMBDA).add(dir_diff);
    // t_ij
    const interaction_d = interaction_v.clone().normalize();

    // n_ij (normal to the left of t_ij)
    const normal_interaction_d = interaction_d.clone().rotateZ(Math.PI / 2);

    // theta_ij
    const theta = Math.atan2(
      interaction_d.y - dir_diff.y,
      interaction_d.x - dir_diff.x
    );

    // B
    const B =
      GAMMA *
      Math.sqrt(
        interaction_v.x * interaction_v.x + interaction_v.y * interaction_v.y
      );

    // K
    let K = 0;
    if (theta > 0.0001) {
      K = 1;
    } else if (theta < 0.0001) {
      K = -1;
    }
    const d = Math.sqrt(pos_diff.x * pos_diff.x + pos_diff.y * pos_diff.y);

    // magnitude Force velocity
    const f_v_mag =
      -1 *
      A *
      Math.exp((-1 * d) / B - N_PRIME * B * theta * (N_PRIME * B * theta));
    const f_t_mag =
      -1 * A * K * Math.exp((-1 * d) / B - N * B * theta * (N * B * theta));

    const force_ij = interaction_d
      .clone()
      .multiplyScalar(f_v_mag)
      .add(normal_interaction_d.clone().multiplyScalar(f_t_mag));

    force = force.add(force_ij);
  });

  return force;
}
// export
 function tickAgent(agent) {
  const { x, y, vx, vy, max_speed, final_direction } = agent.getData();

  const pos = new flocc.Vector(x, y);
  var vel = new flocc.Vector(vx, vy);

  // TODO
  // const destination = pos.clone().add(new Vector(200, 0));
  const destination =
    final_direction === "left"
      ? pos.clone().add(new flocc.Vector(-200, 0))
      : pos.clone().add(new flocc.Vector(200, 0));

  const neighbors = my_params.tree.agentsWithinDistance(agent, VISION);

  const my_force = internal_force(pos, destination, vel, max_speed);
  const s_force = social_force(pos, vel, neighbors);

  var acc;

  if (agent.id === my_params.player_id) {
    // Ignoring social force for player
    acc = my_force.clone();
    collisions(agent);
    //console.log(s_force.x, s_force.y);

    //my_vectors[0] = { start: pos, end: pos };
  } else {
    acc = my_force
      .clone()
      .multiplyScalar(IFMUL)
      .add(s_force.clone().multiplyScalar(SFMUL));
    // Uncomment for static crowd
    // vel = new Vector(0, 0);
    // acc = new Vector(0, 0);
  }

  vel.add(acc.clone().multiplyScalar(DT));
  if (vel.length() > max_speed) vel.normalize().multiplyScalar(max_speed);
  pos.add(vel);

  return {
    x: pos.x,
    y: pos.y,
    vx: vel.x,
    vy: vel.y
  };
}

// export default {
//   my_params,
//   tickAgent,
//   my_vectors
// };
