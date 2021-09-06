int n_crowd = 500;
float player_y = 180;
float player_x = 1;
float player_speed = 0.2;
float x_speed_mu = 0; // mean speed of crowd
int x_speed_sd = 1; // standard deviation of crowd-speed
float reverse_prob = 0.9; // change to specify percent of agents that are walking in opposite direction

//DECLARE - store all the agents/global variable 
ArrayList<agent> agentCollection = new ArrayList<agent>();
int total_collision_counter = 0;
IntList collision_index;

void setup() {
  size(640, 360);
  background(102);
  noStroke();
  fill(0, 102);
    
  collision_index = new IntList();

  for(int i = 0; i < n_crowd; i++) {
    boolean reverse = false;
    float x = random(0, width);
    float y = random(0, height);
    float thisspeed =  random(0,1) * x_speed_sd + x_speed_mu;
    //random(x_speed_min, x_speed_max);
    //print(random(0,1) > .5);
    if(random(0,1) > (1 - reverse_prob)) {
      reverse = true;
    } else {
      reverse = false;
    }
    println(reverse);
    agent myAgent = new agent(x, y, thisspeed, reverse ); 
    agentCollection.add(myAgent);
  }
  
  
}

void draw() {
  background(0,0,0);
  boolean collision  = false;
  for (int i = 0; i< n_crowd; i++) {
      agent b1 = agentCollection.get(i);
      float dx = b1.xpos - player_x;
      float dy = b1.ypos - player_y;
      float d = sqrt(sq(dx)+sq(dy)); // distance between player and agent
      
    if(d < 10) { 
      collision  = true;  
      if(collision_index.size() > 0 )  { // list has been initiated and the last collision was with a different agent
       
        if(collision_index.get(collision_index.size() - 1)  != i) {
          collision_index.append(i);
        }
        
      } else {
        collision_index.append(i); // if list not init then just append
      }
      
    }
   
    
  }
    
  if(collision){
    background(255,0,0);
  } else {
    fill(255);
  }
    
  ellipseMode(CENTER);
  ellipse(player_x, player_y, 10, 10);
  player_x  = player_x + player_speed;  
  text("collision count: " + collision_index.size(), 20, 20); 
  text("speed mu = " + x_speed_mu + " (" + x_speed_sd + ")", 20, height - 20); 
   for(int i = 0; i< n_crowd; i++) {
     agentCollection.get(i).update();
   }
   
   if(player_x == width) {
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


class agent { 
  float xpos, ypos, speed; 
  boolean reverse;
  float y_speed  = 0;
  agent (float x, float y, float s, boolean r) {  
    ypos = y; 
    xpos = x;
    speed = s; 
    reverse = r;
    y_speed = 0;
  } 
  void update() { 
    xpos += speed; 
    if (xpos > width) { 
      xpos = 0; 
    } 
    
    
    float jerkiness_probability = 0.05;
    if(random(0,1) < jerkiness_probability) {
      y_speed = random(1, 10);
    }
    
      fill(0,248,255);
      //stroke(255);
      if(reverse){
        rect(width - xpos, ypos + y_speed, 2, 8);
      } else {
         rect(xpos, ypos,2, 8);

      }
  } 
} 
