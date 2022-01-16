import { useEffect, useState } from 'react'
import { api_server } from './settings';


let fetchFunc = (url, options = {}) => {
    let finalOptions = Object.assign(options, {})
    return fetch(url, finalOptions)
}

const getGame = (params) => {
    const { pk } = params;

    return fetchFunc(`${api_server}games/${pk}/`)
}

const useGet = (func, params = {}) => {
    let [data, setData] = useState(null);
    let [response, setResponse] = useState(null);
    let [errors, setErrors] = useState(null);
    let [loaded, setLoaded] = useState(false);

    useDeepCompareEffect(() => {
        func(params).then(response => setResponse(response))
    }, [func, params])

    useEffect(() => {
        if (response) {
            if (response.ok) {
                response.json().then(d => {
                    setData(d);
                    setErrors(null);
                }).finally(() => setLoaded(true))
            }
            else {
                response.json().then(d => {
                    setData(null);
                    setErrors([d])
                }).catch(e => {
                    setErrors([
                        {
                            message: `Unknown Error: ${response.status}`
                        }]);
                    setData(null);
                }
                ).finally(() => setLoaded(true))

            }
        }
    }, [response])

    return { data, response, errors, loaded }
}


const postGame = (params) => {
    return fetchFunc(`${api_server}games/`, {
        body: JSON.stringify({}),
        method: "POST"
    })
}

const postPlayer = (params) => {
    const { gamePK, player } = params;
    return fetchFunc(`${api_server}games/${gamePK}/new-player/`, {
        body: JSON.stringify({ player }),
        method: "POST"
    })
}

const postAction = (params) => {
    const { gamePK, player, action } = params;
    return fetchFunc(`${api_server}games/${gamePK}/player-action/`, {
        body: JSON.stringify({ player, action }),
        method: "POST"
    })
}

const usePost = (func, params = {}) => {
    return func(params).then(response => {
        if (response.ok) {
            return response.json().then((data) => { return { response, data, errors: [] } })
        }
        else {
            return response.json().then((data) => {
                let errors = Object.keys(data).map((key) => { return { message: `${key}: ${data[key]}` } })
                return { response, data, errors: errors }
            }).catch(e => {
                return {
                    response, data: null, errors: [
                        {
                            message: `Unknown Error: ${response.status}`
                        }]
                }
            })
        }
    })
}


const useGame = (pk) => useGet(getGame, { pk })
const createGame = () => usePost(postGame, {})
const createPlayer = (gamePK, player) => usePost(postPlayer, { gamePK, player })
const performAction = (gamePK, player, action) => usePost(postAction, { gamePK, player, action })

export { useGame, createGame, createPlayer, performAction }
