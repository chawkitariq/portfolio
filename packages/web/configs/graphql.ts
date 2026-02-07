import axios from "axios";

const graphql = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});

export default graphql;
