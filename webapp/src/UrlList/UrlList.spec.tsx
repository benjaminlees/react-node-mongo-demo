import { render, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import UrlList from "./UrlList";
import { MockContext } from '../../test-helper.tsx';

jest.mock('../helper', () => ({
  getEnv: () => 'http://localhost:3000'
}));

describe("<UrlList />", () => {
  test("should show a list if items are present", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet('http://localhost:3000/shortened-urls').reply(200, [{
      shortenedUrl: 'http://localhost:3000/abc',
      orginalUrl: 'http://localhost:3000/abc',
      _id: '123'
    }]);

    const view = render(<MockContext><UrlList/></MockContext>);
    await waitFor(() => {
      expect(view.getByRole('listitem').textContent).toMatch(/localhost:3000/);
    });
  });
});