import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import useLocalStorage from "./useLocalStorage";


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
    if (action.player_object) {
      ACTIONS[action.game_action](action.player_object);
    }
  };

  const addPlayerToAction = (action) => {
      action.player_object = game.players.filter(p => p.id == action.player)[0];
  };

  game.actions.forEach(addPlayerToAction);
  game.actions.forEach(applyAction);

  return game;
};


const useGame = (gameID) => {
    const [syncTimeout, setSyncTimeout] = useState(null);

    const [gameData, setGameData] = useState(null);
    const [queuedActions, setQueuedActions] = useLocalStorage("queuedActions", []);

    useEffect(() => {
        const fetch = () => fetchGame(gameID).then(calculatePoints).then(game => setGameData(game));

        fetch();

        const channel = supabase
            .channel("game")
            .on("postgres_changes", { event: "*", table: "actions", filter: `game=eq.${gameID}` }, (payload) => fetch())
            .on("postgres_changes", { event: "*", table: "players", filter: `game=eq.${gameID}` }, (payload) => fetch())
            .subscribe();

        return () => {
            channel.unsubscribe();
        };
    }, [gameID]);


    const syncActions = () => {
      syncTimeout && clearTimeout(syncTimeout);
      queuedActions.forEach((actionData) => {
        supabase.from("actions").insert(actionData);
      });
  
      setSyncTimeout(setTimeout(syncActions, 5000));
    }

    syncActions();

    const createPlayer = (name) => supabase.from("players").insert({game: gameID, name: name}).select();
    const removePlayer = (id) => supabase.from("players").update({deleted: true}).eq("id", id);

    const playerAction = (id, action) => {
      const actionData = { game: gameID, player: id, game_action: action };
      setQueuedActions([...queuedActions, actionData]);
      syncActions();
    };

    return {gameData, playerAction, createPlayer, removePlayer};
};

const getGame = (gameID) => supabase.from("games").select().match({ id: gameID });
const createGame = () => supabase.from("games").insert({}).select();

export { useGame, createGame, getGame, calculatePoints };
