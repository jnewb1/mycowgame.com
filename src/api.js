import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import PlayerCard from './game/playercard';

const supabaseUrl = 'https://dmojlfmeqjdgiptlnvbs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtb2psZm1lcWpkZ2lwdGxudmJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2NTA4NzQsImV4cCI6MjA1MDIyNjg3NH0.3axDi9Vd0wbWjsnN2rY2Jn3UvCCI7QalHrPLp4Nn-84';
const supabase = createClient(supabaseUrl, supabaseKey);


const getData = (resp) => resp.data; 

const fetchGame = (gameID) => supabase.from("games").select('id, players (id, name, deleted), actions (created_at, game_action, player)').match({id: gameID}).maybeSingle().then(getData);


const ACTIONS = {
  "cow": player => player.points += 1,
  "church": player => player.points *= 2,
  "graveyard": player => player.points = 0,
};

const calculatePoints = (game) => {
  game.players.forEach(player => player.points = 0);

  const applyAction = (action) => {
    if (action.player) {
      ACTIONS[action.game_action](action.player);
    }
  };

  const addPlayerToAction = (action) => {
    action.player = game.players.filter(p => p.id == action.player)[0];
  };

  game.actions.forEach(addPlayerToAction);
  game.actions.forEach(applyAction);
  return game;
};


const useGame = (gameID) => {
    const [game, setGame] = useState(null);

    useEffect(() => {
        const fetch = () => fetchGame(gameID).then(calculatePoints).then(game => setGame(game));

        fetch();

        const channel = supabase
          .channel("game")
          .on("postgres_changes", {event: "*", table: "actions", filter: `game=eq.${gameID}`}, (payload) => fetch())
          .on("postgres_changes", {event: "*", table: "players", filter: `game=eq.${gameID}`}, (payload) => fetch())
          .subscribe();
    
        return () => {
          channel.unsubscribe(); 
        };
      }, [gameID]);

    return game;
};

const getGame = (gameID) => supabase.from("games").select().match({ id: gameID });

const createGame = () => supabase.from("games").insert({}).select();

const getPlayer = (gameID, name) => supabase.from("players").select().match({game: gameID, name: name}).maybeSingle().then(getData);
const createPlayer = (gameID, name) => supabase.from("players").insert({game: gameID, name: name}).select();
const removePlayer = (gameID, name) => getPlayer(gameID, name).then(player => supabase.from("players").update({deleted: true}).eq("id", player.id));

const playerAction = (gameID, name, action) => {
  return getPlayer(gameID, name).then(player => supabase.from("actions").insert({game: gameID, player: player.id, game_action: action}));
};

export { useGame, createGame, fetchGame, getGame, createPlayer, removePlayer, playerAction };
