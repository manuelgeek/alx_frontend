import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const adapter = new MockAdapter(axios);

export default adapter;
