import axios from "axios";

export const clientGQL = async (query, variables = {}) => {
    const headers = { "Content-Type": "application/json", "x-hasura-admin-secret": process.env.REACT_APP_ADMIN_SECRET };
    let res = await axios.post(process.env.REACT_APP_HASURA_URL, JSON.stringify({ query, variables }), { headers: headers })
    return res
};
