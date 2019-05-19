import { GET_REPOSITORY } from './actionTypes';

export function getRepository(searchTerm, language) {
  return {
    type: GET_REPOSITORY,
    payload: { searchTerm, language }
  }
}
