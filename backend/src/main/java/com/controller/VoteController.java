package com.controller;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.model.user.UserEntity;
import com.model.vote.VoteDTO;
import com.model.vote.VoteRequestDTO;
import com.service.VoteService;

@RestController
@RequestMapping("/api/vote")
@CrossOrigin(origins = "http://localhost:5173")
public class VoteController {
    @Autowired
    VoteService service;

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<VoteDTO> GetVoteIDMovSer(@PathVariable("id") int media_id,
        @AuthenticationPrincipal UserEntity user) {
      VoteDTO vot = service.findById(media_id, user.getId());
     return ResponseEntity.ok(vot);
    }

    @PostMapping("/{id}/{mediaType}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Void> voteMovSer(@PathVariable("id") int media_id, @RequestBody VoteRequestDTO vote,
        @PathVariable("mediaType") String mediaType, @AuthenticationPrincipal UserEntity user) {
      service.createVote(media_id, vote.getValue(), mediaType, user.getEmail());
      return ResponseEntity.ok().build();
    }
}
