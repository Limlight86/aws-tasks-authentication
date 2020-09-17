import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context"
import Auth from "./Auth"
import { TASKS_API_URL } from "./TasksApi";

const httpLink = createHttpLink({uri: TASKS_API_URL})

const authLink = setContext(async(_, { headers }) => {
  let token
  try{
    const user = await Auth.currentAuthenticatedUser()
    token = user.signInUserSession.accessToken.jwtToken
    console.log({token})
  } catch(error){
    console.log(error.message)
    token=""
  }
  return{
    headers: {...headers, Authorization: token}
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
