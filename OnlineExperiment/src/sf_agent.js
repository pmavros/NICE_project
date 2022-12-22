
// (function (global, factory) {
//     typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
//     typeof define === 'function' && define.amd ? define(['exports'], factory) :
//     (global = global || self, factory(global.flocc = {}));
// }(this, (function (exports) { 'use strict';

  import { Vector, utils } from "flocc";

  /* ------- PARAMETERS --------- */

  const ALIGNMENT = 1;
  const SEPARATION = 1;
  const COHESION = 1;
  const VISION = 15;
  const MAX_SPEED = 3;
  const MAX_FORCE = 0.15;

  /* ---------------------------- */

 var my_params = {
    player_id: null,
    collision_count: 0,
    tree: null
  };

  const collision_threshold = 5;

const utils = flocc.utils;
 // const text_disp = document.getElementById("text");
 function report(){
    // const text_disp = document.getElementById("text");
    monitor.innerText = "running";
 }

  function collisions(agent) {
    var neighbors = my_params.tree.agentsWithinDistance(
      agent,
      collision_threshold
    );
    var neighbor_count = neighbors.length;
    my_params.collision_count = my_params.collision_count + neighbor_count;
    monitor.innerText = "collisions: " + my_params.collision_count;

  }

  function tickAgent(agent) {
    const { x, y, vx, vy } = agent.getData();

    const pos = new flocc.Vector(x, y);
    const vel = new flocc.Vector(vx, vy);
    const acc = new flocc.Vector(0, 0);

    const ip = pos.clone().multiplyScalar(-1);
    const iv = vel.clone().multiplyScalar(-1);

    const alignment = new flocc.Vector(0, 0);
    const cohesion = new flocc.Vector(0, 0);
    const separation = new flocc.Vector(0, 0);

    const neighbors = my_params.tree.agentsWithinDistance(agent, VISION);

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
        .add(new flocc.Vector(-ax, -ay))
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
    //*/
    alignment.multiplyScalar(ALIGNMENT);
    cohesion.multiplyScalar(COHESION);
    separation.multiplyScalar(SEPARATION);

    acc.add(alignment);
    acc.add(cohesion);
    acc.add(separation);

    pos.add(vel);
    vel.add(acc);
    if (vel.length() > MAX_SPEED) vel.normalize().multiplyScalar(MAX_SPEED);
    if (agent.id === my_params.player_id) {
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

  //  default {
  //   my_params,
  //   tickAgent
  // };

// })));
