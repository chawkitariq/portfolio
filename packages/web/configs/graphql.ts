import axios from "axios";

const graphql = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/graphql`,
  method: "POST",
  headers: {
    "Accept": "application/graphql-response+json, application/json",
    "Content-Type": "application/json",
  },
});

export default graphql;
