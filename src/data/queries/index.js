import { loader } from 'graphql.macro';



const queries = {
  getBookings: loader('./getBookings.gql'),
};


export default queries;
