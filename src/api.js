import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dmojlfmeqjdgiptlnvbs.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


const useGame = (gamePK) => {
    const [game, setGame] = useState(null);

    useEffect(() => {
        const channel = supabase
          .channel("game")
          .on(
            "postgres_changes",
            {
              table: "game", 
              filter: `id=eq.${gamePK}`, 
            },
            (payload) => {
              setGame(payload);
            }
          )
          .subscribe();
    
        return () => {
          channel.unsubscribe(); 
        };
      }, [gameID]);

    return game;
}

const createGame = () => supabase.from("game").insert({});

const addPlayer = (gamePK, name) => post(postAddPlayer, { gamePK, name })
const removePlayer = (gamePK, name) => post(postRemovePlayer, { gamePK, name })

const playerAction = (gamePK, player, action) => post(postPlayerAction, { gamePK, player, action })

export { useGame, createGame, getGame, addPlayer, removePlayer, playerAction }
