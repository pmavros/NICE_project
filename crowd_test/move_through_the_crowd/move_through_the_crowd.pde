// Move through the crowd
// Author: Panos Mavros

// objective:
// simple animated game where the user moves through the screen
// trying to avoid bumping into the crowd.
// we count the number of collisions.
// Everytime there is a collision we try to create a salient event in the screen,
// e.g. now it turns red, as in real-life bumping onto someone is very clearly perceived.

// to do
// now the crowd is very crude. we could add the social force model.
// lines connecting the player with all other agents (crowd) are there for debugging
// eventually need to log files, enter player id
// also build game ";evels"

// Player parameters
PVector init_player_pos = new PVector(0,180);
float init_player_speed = 1;
float player_radius = 10;
float agent_radius = 2;

agent player;

// Crowd parameters
int n_crowd = 100;
float x_speed_mu = 1; // mean speed of crowd
int x_speed_sd = 1; // standard deviation of crowd-speed
float reverse_prob = 0.5; // change to specify percent of agents that are walking in opposite direction

//DECLARE - store all the agents/global variable 
ArrayList<agent> agentCollection;
int total_collision_counter = 0;
boolean collision = false;
IntList collision_index;

void setup() {
  randomSeed(0);
  size(640, 360);
  background(102);
  noStroke();
  fill(0, 102);
    
  collision_index = new IntList();
  agentCollection = new ArrayList<agent>();

  for(int i = 0; i < n_crowd; i++) {
    
    boolean reverse = false;
    float x = random(0, width);
    float y = random(0, height);
    float thisspeed =  random(0,1) * x_speed_sd + x_speed_mu;
   
    if(random(0,1) > (1 - reverse_prob)) {
      reverse = true;
    } else {
      reverse = false;
    }
    agent myAgent = new agent(i, x, y, thisspeed, agent_radius, reverse ); 
    agentCollection.add(myAgent);
  }
  //Add player to the agent list
  player = new agent(n_crowd, init_player_pos.x, init_player_pos.y, init_player_speed, player_radius, false ); 
  agentCollection.add(player);
}

void draw() {
   background(0,0,0);
    collision  = false;
  
  // Calculate Forces
  for (int i = 0; i < n_crowd; i++) {
      agentCollection.get(i).calc_forces(agentCollection);
  }
  
  // Apply Forces
  for (int i = 0; i < n_crowd; i++) {
      agentCollection.get(i).update();
      agentCollection.get(i).collision_detection();
  }
  
  // Move player
  player.pos.x  = player.pos.x + player.speed;  
  text("collision count: " + collision_index.size(), 20, 20); 
  text("speed mu = " + x_speed_mu + " (" + x_speed_sd + ")", 20, height - 20);
  
  // Draw player
  ellipseMode(CENTER);
  fill(255);
  ellipse(player.pos.x, player.pos.y, player.radius, player.radius);
   
   // end run if the player reaches the other side. 
   // we can make this more elaborate later 
   if(player.pos.x > width) {
     exit();
   }
}

void keyPressed() {
  //print(keyCode);
  if (keyCode == 40) {
      player.pos.y = player.pos.y + 5;
    } else if (keyCode == 38) {
      player.pos.y = player.pos.y - 5;
    } 
}
