// implementation of social force model 

class agent { 
  int id;
  PVector pos;
  PVector direction;
  
  PVector vel;
  float speed;
  float max_speed;
  float radius;
  boolean reverse;
  PVector acceleration;

  
  agent (int i, float x, float y, float s, float p_radius, boolean r) {  
    id = i;
    pos = new PVector(x,y);
    direction = new PVector(0,0);
    speed = s;
    max_speed = s;
    radius = p_radius;
    reverse = r;
    vel = direction.mult(speed);
    acceleration = vel;
  }
  
  void calc_forces(ArrayList<agent> neighbours){
     PVector dest = destination_agent();   
     PVector internal_f = internal_force(dest);
     PVector social_f = social_force(neighbours);
     float internal_m = 0.1;
     float social_m = 1;
     acceleration = PVector.add(internal_f.copy().mult(internal_m),social_f.copy().mult(social_m));
  }
  
  void update() { 
     float dt=1;

     PVector desired_vel = PVector.add(vel,acceleration.copy().mult(dt));
     
     speed = desired_vel.mag();
     direction = desired_vel.copy().normalize();
     if (speed > max_speed){
        speed=max_speed;
     }
          
     vel=direction.copy().mult(speed*dt);
     
     pos = pos.add(vel.copy().mult(dt));
  

    // Respawn agent at the edge
    if (pos.x > width) { 
      pos.x = 0; 
    } else if (pos.x < 0) { 
      pos.x = width; 
    }
    
    render();
    // Draw agent
    if (id!=0){     
      fill(0,255,255);
    } else{
      fill(255,0,0);
    }  
  }
  
  void render(){
    render_triangle(); 
    //render_rectangle();
  }
  
  // void render_rectangle(){
  //   rectMode(CENTER);
  //   stroke(0);
  //   rect(pos.x, pos.y,radius,radius);
  // }
  
  // void render_triangle() {
  //   // Draw a triangle rotated in the direction of velocity
  //   float theta = vel.heading() + radians(90);
    
  //   fill(200, 100);
  //   stroke(255);
  //   pushMatrix();
  //   translate(pos.x, pos.y);
  //   rotate(theta);
  //   beginShape(TRIANGLES);
  //   vertex(0, -radius*2);
  //   vertex(-radius, radius*2);
  //   vertex(radius, radius*2);
  //   endShape();
  //   popMatrix();
  // }
  
  PVector destination_agent(){
    PVector dest = new PVector(0,0);

    if(reverse) {
       dest.y= pos.y;
       dest.x= pos.x - max_speed;
     } else {
       dest.y= pos.y;
       dest.x= pos.x + max_speed; 
     }

    return dest;
  }
  
  PVector internal_force(PVector destination){
    // Using mean values of Moussaid-Helbing 2009
    // default tau = 0.54;
    float tau=0.54;
    PVector desired_direction = PVector.sub(destination,pos);
    PVector desired_velocity = desired_direction.copy().normalize().mult(max_speed);
    PVector velocity_diff= PVector.sub(desired_velocity,vel);
    PVector force = velocity_diff.copy().div(tau);
    return force; 
  }
  
  PVector social_force(ArrayList<agent> neighbours){
    // Using mean values of Moussaid-Helbing 2009
    // defaults
    //float A  = 4.5;
    //float gamma = 0.35;
    //float n = 2;
    //float n_prime = 3;
    //float lambda = 2.0;
    
    float A  = 1.5;
    float gamma = 1.35;
    float n = 0.5; // controls how much they pivot around when approaching another agent
    float n_prime = 3;
    float lambda = 4.0;
    
    PVector force = new PVector(0,0);
    
    for (agent neigh : neighbours) {
        if (neigh.id != id){
          //neigh = j
          //self = i

          // x_j-x_i
          PVector pos_diff=PVector.sub(neigh.pos,pos);         
          
          // e_ij
          PVector dir_diff=pos_diff.copy().normalize();
          // v_i-v_j
          PVector vel_diff=PVector.sub(vel,neigh.vel);
          
          // D_ij // mistake in the paper
          PVector interaction_v=PVector.add(vel_diff.copy().mult(lambda),dir_diff);
          // t_ij
          PVector interaction_d=interaction_v.copy().normalize();
          
          // n_ij (normal to the left of t_ij)
          PVector normal_interaction_d=interaction_d.copy().rotate(HALF_PI);
          
          // theta_ij
          float theta = PVector.angleBetween(dir_diff,interaction_d);
          
          // B
          float B = gamma*interaction_v.mag();
          
          // K
          float K=0;
          if (theta > 0.0001){
              K=1;
          } else if (theta < 0.0001){
              K=-1; 
          }
          float d=pos_diff.mag();
          
          // magnitude Force velocity
          float f_v_mag = -1*A*exp(-1*d/B - sq(n_prime*B*theta));
          float f_t_mag = -1*A*K*exp(-1*d/B - sq(n*B*theta));
          
          PVector force_ij = PVector.add(interaction_d.copy().mult(f_v_mag),normal_interaction_d.copy().mult(f_t_mag));
          
          force = force.add(force_ij);
        }
    }
    
    return force;
  }
  
  
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

void collision_detection(){
  collision  = false;  
  stroke(255, 17);
  line(pos.x, pos.y, player.pos.x, player.pos.y);
  
  float dx = pos.x - player.pos.x;
  float dy = pos.y - player.pos.y;
  float d = sqrt(sq(dx)+sq(dy)); // distance between player and agent
  
  if(d < player_radius) { 
    
    collision  = true;  
    
  }
  
  if(collision) {
     
    fill(255,0,0);
     rect(0, 0, width, height/2 - corridor_halfwidth-20);
     rect(0, height/2 + corridor_halfwidth + 20, width, height);
     
     fill(0);
     //rect(0, height/2 - corridor_halfwidth-20, width, height/2 + corridor_halfwidth+20);

    
    if(collision_index.size() > 0 )  { // list has been initiated and the last collision was with a different agent
   
      if(collision_index.get(collision_index.size() - 1)  != id) {
        collision_index.append(id);
      }
    
    } else {
      collision_index.append(id); // if list not init then just append
    }
  }
  
}