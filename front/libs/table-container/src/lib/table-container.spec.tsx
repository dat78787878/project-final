import { render } from '@testing-library/react';

import TableContainer from './table-container';

describe('TableContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableContainer />);
    expect(baseElement).toBeTruthy();
  });
});
