const axios = require('axios');
const querystring = require('querystring');

/**
 * Get auth.
 *
 * @param username
 * @param key
 * @param unit
 * @param version
 * @return {Promise<*>}
 */
exports.getAuth = async function (username, key, unit, version) {
    try {
        console.log({
            username: username,
            key: key,
            unit: unit,
            version: version
        });

        const res = await axios.post('https://hlor.io/userpost/', querystring.stringify({
                username: username,
                key: key,
                unit: unit,
                version: version
            })
        );

        return await res.data;
    } catch (error) {
        console.error(error)
    }
};

/**
 * Get coin.
 *
 * @param pool
 * @return {Promise<*>}
 */
exports.getCoin = async function (pool) {
    try {
        const res = await axios.post('https://hlor.io/get_coin/', querystring.stringify({
                pool: pool
            })
        );

        return await res.data;
    } catch (error) {
        console.error(error)
        return null;
    }
};


/**
 * Send to hlor.io
 *
 * @param user
 * @param key
 * @param wname
 * @param coin
 * @param hash
 * @return {Promise<*>}
 */
exports.sendToHlorIO = async function (user, key, wname, coin, hash) {
    try {
        console.log({
            user: user,
            key: key,
            wname: wname,
            coin: coin,
            hash: hash
        });

        const res = await axios.post('https://hlor.io/hlorpost/', querystring.stringify({
                user: user,
                key: key,
                wname: wname,
                coin: coin,
                hash: hash
            })
        );

        return await res.data;
    } catch (error) {
        console.error(error)
    }
};
