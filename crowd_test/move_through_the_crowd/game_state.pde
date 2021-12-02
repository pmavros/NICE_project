// This tab handles the game states

void game_state(){

  if(state == "instructions"){
    instruction_screen();
  }
  
  if(state == "play"){
    game_on();
  }

}

void instruction_screen() {
  
  background(0);
  textAlign(CENTER);
  fill(255);
  stroke(255);
  text("Your objective is to avoid colliding with other people", width/2, height/2 - 20);
  text("Press P to start the next level", width/2, height/2);
  
}

void game_on() {
  background(0,0,0);
   collision  = false;
  
  // Calculate Forces
  for (int i = 0; i < crowd_per_level.get(level); i++) {
      agentCollection.get(i).calc_forces(agentCollection);
  }
  
  // Apply Forces
  for (int i = 0; i < crowd_per_level.get(level); i++) {
      agentCollection.get(i).update();
      agentCollection.get(i).collision_detection();
  }
  
  // Move player
  player.pos.x  = player.pos.x + player.speed; 
  textAlign(LEFT);
  text("collision count: " + collision_index.size(), 20, 20); 
  text("speed mu = " + x_speed_mu + " (" + x_speed_sd + ")", 20, height - 20);
  
  // Draw player
  ellipseMode(CENTER);
  fill(255);
  ellipse(player.pos.x, player.pos.y, player.radius, player.radius);
  show_boundaries();

   // end run if the player reaches the other side. 
   // we can make this more elaborate later 
   if(player.pos.x > width) {
     state = "instructions";
     // exit();
   }
}
