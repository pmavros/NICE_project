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

int n_crowd = 500;
float player_y = 180;
float player_x = 1;
float player_speed = 1;
int player_radius = 10;
float x_speed_mu = 0; // mean speed of crowd
int x_speed_sd = 1; // standard deviation of crowd-speed
float reverse_prob = 0.1; // change to specify percent of agents that are walking in opposite direction

//DECLARE - store all the agents/global variable 
ArrayList<agent> agentCollection;
int total_collision_counter = 0;
boolean collision = false;
IntList collision_index;

void setup() {
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
    agent myAgent = new agent(i, x, y, thisspeed, reverse ); 
    agentCollection.add(myAgent);
  }
  
  
}

void draw() {
   background(0,0,0);
    collision  = false;
  
  for (int i = 0; i < n_crowd; i++) {
       
      agentCollection.get(i).update();
      agentCollection.get(i).collision_detection();

    }

  ellipseMode(CENTER);
  fill(255);
  ellipse(player_x, player_y, player_radius, player_radius);
  player_x  = player_x + player_speed;  
  text("collision count: " + collision_index.size(), 20, 20); 
  text("speed mu = " + x_speed_mu + " (" + x_speed_sd + ")", 20, height - 20); 
   
   // end run if the player reaches the other side. 
   // we can make this more elaborate later 
   if(player_x > width) {
     exit();
   }
}

void keyPressed() {
  //print(keyCode);
  if (keyCode == 40) {
      player_y = player_y + 5;
    } else if (keyCode == 38) {
      player_y = player_y - 5;
    } 
}
