class agent { 
  int id;
  float xpos, ypos, speed; 
  boolean reverse;
  float y_speed  = 0;
  
  agent (int i, float x, float y, float s, boolean r) {  
    id = i;
    ypos = y; 
    xpos = x;
    speed = s; 
    reverse = r;
    y_speed = 0;
  } 
  
  void update() { 
   rectMode(CENTER);
   
   if(reverse) {
         xpos = xpos - speed;
   } else {
      xpos = xpos + speed;
      
   }
    
    if (xpos > width) { 
      xpos = 0; 
    } else if (xpos < 0) { 
      xpos = width; 
    } 
        
    float jerkiness_probability = 0.05;
    if(random(0,1) < jerkiness_probability) {
      y_speed = random(1, 10);
    }
    
    
      fill(0,255,255);
      stroke(0);
      rect(xpos, ypos,4, 8);
      
  } 
  
  void collision_detection(){
      collision  = false;  
      stroke(255, 17);
      line(xpos, ypos, player_x, player_y);
      
      float dx = xpos - player_x;
      float dy = ypos - player_y;
      float d = sqrt(sq(dx)+sq(dy)); // distance between player and agent
      
      if(d < player_radius) { 
        
        collision  = true;  
        
      }
      
      if(collision) {
         background(255,0,0);
   
        
        if(collision_index.size() > 0 )  { // list has been initiated and the last collision was with a different agent
       
          if(collision_index.get(collision_index.size() - 1)  != id) {
            collision_index.append(id);
          }
        
        } else {
          collision_index.append(id); // if list not init then just append
        }
      }
      
  }
} 
