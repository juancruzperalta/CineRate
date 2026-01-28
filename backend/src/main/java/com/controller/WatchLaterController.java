package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.model.user.UserEntity;
import com.model.watchLater.WatchLaterEntity;
import com.service.WatchLaterService;

@RestController
@RequestMapping("/api/watchLater")
public class WatchLaterController {
  
  @Autowired
  WatchLaterService service;

  // Obtengo las que "ya agregué para ver después (o no)"
     @GetMapping("/{id}")
     @PreAuthorize("hasRole('USER')")
     public ResponseEntity<Boolean> getWatchLater(@PathVariable("id") int media_id,
         @AuthenticationPrincipal UserEntity user) {
       boolean watc = service.findByUser_IdAndMediaId(user.getId(), media_id);
       return ResponseEntity.ok(watc);
     }
     //  Obtengo todas para mostrar en accountLogged(cuando este logueado y en su pagina)
     @GetMapping("/getAll")
     @PreAuthorize("hasRole('USER')")
     public ResponseEntity<List<WatchLaterEntity>> getWatchLaterAll(@RequestParam boolean isSerie,
         @AuthenticationPrincipal UserEntity user) {
       List<WatchLaterEntity> watc = service.getWatchLaterAll(user.getId(), isSerie);
       return ResponseEntity.ok(watc);
     }
    
    //  Agrego para ver después(o quitarla si ya le puse en ver después)
    @PostMapping("/{id}/{mediaType}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Void> addWatchLater(@PathVariable("id") int media_id, @PathVariable("mediaType") boolean mediaType, @AuthenticationPrincipal UserEntity user) {
      service.createWatchLater(media_id, mediaType, user.getEmail());
      return ResponseEntity.ok().build();
    }

}
