// Move through the crowd
// Authors: Panos Mavros, Leonel Aguilar

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
// also build game "levels"

// Game parameters
IntList crowd_per_level = new IntList(10, 50, 100, 150, 200);
int level = -1;
String state = "instructions";

// Player parameters
PVector init_player_pos = new PVector(0, height/2); // x,y
float init_player_speed = 1;
float player_radius = 10;
float agent_radius = 2;

agent player;

// Crowd parameters
//int n_crowd = 100;
float x_speed_mu = .5; // mean speed of crowd
float x_speed_sd = 1.4; // standard deviation of crowd-speed
float reverse_prob = 0.5; // change to specify percent of agents that are walking in opposite direction
int corridor_halfwidth = 50;

//DECLARE - store all the agents/global variable 
ArrayList<agent> agentCollection;
int total_collision_counter = 0;
boolean collision = false;
IntList collision_index;

void setup() {
  randomSeed(0);
  frameRate(20);
  size(640, 360);
  background(102);
  noStroke();
  fill(0, 102);
  
  //level = 1;
  println(crowd_per_level.size());
    
  collision_index = new IntList();
  agentCollection = new ArrayList<agent>();
  init_player_pos = new PVector(0, height/2);
  
  for(int i = 0; i < crowd_per_level.get(level); i++) {
    
    boolean reverse = false;
    float x = random(0, width);
    
    // define a 'corridor' where agents are spawned
    float y = random(height/2 - corridor_halfwidth , height/2 + corridor_halfwidth);
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
  player = new agent(crowd_per_level.get(level), init_player_pos.x, init_player_pos.y, init_player_speed, player_radius, false ); 
  agentCollection.add(player);
  
  println(crowd_per_level.get(level));
}

void draw() {
   game_state();
}

void show_boundaries(){
  stroke(255);
  line(0, height/2 - corridor_halfwidth-20, width, height/2 - corridor_halfwidth-20 );
  line(0, height/2 + corridor_halfwidth+20, width, height/2 + corridor_halfwidth+20 );
}

void keyPressed() {
  println(keyCode);
  int corridor_top = height/2 - corridor_halfwidth;
  int corridor_bottom = height/2 + corridor_halfwidth;
  
  if (keyCode == 38 && player.pos.y >= corridor_top) { // arrow up 
      player.pos.y = player.pos.y - 5;
    } else if (keyCode == 40 && player.pos.y <= corridor_bottom ) { // arrow down
      player.pos.y = player.pos.y + 5;
    } else if(keyCode == 80) { // P
      player.pos.x = 0;
      if(level < crowd_per_level.size()-1){
        level = level + 1; 
      }
      state = "play";
    }
}
